import { useAutoPosition } from "@/hooks/useAutoPosition";
import { cn } from "@/lib/utils";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import type { CascaderOption, RenderCascaderOptionProps } from "./types";

interface CascaderMenuProps {
  options: CascaderOption[];
  onSelect: (option: CascaderOption, isLeaf: boolean) => void;
  activeValue?: string | number;
  selectedValue?: string | number;
  depth?: number;
  loadData?: (option: CascaderOption) => Promise<void> | void;
  itemClassName?: string;
  virtualized?: boolean;
  itemHeight?: number;
  className?: string; // Appears as 'className' on the root element
  menuClassName?: string; // Propagated class for submenus
  scrollBehavior?: "close" | "reposition";
  renderOption?: (props: RenderCascaderOptionProps) => React.ReactNode;
  variant?: "outline" | "filled" | "underlined" | "aer";
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
  className,
  menuClassName,
  scrollBehavior = "reposition",
  renderOption,
}: CascaderMenuProps) {
  const [hoveredOption, setHoveredOption] =
    React.useState<CascaderOption | null>(null);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);
  const menuHeight = 300;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const visibleCount = Math.ceil(menuHeight / itemHeight) + 1;
  const totalHeight = options.length * itemHeight;

  const startIndex = virtualized ? Math.floor(scrollTop / itemHeight) : 0;
  const endIndex = virtualized
    ? Math.min(options.length, startIndex + visibleCount)
    : options.length;

  const visibleOptions = virtualized
    ? options.slice(startIndex, endIndex)
    : options;
  const offsetY = virtualized ? startIndex * itemHeight : 0;

  // If menuClassName is not explicitly passed, we might want to capture the current className
  // to pass down as the style for submenus if this is the root.
  // However, usually specific styling is passed via className.
  const effectiveMenuClass = menuClassName || className;

  return (
    <div
      data-cascader-menu
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "flex flex-col min-w-[180px] bg-aer-background border border-aer-border rounded-lg shadow-lg py-1",
        virtualized && "py-0",
        className
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
              menuClassName={effectiveMenuClass}
              scrollBehavior={scrollBehavior}
              renderOption={renderOption}
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
  menuClassName?: string;
  scrollBehavior?: "close" | "reposition";
  renderOption?: (props: RenderCascaderOptionProps) => React.ReactNode;
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
  menuClassName,
  scrollBehavior,
  renderOption,
}: CascaderMenuItemProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const isLeaf =
    option.isLeaf ?? (!option.children || option.children.length === 0);
  const canLoad =
    !isLeaf && (!option.children || option.children.length === 0) && !!loadData;

  const isActive =
    activeValue === option.value || hoveredOption?.value === option.value;
  const isSelected = selectedValue === option.value;
  const [isLoading, setIsLoading] = React.useState(false);

  const showSubmenu =
    hoveredOption?.value === option.value && (!isLeaf || isLoading);

  const handleMouseEnter = () => {
    if (!option.disabled) {
      setHoveredOption(option);

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
        {renderOption ? (
          <React.Fragment>
            {renderOption({
              option,
              selected: isSelected,
              active: isActive,
              disabled: option.disabled || false,
              isLeaf,
              onClick: (e: React.MouseEvent) => {
                if (option.disabled) return;
                e.stopPropagation();
                onSelect(option, isLeaf);
              },
            })}
          </React.Fragment>
        ) : (
          <>
            <div className="flex-1 min-w-0 flex items-center gap-2">
              {option.icon && (
                <span className="w-4 h-4 shrink-0">{option.icon}</span>
              )}
              <span
                className={cn(
                  virtualized ? "truncate" : "wrap-break-word whitespace-normal"
                )}
              >
                {option.label}
              </span>
            </div>

            {isSelected && isLeaf && (
              <Check className="w-4 h-4 text-aer-primary" />
            )}

            {!isLeaf &&
              (isLoading ? (
                <Loader2 className="w-4 h-4 text-aer-muted-foreground animate-spin ml-2" />
              ) : (
                <ChevronRight className="w-4 h-4 opacity-50 ml-2" />
              ))}
          </>
        )}
      </div>

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
          menuClassName={menuClassName}
          scrollBehavior={scrollBehavior}
          renderOption={renderOption}
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
  menuClassName,
  scrollBehavior,
  renderOption,
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
  menuClassName?: string;
  scrollBehavior?: "close" | "reposition";
  renderOption?: (props: RenderCascaderOptionProps) => React.ReactNode;
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
      menuClassName={menuClassName}
      scrollBehavior={scrollBehavior}
      renderOption={renderOption}
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
  menuClassName,
  scrollBehavior,
  renderOption,
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
  menuClassName?: string;
  scrollBehavior?: "close" | "reposition";
  renderOption?: (props: RenderCascaderOptionProps) => React.ReactNode;
}) {
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen: true,
    side: "right",
    align: "start",
    sideOffset: 4,
    strategy: "fixed",
    scrollBehavior,
  });

  // Link triggerRef to referenceRef
  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      referenceRef(triggerRef.current);
    }
  }, [triggerRef, referenceRef]);

  return (
    <div
      ref={floatingRef}
      className="animate-in fade-in zoom-in-95"
      style={{ ...floatingStyles, zIndex: 1005 + depth }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "-6px",
          width: "6px",
          zIndex: -1,
        }}
        onMouseEnter={() => {}}
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
        className={menuClassName}
        menuClassName={menuClassName}
        scrollBehavior={scrollBehavior}
        renderOption={renderOption}
      />
    </div>
  );
}
