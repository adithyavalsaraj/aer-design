import { cn } from "@/lib/utils";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { CascaderOption } from "./types";

interface CascaderMenuProps {
  options: CascaderOption[];
  onSelect: (option: CascaderOption, isLeaf: boolean) => void;
  /**
   * Currently active value at this level (for highlighting parent)
   */
  activeValue?: string | number;
  /**
   * The selected leaf value (for displaying checkmark)
   */
  selectedValue?: string | number;
  depth?: number;
  loadData?: (option: CascaderOption) => Promise<void> | void;
  itemClassName?: string;
  virtualized?: boolean;
  itemHeight?: number;
}

export function CascaderMenu({
  options,
  onSelect,
  activeValue,
  selectedValue,
  depth = 0,
  loadData,
  itemClassName,
  virtualized,
  itemHeight = 32,
}: CascaderMenuProps) {
  const [hoveredOption, setHoveredOption] =
    React.useState<CascaderOption | null>(null);

  // Clear hovered option when options change (e.g. if parent closes)
  React.useEffect(() => {
    setHoveredOption(null);
  }, [options]);

  // Virtualization State
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const menuHeight = 300; // Fixed max height

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const visibleCount = Math.ceil(menuHeight / itemHeight) + 1; // +1 buffer
  const totalHeight = options.length * itemHeight;

  // Calculate window
  const startIndex = virtualized ? Math.floor(scrollTop / itemHeight) : 0;
  const endIndex = virtualized
    ? Math.min(options.length, startIndex + visibleCount)
    : options.length;

  const visibleOptions = virtualized
    ? options.slice(startIndex, endIndex)
    : options;
  const offsetY = virtualized ? startIndex * itemHeight : 0;

  return (
    <div
      data-cascader-menu
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "flex flex-col min-w-[180px] bg-aer-background border border-aer-border rounded-lg shadow-lg py-1", // py-1 for non-virtualized standard padding
        virtualized && "py-0" // remove padding for virtualized to exact calc
      )}
      style={{
        maxHeight: `${menuHeight}px`,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          height: virtualized ? `${totalHeight}px` : "auto",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            transform: virtualized ? `translateY(${offsetY}px)` : "none",
            position: virtualized ? "absolute" : "relative",
            top: 0,
            left: 0,
            width: "100%",
          }}
        >
          {visibleOptions.map((option) => (
            <CascaderMenuItem
              key={option.value}
              option={option}
              depth={depth}
              activeValue={activeValue}
              selectedValue={selectedValue}
              hoveredOption={hoveredOption}
              setHoveredOption={setHoveredOption}
              onSelect={onSelect}
              loadData={loadData}
              itemClassName={itemClassName}
              virtualized={virtualized}
              itemHeight={itemHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CascaderMenuItemProps {
  option: CascaderOption;
  depth: number;
  activeValue?: string | number;
  selectedValue?: string | number;
  hoveredOption: CascaderOption | null;
  setHoveredOption: (option: CascaderOption | null) => void;
  onSelect: (option: CascaderOption, isLeaf: boolean) => void;
  loadData?: (option: CascaderOption) => Promise<void> | void;
  itemClassName?: string;
  virtualized?: boolean;
  itemHeight?: number;
}

function CascaderMenuItem({
  option,
  depth,
  activeValue,
  selectedValue,
  hoveredOption,
  setHoveredOption,
  onSelect,
  loadData,
  itemClassName,
  virtualized,
  itemHeight,
}: CascaderMenuItemProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const isLeaf =
    option.isLeaf ?? (!option.children || option.children.length === 0);
  // If loadData is present and not a leaf, but no children yet, consider it scalable?
  // Actually, standard behavior: isLeaf explicitly true -> leaf.
  // If children empty and loadData exists -> not leaf, can load.
  const canLoad =
    !isLeaf && (!option.children || option.children.length === 0) && !!loadData;

  const isActive =
    activeValue === option.value || hoveredOption?.value === option.value;
  const isSelected = selectedValue === option.value;
  const [isLoading, setIsLoading] = React.useState(false);

  // Show submenu if hovered and has children OR is loading
  const showSubmenu =
    hoveredOption?.value === option.value && (!isLeaf || isLoading);

  const handleMouseEnter = () => {
    if (!option.disabled) {
      setHoveredOption(option);

      // Trigger loadData if needed
      if (canLoad && !isLoading && !option.children?.length) {
        setIsLoading(true);
        const promise = loadData(option);
        if (promise && promise.then) {
          promise
            .then(() => {
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
            });
        } else {
          // If not a promise (sync), just finish
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div
      ref={triggerRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={cn(
          "flex items-center justify-between px-2 py-1.5 text-sm cursor-pointer transition-colors relative",
          option.disabled
            ? "opacity-50 cursor-not-allowed text-aer-muted-foreground"
            : "hover:bg-aer-accent hover:text-aer-accent-foreground",
          isActive &&
            !option.disabled &&
            "bg-aer-accent text-aer-accent-foreground",
          isSelected && "font-medium",
          itemClassName
        )}
        onClick={(e) => {
          if (option.disabled) return;
          e.stopPropagation();
          onSelect(option, isLeaf);
        }}
      >
        <div className="flex items-center gap-2">
          {option.icon && <span className="w-4 h-4">{option.icon}</span>}
          <span>{option.label}</span>
        </div>

        {isSelected && isLeaf && <Check className="w-4 h-4 text-aer-primary" />}

        {!isLeaf &&
          (isLoading ? (
            <Loader2 className="w-4 h-4 text-aer-muted-foreground animate-spin ml-2" />
          ) : (
            <ChevronRight className="w-4 h-4 opacity-50 ml-2" />
          ))}
      </div>

      {/* Render Submenu if hovered */}
      {showSubmenu && option.children && option.children.length > 0 && (
        <CascaderSubMenu
          triggerRef={triggerRef}
          option={option}
          depth={depth}
          onSelect={onSelect}
          selectedValue={selectedValue}
          loadData={loadData}
          itemClassName={itemClassName}
          virtualized={virtualized}
          itemHeight={itemHeight}
        />
      )}
    </div>
  );
}

function CascaderSubMenu({
  triggerRef,
  option,
  depth,
  onSelect,
  selectedValue,
  loadData,
  itemClassName,
  virtualized,
  itemHeight,
}: {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  option: CascaderOption;
  depth: number;
  onSelect: any;
  selectedValue: any;
  loadData?: any;
  itemClassName?: string;
  virtualized?: boolean;
  itemHeight?: number;
}) {
  return ReactDOM.createPortal(
    <CascaderSubMenuContent
      triggerRef={triggerRef}
      option={option}
      depth={depth}
      onSelect={onSelect}
      selectedValue={selectedValue}
      loadData={loadData}
      itemClassName={itemClassName}
      virtualized={virtualized}
      itemHeight={itemHeight}
    />,
    document.body
  );
}

function CascaderSubMenuContent({
  triggerRef,
  option,
  depth,
  onSelect,
  selectedValue,
  loadData,
  itemClassName,
  virtualized,
  itemHeight,
}: {
  triggerRef: React.RefObject<HTMLDivElement | null>;
  option: CascaderOption;
  depth: number;
  onSelect: any;
  selectedValue: any;
  loadData?: any;
  itemClassName?: string;
  virtualized?: boolean;
  itemHeight?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // Initial state: visible but offscreen to ensure dimensions are measurable
  const [style, setStyle] = React.useState<React.CSSProperties>({
    top: -9999,
    left: -9999,
    position: "fixed",
  });

  React.useLayoutEffect(() => {
    if (triggerRef.current && ref.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const rect = ref.current.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;

      const newStyle: React.CSSProperties = {
        position: "fixed",
        zIndex: 1005 + depth,
      };

      // Default: Right of trigger
      let left = triggerRect.right + 4;
      let top = triggerRect.top;

      // Horizontal flip
      if (left + rect.width > innerWidth) {
        left = triggerRect.left - rect.width - 4;
      }

      // Vertical shift
      if (top + rect.height > innerHeight) {
        top = innerHeight - rect.height - 10;
      }
      if (top < 0) top = 10;

      newStyle.left = `${left}px`;
      newStyle.top = `${top}px`;

      setStyle(newStyle);
    }
  }, [depth, triggerRef]);

  return (
    <div ref={ref} className="animate-in fade-in zoom-in-95" style={style}>
      <div
        // Safe area bridge
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "-6px",
          width: "6px",
          zIndex: -1,
        }}
        onMouseEnter={() => {
          // Keep it open
        }}
      />
      <CascaderMenu
        options={option.children!}
        onSelect={onSelect}
        selectedValue={selectedValue}
        depth={depth + 1}
        loadData={loadData}
        itemClassName={itemClassName}
        virtualized={virtualized}
        itemHeight={itemHeight}
      />
    </div>
  );
}
