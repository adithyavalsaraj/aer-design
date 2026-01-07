import { useAerConfig } from "@/components/AerConfigProvider";
import { useAutoPosition } from "@/hooks/useAutoPosition";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import { Checkbox } from "../Checkbox";

// --- Variants ---

const dropdownTriggerVariants = cva(
  "relative flex items-center justify-between w-full px-3 py-2 text-sm transition-all cursor-pointer select-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline:
          "border border-aer-input bg-aer-background rounded-aer-md ring-offset-aer-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring focus-visible:ring-offset-2",
        filled:
          "border-b-2 border-aer-input/20 bg-aer-muted/30 hover:bg-aer-muted/50 rounded-t-md rounded-b-none focus-visible:outline-none focus-visible:border-aer-primary",
        underlined:
          "border-b border-aer-input bg-transparent rounded-none px-0 focus-visible:outline-none focus-visible:border-aer-primary",
        aer: "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-2xl ring-1 ring-white/5 transition-all duration-300 focus-visible:outline-none",
      },
      error: {
        true: "border-red-500 focus-visible:ring-red-500",
        false: "",
      },
      size: {
        default: "h-10 text-sm",
        sm: "h-9 text-xs",
        lg: "h-11 text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      error: false,
      size: "default",
    },
  }
);

// --- Types ---

export type DropdownOptionItem = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
};

export type DropdownOption =
  | DropdownOptionItem
  | { type: "group"; label: string; items: DropdownOptionItem[] }
  | { type: "separator" };

export interface DropdownProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLDivElement>,
      "onChange" | "value" | "defaultValue" | "prefix"
    >,
    Omit<VariantProps<typeof dropdownTriggerVariants>, "error"> {
  options: DropdownOption[];
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: any) => void;
  placeholder?: string;
  label?: string;
  /** Position of the label relative to the input. @default "top" */
  labelPosition?: "top" | "left";
  /** Vertical alignment of label when position is "left". @default "center" */
  labelAlign?: "start" | "center" | "end";
  /** Fixed width for label when position is "left". */
  labelWidth?: string;
  /** Whether the field is required (shows asterisk). */
  required?: boolean;
  /** Helper text to display below the input. */
  helperText?: string;
  /** CSS classes for the helper text. */
  helperTextClassName?: string;
  multiple?: boolean;
  searchable?: boolean;
  onSearch?: (query: string) => void;
  clearable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  virtualized?: boolean;
  itemHeight?: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  maxDisplayCount?: number;
  /** CSS classes for the root container element */
  className?: string;
  /** DEPRECATED: Use className instead. */
  containerClassName?: string;
  /** CSS classes for the clickable trigger element */
  triggerClassName?: string;
  /** CSS classes for the label text */
  labelClassName?: string;
  /** CSS classes for the dropdown menu container */
  menuClassName?: string;
  /** CSS classes for individual dropdown items */
  itemClassName?: string;
  /** CSS classes for icons (startIcon and endIcon) */
  iconClassName?: string;
  /** CSS classes for addon containers */
  addonClassName?: string;
  /** CSS classes for the error message text */
  errorClassName?: string;
  size?: "sm" | "default" | "lg";
  /** Behavior when the page or parent container scrolls. @default "reposition" */
  scrollBehavior?: "close" | "reposition";
}

// --- Helper Functions ---

// Flatten groups into a list of all selectable items
const flattenOptions = (options: DropdownOption[]): DropdownOptionItem[] => {
  const flattened: DropdownOptionItem[] = [];
  options.forEach((opt) => {
    if (isGroup(opt)) {
      flattened.push(...opt.items);
    } else if (isOptionItem(opt)) {
      flattened.push(opt);
    }
    // Separators are skipped
  });
  return flattened;
};

// Type guards
const isOptionItem = (opt: DropdownOption): opt is DropdownOptionItem =>
  !("type" in opt);
const isGroup = (
  opt: DropdownOption
): opt is { type: "group"; label: string; items: DropdownOptionItem[] } =>
  "type" in opt && opt.type === "group";
const isSeparator = (opt: DropdownOption): opt is { type: "separator" } =>
  "type" in opt && opt.type === "separator";

// --- Components ---

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      containerClassName,
      triggerClassName,
      labelClassName,
      menuClassName,
      itemClassName,
      iconClassName,
      addonClassName,
      errorClassName,
      variant = "outline",
      options = [],
      value,
      defaultValue,
      onChange,
      placeholder = "Select...",
      label,
      labelPosition = "top",
      labelAlign = "center",
      labelWidth,
      required,
      helperText,
      helperTextClassName,
      multiple,
      searchable,
      onSearch,
      clearable,
      loading,
      disabled,
      error,
      virtualized,
      scrollBehavior = "reposition",
      itemHeight = 36,
      onLoadMore,
      hasMore,
      startIcon,
      endIcon,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      maxDisplayCount, // Optional prop to fallback to "{n} selected"
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    // Uncontrolled State Management
    const [internalValue, setInternalValue] = React.useState<
      string | number | (string | number)[] | undefined
    >(defaultValue !== undefined ? defaultValue : multiple ? [] : undefined);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null); // Ref for the floating menu

    const hasAddon = addonBefore || addonAfter;

    // Auto-positioning hook
    const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
      isOpen,
      side: "bottom",
      align: "start",
      sideOffset: 4,
      strategy: "fixed",
      scrollBehavior,
      onScroll: () => setIsOpen(false),
    });

    // Flatten all selectable options from groups
    const allSelectableOptions = React.useMemo(
      () => flattenOptions(options),
      [options]
    );

    // Build renderable list (includes groups, separators, and items)
    // For search, we filter items but keep group structure
    const renderableItems = React.useMemo(() => {
      if (!searchable || !searchQuery) {
        // No search - return all options as-is
        return options;
      }

      // With search - filter items and only show groups that have matching items
      const filtered: DropdownOption[] = [];
      options.forEach((opt) => {
        if (isGroup(opt)) {
          const matchingItems = opt.items.filter((item) => {
            const labelText =
              typeof item.label === "string" ? item.label : String(item.value);
            return labelText.toLowerCase().includes(searchQuery.toLowerCase());
          });
          if (matchingItems.length > 0) {
            filtered.push({
              type: "group",
              label: opt.label,
              items: matchingItems,
            });
          }
        } else if (isSeparator(opt)) {
          // Keep separators for now (could be removed if adjacent groups are filtered out)
          filtered.push(opt);
        } else {
          // Regular item
          const labelText =
            typeof opt.label === "string" ? opt.label : String(opt.value);
          if (labelText.toLowerCase().includes(searchQuery.toLowerCase())) {
            filtered.push(opt);
          }
        }
      });
      return filtered;
    }, [options, searchQuery, searchable]);

    // Flatten renderable items to get only selectable options for keyboard navigation
    const selectableItems = React.useMemo(
      () => flattenOptions(renderableItems),
      [renderableItems]
    );

    // Check if a value is selected
    const isSelected = (optionValue: string | number) => {
      if (multiple) {
        return (
          Array.isArray(currentValue) && currentValue.includes(optionValue)
        );
      }
      return currentValue === optionValue;
    };

    // Helper to get display label
    const getDisplayLabel = () => {
      if (multiple) {
        if (!Array.isArray(currentValue) || currentValue.length === 0)
          return null;

        // Default to comma-separated list
        // If maxDisplayCount is set and length exceeds it, show count
        if (maxDisplayCount && currentValue.length > maxDisplayCount) {
          return `${currentValue.length} selected`;
        }

        const selectedLabels = currentValue.map((val) => {
          const opt = allSelectableOptions.find((o) => o.value === val);
          return opt?.label || val;
        });

        return selectedLabels.join(", ");
      } else {
        if (
          currentValue === undefined ||
          currentValue === null ||
          currentValue === ""
        )
          return null;
        const opt = allSelectableOptions.find((o) => o.value === currentValue);
        return opt ? opt.label : currentValue;
      }
    };

    const displayValue = getDisplayLabel();

    // Handle selection
    const handleSelect = (optionValue: string | number) => {
      let newValue: any;

      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (currentArray.includes(optionValue)) {
          newValue = currentArray.filter((v) => v !== optionValue);
        } else {
          newValue = [...currentArray, optionValue];
        }
      } else {
        newValue = optionValue;
        setIsOpen(false);
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    // Clear Selection
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = multiple ? [] : undefined;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    // Close on outside click is handled by a listener below

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

        // Check if click is outside both the container AND the floating menu
        const isOutsideContainer =
          containerRef.current && !containerRef.current.contains(target);
        const isOutsideMenu =
          menuRef.current && !menuRef.current.contains(target);

        if (isOutsideContainer && isOutsideMenu) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Virtualization Logic (disabled for now with groups - will implement later)

    const listHeight = Math.min(selectableItems.length * itemHeight, 250);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;

      // Lazy load trigger
      if (onLoadMore && hasMore && !loading) {
        if (
          target.scrollHeight - target.scrollTop <=
          target.clientHeight + 50
        ) {
          onLoadMore();
        }
      }
    };

    const iconSizes = {
      sm: "w-3.5 h-3.5",
      default: "w-4 h-4",
      lg: "w-5 h-5",
    };

    // Label wrapper component
    const renderWithLabel = (content: React.ReactNode) => {
      if (!label) return content;

      return (
        <div
          className={cn(
            "flex",
            labelPosition === "left"
              ? "flex-row items-start gap-4"
              : "flex-col gap-1",
            className || containerClassName
          )}
        >
          <label
            className={cn(
              "text-sm font-medium text-aer-foreground",
              labelPosition === "left" && labelWidth && `w-[${labelWidth}]`,
              labelPosition === "left" && `self-${labelAlign}`,
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <div className={cn("flex-1", labelPosition === "left" && "min-w-0")}>
            {content}
            {helperText && (
              <p
                className={cn(
                  "text-xs text-aer-muted-foreground mt-1.5",
                  helperTextClassName
                )}
              >
                {helperText}
              </p>
            )}
          </div>
        </div>
      );
    };

    const dropdownContent = (
      <div
        className={cn(
          "relative w-full group/dropdown",
          !label && (className || containerClassName)
        )}
        ref={containerRef}
      >
        <div className="flex items-stretch w-full">
          {addonBefore && (
            <div
              className={cn(
                "flex items-center px-3 border border-r-0 rounded-l-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap",
                addonClassName
              )}
            >
              {addonBefore}
            </div>
          )}

          <div
            ref={(node) => {
              referenceRef(node as any);
              (containerRef as any).current = node;
              if (typeof ref === "function") ref(node as any);
              else if (ref) (ref as any).current = node;
            }}
            className={cn(
              dropdownTriggerVariants({
                variant,
                error: !!error,
                size,
              }),
              !hasAddon && variant === "outline" && "rounded-aer-md",
              addonBefore && "border-l-0 rounded-l-none",
              addonAfter && "border-r-0 rounded-r-none",
              addonBefore && !addonAfter && "rounded-r-aer-md",
              addonAfter && !addonBefore && "rounded-l-aer-md",
              triggerClassName
            )}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (disabled) return;

              // Handle Space key
              if (e.key === " " && !searchable) {
                // Allow space in search
                e.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                  // Select focused option
                  const option = selectableItems[focusedIndex];
                  if (option && !option.disabled) {
                    handleSelect(option.value);
                  }
                } else {
                  setIsOpen(!isOpen);
                }
                return;
              }

              // Handle Enter key
              if (e.key === "Enter") {
                e.preventDefault();
                if (isOpen && focusedIndex >= 0) {
                  const option = selectableItems[focusedIndex];
                  if (option && !option.disabled) {
                    handleSelect(option.value);
                  }
                } else {
                  setIsOpen(!isOpen);
                }
                return;
              }

              if (e.key === "Escape") setIsOpen(false);

              // Arrow key navigation when open
              if (isOpen && selectableItems.length > 0) {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setFocusedIndex((prev) =>
                    prev < selectableItems.length - 1 ? prev + 1 : 0
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setFocusedIndex((prev) =>
                    prev > 0 ? prev - 1 : selectableItems.length - 1
                  );
                } else if (e.key === "Home") {
                  e.preventDefault();
                  setFocusedIndex(0);
                } else if (e.key === "End") {
                  e.preventDefault();
                  setFocusedIndex(selectableItems.length - 1);
                }
              }
            }}
            {...(props as any)}
          >
            {/* Label / Start Elements */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {startIcon && (
                <span
                  className={cn(
                    "text-aer-muted-foreground shrink-0 flex items-center justify-center mr-2" // Ensure centering and spacing
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center",
                      iconSizes[size],
                      iconClassName
                    )}
                  >
                    {startIcon}
                  </div>
                </span>
              )}
              {prefix && (
                <span className="text-aer-muted-foreground text-sm font-medium shrink-0 flex items-center">
                  {prefix}
                </span>
              )}

              <div
                className={cn(
                  "relative flex-1 text-left h-full flex flex-col justify-center"
                )}
              >
                {/* Display Value */}
                {displayValue ? (
                  <span className="block truncate">{displayValue}</span>
                ) : (
                  <span className="text-aer-muted-foreground">
                    {placeholder}
                  </span>
                )}
              </div>
            </div>

            {/* End Elements */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              {suffix && (
                <span className="text-aer-muted-foreground text-sm font-medium shrink-0 whitespace-nowrap">
                  {suffix}
                </span>
              )}
              {endIcon && (
                <span
                  className={cn(
                    "text-aer-muted-foreground flex items-center justify-center",
                    iconSizes[size],
                    iconClassName
                  )}
                >
                  {endIcon}
                </span>
              )}
              {clearable && displayValue && !disabled && (
                <div
                  role="button"
                  onClick={handleClear}
                  className="p-0.5 rounded-full hover:bg-aer-muted text-aer-muted-foreground transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-aer-muted-foreground transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </div>
          </div>

          {addonAfter && (
            <div
              className={cn(
                "flex items-center px-3 border border-l-0 rounded-r-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap",
                addonClassName
              )}
            >
              {addonAfter}
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        {isOpen &&
          createPortal(
            <div
              ref={(node) => {
                floatingRef(node);
                menuRef.current = node;
              }}
              style={{ ...floatingStyles, zIndex: 1000 }}
              className={cn(
                "fixed border rounded-aer-md shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95",
                variant === "aer"
                  ? "bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl ring-1 ring-white/5"
                  : "bg-aer-background border-aer-border",
                menuClassName
              )}
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-aer-border">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-aer-muted-foreground" />
                    <input
                      autoFocus
                      className="w-full pl-8 pr-3 py-1.5 text-sm bg-transparent placeholder:text-aer-muted-foreground outline-none rounded-md focus:bg-aer-muted/50"
                      placeholder="Search..."
                      value={searchQuery}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        onSearch?.(e.target.value);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div
                ref={listRef}
                className="overflow-y-auto max-h-[250px]"
                style={{
                  position: "relative",
                  height: virtualized ? listHeight : "auto",
                }}
                onScroll={handleScroll}
              >
                {loading && options.length === 0 ? (
                  <div className="flex items-center justify-center py-6 text-sm text-aer-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading...
                  </div>
                ) : selectableItems.length === 0 ? (
                  <div className="py-6 text-center text-sm text-aer-muted-foreground">
                    No options found.
                  </div>
                ) : (
                  <div className="p-1">
                    {renderableItems.map((item, itemIndex) => {
                      if (isGroup(item)) {
                        // Render group label + its items
                        return (
                          <div key={`group-${itemIndex}`}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-aer-muted-foreground uppercase tracking-wide">
                              {item.label}
                            </div>
                            {item.items.map((option) => {
                              // Find this option's index in selectableItems for keyboard navigation
                              const selectableIndex = selectableItems.findIndex(
                                (si) => si.value === option.value
                              );
                              const isOptSelected = isSelected(option.value);

                              return (
                                <div
                                  key={option.value}
                                  onClick={() =>
                                    !option.disabled &&
                                    handleSelect(option.value)
                                  }
                                  className={cn(
                                    "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors select-none rounded-sm",
                                    isOptSelected &&
                                      !multiple &&
                                      (variant === "aer"
                                        ? "bg-white/20 font-medium"
                                        : "bg-aer-primary/10 text-aer-primary font-medium"),
                                    isOptSelected &&
                                      multiple &&
                                      "bg-transparent",
                                    !isOptSelected &&
                                      selectableIndex === focusedIndex &&
                                      (variant === "aer"
                                        ? "bg-white/10"
                                        : "bg-aer-accent"),
                                    !isOptSelected &&
                                      selectableIndex !== focusedIndex &&
                                      (variant === "aer"
                                        ? "hover:bg-white/10"
                                        : "hover:bg-aer-muted/50"),
                                    option.disabled &&
                                      "opacity-50 cursor-not-allowed pointer-events-none",
                                    itemClassName
                                  )}
                                >
                                  {multiple && (
                                    <Checkbox
                                      checked={isOptSelected}
                                      className="pointer-events-none w-auto"
                                      readOnly
                                    />
                                  )}
                                  <span
                                    className={cn(
                                      "truncate flex-1",
                                      variant === "aer"
                                        ? "text-white! [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
                                        : "text-aer-foreground"
                                    )}
                                  >
                                    {option.label}
                                  </span>
                                  {!multiple && isOptSelected && (
                                    <Check
                                      className={cn(
                                        "w-4 h-4 text-aer-primary ml-auto",
                                        iconClassName
                                      )}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        );
                      } else if (isSeparator(item)) {
                        // Render separator
                        return (
                          <div
                            key={`separator-${itemIndex}`}
                            className="my-1 h-px bg-aer-border"
                          />
                        );
                      } else {
                        // Render regular option
                        const selectableIndex = selectableItems.findIndex(
                          (si) => si.value === item.value
                        );
                        const isOptSelected = isSelected(item.value);

                        return (
                          <div
                            key={item.value}
                            onClick={() =>
                              !item.disabled && handleSelect(item.value)
                            }
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors select-none rounded-sm",
                              isOptSelected &&
                                !multiple &&
                                (variant === "aer"
                                  ? "bg-white/20 text-white font-medium"
                                  : "bg-aer-primary/10 text-aer-primary font-medium"),
                              isOptSelected && multiple && "bg-transparent",
                              !isOptSelected &&
                                selectableIndex === focusedIndex &&
                                (variant === "aer"
                                  ? "bg-white/10"
                                  : "bg-aer-accent"),
                              !isOptSelected &&
                                selectableIndex !== focusedIndex &&
                                (variant === "aer"
                                  ? "hover:bg-white/10"
                                  : "hover:bg-aer-muted/50"),
                              item.disabled &&
                                "opacity-50 cursor-not-allowed pointer-events-none",
                              itemClassName
                            )}
                          >
                            {multiple && (
                              <Checkbox
                                checked={isOptSelected}
                                className="pointer-events-none w-auto"
                                readOnly
                              />
                            )}
                            <span
                              className={cn(
                                "truncate flex-1",
                                variant === "aer"
                                  ? "text-white! [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
                                  : "text-aer-foreground"
                              )}
                            >
                              {item.label}
                            </span>
                            {!multiple && isOptSelected && (
                              <Check
                                className={cn(
                                  "w-4 h-4 text-aer-primary ml-auto",
                                  iconClassName
                                )}
                              />
                            )}
                          </div>
                        );
                      }
                    })}
                  </div>
                )}
                {loading && options.length > 0 && (
                  <div className="py-2 text-center">
                    <Loader2 className="w-4 h-4 animate-spin mx-auto text-aer-muted-foreground" />
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
        {typeof error === "string" && (
          <div
            className={cn(
              "text-xs text-red-500 font-medium mt-1.5 ml-1",
              errorClassName
            )}
          >
            {error}
          </div>
        )}
      </div>
    );

    return renderWithLabel(dropdownContent);
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown };
