import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";
import * as React from "react";
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
      },
      error: {
        true: "border-red-500 focus-visible:ring-red-500",
        false: "",
      },
      floatingLabel: {
        true: "", // Layout handled by inner elements now
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
      floatingLabel: false,
      size: "default",
    },
  }
);

// --- Types ---

export type DropdownOption = {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
};

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
  floatingLabel?: boolean;
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
  prefix?: React.ReactNode;
  maxDisplayCount?: number;
  /* duplicates removed */
  containerClassName?: string;
  size?: "sm" | "default" | "lg";
  menuClassName?: string;
}

// --- Components ---

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className,
      containerClassName,
      menuClassName,
      variant = "outline",
      options = [],
      value,
      defaultValue,
      onChange,
      placeholder = "Select...",
      label,
      floatingLabel,
      multiple,
      searchable,
      onSearch,
      clearable,
      loading,
      disabled,
      error,
      virtualized,
      itemHeight = 36,
      onLoadMore,
      hasMore,
      startIcon,
      prefix,
      /* duplicates removed */
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
    const containerRef = React.useRef<HTMLDivElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    // Filter options locally if not using external search
    const displayedOptions = React.useMemo(() => {
      if (!searchable || onSearch) return options;
      return options.filter((opt) => {
        const labelText =
          typeof opt.label === "string" ? opt.label : String(opt.value);
        return labelText.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }, [options, searchQuery, searchable, onSearch]);

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
          const opt = options.find((o) => o.value === val);
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
        const opt = options.find((o) => o.value === currentValue);
        return opt ? opt.label : currentValue;
      }
    };

    const displayValue = getDisplayLabel();
    const isFloating = isOpen || !!displayValue || !!searchQuery;

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

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Virtualization Logic
    const [scrollTop, setScrollTop] = React.useState(0);
    const listHeight = Math.min(displayedOptions.length * itemHeight, 250);
    const visibleCount = Math.ceil(listHeight / itemHeight) + 2;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + visibleCount,
      displayedOptions.length
    );

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const target = e.currentTarget;
      setScrollTop(target.scrollTop);

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

    const renderedOptions = virtualized
      ? displayedOptions.slice(startIndex, endIndex).map((opt, index) => ({
          ...opt,
          virtualIndex: startIndex + index,
        }))
      : displayedOptions;

    const iconSizes = {
      sm: "w-3.5 h-3.5",
      default: "w-4 h-4",
      lg: "w-5 h-5",
    };

    return (
      <div
        className={cn("relative w-full group/dropdown", containerClassName)}
        ref={containerRef}
      >
        {/* Trigger */}
        <div
          ref={ref as any}
          className={cn(
            dropdownTriggerVariants({
              variant,
              error: !!error,
              floatingLabel,
              size,
            }),
            dropdownTriggerVariants({
              variant,
              error: !!error,
              floatingLabel,
              size,
            }),
            className
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
            if (e.key === "Escape") setIsOpen(false);
          }}
          {...(props as any)}
        >
          {/* Floating Label - Moved to root for correct positioning relative to container */}

          {/* Label / Start Elements */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {startIcon && (
              <span
                className={cn(
                  "text-aer-muted-foreground shrink-0 flex items-center justify-center mr-2" // Ensure centering and spacing
                )}
              >
                {/* Clone element to modify size if it's an SVG, or just wrap it */}
                <div
                  className={cn(
                    "flex items-center justify-center",
                    iconSizes[size]
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
                "relative flex-1 text-left h-full flex flex-col justify-center",
                floatingLabel && isFloating && "pt-3.5 pb-0.5", // Push text down when label active
                floatingLabel && !isFloating && "py-2" // Center placeholder
              )}
            >
              {/* Floating Label - Moved inside to respect startIcon/prefix layout */}
              {floatingLabel && (
                <span
                  className={cn(
                    "absolute left-0 transition-all duration-200 pointer-events-none origin-left text-aer-muted-foreground z-10",
                    isFloating
                      ? "top-1 text-xs text-aer-primary scale-90" // Active state - positioned at top
                      : "top-1/2 -translate-y-1/2 text-sm" // Placeholder state
                  )}
                >
                  {label || placeholder}
                </span>
              )}

              {/* Display Value */}
              {displayValue ? (
                <span className="block truncate">{displayValue}</span>
              ) : (
                !floatingLabel && (
                  <span className="text-aer-muted-foreground">
                    {placeholder}
                  </span>
                )
              )}
            </div>
          </div>

          {/* End Elements */}
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1 bg-aer-background border border-aer-border rounded-aer-md shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95",
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
              ) : displayedOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-aer-muted-foreground">
                  No options found.
                </div>
              ) : (
                <div
                  style={
                    virtualized
                      ? {
                          height: `${displayedOptions.length * itemHeight}px`,
                          position: "relative",
                        }
                      : undefined
                  }
                >
                  {renderedOptions.map((option, index) => {
                    const realIndex = virtualized
                      ? (option as any).virtualIndex
                      : index;
                    const isOptSelected = isSelected(option.value);

                    return (
                      <div
                        key={option.value}
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors select-none",
                          isOptSelected &&
                            !multiple &&
                            "bg-aer-primary/10 text-aer-primary font-medium",
                          isOptSelected && multiple && "bg-transparent", // Checkbox handles style
                          !isOptSelected && "hover:bg-aer-muted/50",
                          option.disabled &&
                            "opacity-50 cursor-not-allowed pointer-events-none"
                        )}
                        style={
                          virtualized
                            ? {
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${itemHeight}px`,
                                transform: `translateY(${
                                  realIndex * itemHeight
                                }px)`,
                              }
                            : undefined
                        }
                      >
                        {multiple && (
                          <Checkbox
                            checked={isOptSelected}
                            className="pointer-events-none w-auto"
                            readOnly
                          />
                        )}
                        <span className="truncate flex-1 text-aer-foreground">
                          {option.label}
                        </span>
                        {!multiple && isOptSelected && (
                          <Check className="w-4 h-4 text-aer-primary ml-auto" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {loading && options.length > 0 && (
                <div className="py-2 text-center">
                  <Loader2 className="w-4 h-4 animate-spin mx-auto text-aer-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown };
