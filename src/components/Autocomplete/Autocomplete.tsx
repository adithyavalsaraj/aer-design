import { useAerConfig } from "@/components/AerConfigProvider";
import { useAutoPosition } from "@/hooks/useAutoPosition";
import { useDebounce } from "@/hooks/useDebounce";
import { useVirtualization } from "@/hooks/useVirtualization";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Check, ChevronDown, Loader2, X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import { Checkbox } from "../Checkbox";
import type { DropdownOption, DropdownOptionItem } from "../Dropdown/Dropdown";
import type { AutocompleteOption, AutocompleteProps } from "./types";

// --- Variants ---

const autocompleteTriggerVariants = cva(
  "relative flex items-center justify-between w-full px-3 py-2 text-sm transition-all cursor-text select-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        outline:
          "border border-aer-input bg-aer-background rounded-aer-md ring-offset-aer-background focus-within:outline-none focus-within:ring-2 focus-within:ring-aer-ring focus-within:ring-offset-2",
        filled:
          "border-b-2 border-aer-input/20 bg-aer-muted/30 hover:bg-aer-muted/50 rounded-t-md rounded-b-none focus-within:outline-none focus-within:border-aer-primary",
        underlined:
          "border-b border-aer-input bg-transparent rounded-none px-0 focus-within:outline-none focus-within:border-aer-primary",
        aer: "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-2xl ring-1 ring-white/5 transition-all duration-300 focus-within:outline-none",
      },
      error: {
        true: "border-red-500 focus-within:ring-red-500",
        false: "",
      },
      size: {
        default: "min-h-10 h-auto text-sm",
        sm: "min-h-9 h-auto text-xs",
        lg: "min-h-11 h-auto text-base",
      },
    },
    defaultVariants: {
      variant: "outline",
      error: false,
      size: "default",
    },
  }
);

// --- Helper Functions ---

// Flatten groups into a list of all selectable items (reused from Dropdown)
const flattenOptions = (options: DropdownOption[]): DropdownOptionItem[] => {
  const flattened: DropdownOptionItem[] = [];
  options.forEach((opt) => {
    if (isGroup(opt)) {
      flattened.push(...opt.items);
    } else if (isOptionItem(opt)) {
      flattened.push(opt);
    }
  });
  return flattened;
};

// Type guards (reused from Dropdown)
const isOptionItem = (opt: DropdownOption): opt is DropdownOptionItem =>
  !("type" in opt);
const isGroup = (
  opt: DropdownOption
): opt is { type: "group"; label: string; items: DropdownOptionItem[] } =>
  "type" in opt && opt.type === "group";
const isSeparator = (opt: DropdownOption): opt is { type: "separator" } =>
  "type" in opt && opt.type === "separator";

// Default filter function (case-insensitive substring match)
const defaultFilterOption = (
  query: string,
  option: AutocompleteOption
): boolean => {
  if (!query) return true;
  const labelText =
    typeof option.label === "string" ? option.label : String(option.value);
  return labelText.toLowerCase().includes(query.toLowerCase());
};

// Highlight matching text in label
const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query) return text;

  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);

  return (
    <>
      {before}
      <span className="font-semibold bg-aer-primary/20 text-aer-primary">
        {match}
      </span>
      {highlightMatch(after, query)}
    </>
  );
};

// --- Main Component ---

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps>(
  (
    {
      // Data & Options
      options = [],
      dataSource = "local",
      filterOption = defaultFilterOption,

      // Value & Selection
      value,
      defaultValue,
      onChange,
      mode = "single",
      maxSelections,

      // Input Control
      inputValue: controlledInputValue,
      defaultInputValue = "",
      onInputChange,
      placeholder = "Type to search...",

      // Search & Filtering
      onSearch,
      debounceMs = 300,
      minChars = 0,

      // UI & Behavior
      closeOnSelect,
      clearable = true,
      loading = false,
      disabled = false,
      readOnly = false,
      error,

      // Styling & Variants
      variant = "outline",
      size: sizeProp,

      // Label & Help
      label,
      labelPosition = "top",
      labelAlign = "center",
      labelWidth,
      required,
      helperText,
      helperTextClassName,

      // Icons & Addons
      startIcon,
      endIcon,
      prefix,
      suffix,
      addonBefore,
      addonAfter,

      // Custom Rendering
      renderOption,
      renderGroupLabel,
      renderSelectedValue,
      renderEmpty,
      renderLoading,
      renderError,

      // Advanced
      virtualized = false,
      itemHeight = 36,
      onLoadMore,
      hasMore,
      scrollBehavior = "reposition",
      matchTriggerWidth = true,
      wrapSelection = true,
      allowCustomValues = false,

      // Class Names
      className,
      containerClassName,
      inputClassName,
      triggerClassName,
      labelClassName,
      menuClassName,
      itemClassName,
      iconClassName,
      addonClassName,
      errorClassName,

      // Rest props for input element
      ...inputProps
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    // Determine closeOnSelect default based on mode
    const shouldCloseOnSelect = closeOnSelect ?? mode === "single";

    // --- State Management ---

    // Selected value(s) - controlled/uncontrolled
    const [internalValue, setInternalValue] = React.useState<
      string | number | (string | number)[] | undefined
    >(
      defaultValue !== undefined
        ? defaultValue
        : mode === "multiple" || mode === "tags"
        ? []
        : undefined
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    // Input value (search query) - controlled/uncontrolled
    const [internalInputValue, setInternalInputValue] =
      React.useState(defaultInputValue);
    const isInputControlled = controlledInputValue !== undefined;
    const currentInputValue = isInputControlled
      ? controlledInputValue
      : internalInputValue;

    // Dropdown open state
    const [isOpen, setIsOpen] = React.useState(false);

    // Keyboard navigation
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    // Refs
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const hasAddon = addonBefore || addonAfter;

    // Debounced search query
    const debouncedQuery = useDebounce(currentInputValue, debounceMs);

    // --- Auto-positioning ---
    const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
      isOpen,
      side: "bottom",
      align: "start",
      sideOffset: 4,
      strategy: "fixed",
      scrollBehavior,
      onScroll: () => setIsOpen(false),
      matchWidth: matchTriggerWidth,
    });

    // --- Filtering & Options ---

    // Apply filtering based on data source mode
    const filteredOptions = React.useMemo(() => {
      if (dataSource === "remote") {
        // Remote mode: don't filter locally, show all options from parent
        return options;
      }

      // Local or mixed mode: filter locally
      if (!currentInputValue || currentInputValue.length < minChars) {
        return options;
      }

      const filtered: DropdownOption[] = [];
      options.forEach((opt) => {
        if (isGroup(opt)) {
          const matchingItems = opt.items.filter((item) =>
            filterOption(currentInputValue, item as AutocompleteOption)
          );
          if (matchingItems.length > 0) {
            filtered.push({
              type: "group",
              label: opt.label,
              items: matchingItems,
            });
          }
        } else if (isSeparator(opt)) {
          filtered.push(opt);
        } else {
          if (filterOption(currentInputValue, opt as AutocompleteOption)) {
            filtered.push(opt);
          }
        }
      });
      return filtered;
    }, [options, currentInputValue, dataSource, minChars, filterOption]);

    // Get selectable items for keyboard navigation
    const selectableItems = React.useMemo(
      () => flattenOptions(filteredOptions),
      [filteredOptions]
    );

    // --- Remote Search Effect ---
    // Use ref for onSearch to avoid dependency loop if parent doesn't memoize it
    const onSearchRef = React.useRef(onSearch);
    React.useEffect(() => {
      onSearchRef.current = onSearch;
    }, [onSearch]);

    React.useEffect(() => {
      if (dataSource === "remote" || dataSource === "mixed") {
        if (currentInputValue.length >= minChars) {
          onSearchRef.current?.(debouncedQuery);
        }
      }
    }, [debouncedQuery, dataSource, minChars, currentInputValue.length]);

    // --- Selection Helpers ---

    const isSelected = (optionValue: string | number): boolean => {
      if (mode === "multiple" || mode === "tags") {
        return (
          Array.isArray(currentValue) && currentValue.includes(optionValue)
        );
      }
      return currentValue === optionValue;
    };

    const getSelectedOptions = (): AutocompleteOption[] => {
      const allOptions = flattenOptions(options);
      if (mode === "multiple" || mode === "tags") {
        if (!Array.isArray(currentValue)) return [];
        return currentValue
          .map((val) => allOptions.find((opt) => opt.value === val))
          .filter(Boolean) as AutocompleteOption[];
      } else {
        if (!currentValue) return [];
        const opt = allOptions.find((opt) => opt.value === currentValue);
        return opt ? [opt] : [];
      }
    };

    // Get display value for trigger
    const getDisplayValue = (): React.ReactNode => {
      // If input has text (user typing) or is open, don't show the display value overlay
      if (isOpen || (currentInputValue && currentInputValue.length > 0)) {
        return null; // Input will show currentInputValue
      }

      // Custom renderer
      if (renderSelectedValue) {
        return renderSelectedValue({
          value: currentValue!,
          options: getSelectedOptions(),
          mode,
        });
      }

      // Default rendering
      const selectedOptions = getSelectedOptions();
      if (selectedOptions.length === 0) return null;

      if (mode === "multiple" || mode === "tags") {
        // Show chips/tokens for multiple selection
        return selectedOptions.map((opt) => opt.label).join(", ");
      } else {
        return selectedOptions[0]?.label;
      }
    };

    const displayValue = getDisplayValue();

    // --- Event Handlers ---

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (!isInputControlled) {
        setInternalInputValue(newValue);
      }
      onInputChange?.(newValue);

      // Open dropdown when user types
      if (!isOpen && newValue.length >= minChars) {
        setIsOpen(true);
      }
    };

    const handleSelect = (optionValue: string | number) => {
      let newValue: any;

      if (mode === "multiple" || mode === "tags") {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];

        // Check max selections
        if (
          maxSelections &&
          !currentArray.includes(optionValue) &&
          currentArray.length >= maxSelections
        ) {
          return; // Don't add more
        }

        if (currentArray.includes(optionValue)) {
          newValue = currentArray.filter((v) => v !== optionValue);
        } else {
          newValue = [...currentArray, optionValue];
        }

        // Keep focus on input for continued typing/selection
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      } else {
        newValue = optionValue;

        // Clear input and close for single mode
        if (!isInputControlled) {
          setInternalInputValue("");
        }
        onInputChange?.("");
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);

      if (shouldCloseOnSelect) {
        setIsOpen(false);
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = mode === "multiple" || mode === "tags" ? [] : undefined;

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue as any);

      if (!isInputControlled) {
        setInternalInputValue("");
      }
      onInputChange?.("");

      inputRef.current?.focus();
    };

    const handleInputFocus = () => {
      if (!readOnly && !disabled) {
        setIsOpen(true);
      }
    };

    const handleInputBlur = () => {
      // Small delay to allow clicking on options
      setTimeout(() => {
        // Don't close if focus is on the menu OR the input itself (e.g. quickly refocused)
        if (
          !menuRef.current?.contains(document.activeElement) &&
          document.activeElement !== inputRef.current
        ) {
          setIsOpen(false);
        }
      }, 200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      // Handle Escape
      if (e.key === "Escape") {
        setIsOpen(false);
        inputRef.current?.blur();
        return;
      }

      // Handle Enter
      if (e.key === "Enter") {
        e.preventDefault();

        if (isOpen && focusedIndex >= 0 && selectableItems[focusedIndex]) {
          const option = selectableItems[focusedIndex];
          if (!option.disabled) {
            handleSelect(option.value);
          }
        } else if (mode === "tags" && allowCustomValues && currentInputValue) {
          // Create custom tag
          handleSelect(currentInputValue);
          if (!isInputControlled) {
            setInternalInputValue("");
          }
          onInputChange?.("");
        }
        return;
      }

      // Handle Arrow Down
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < selectableItems.length - 1 ? prev + 1 : 0
          );
        }
        return;
      }

      // Handle Arrow Up
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : selectableItems.length - 1
          );
        }
        return;
      }

      // Handle Backspace for tags mode
      if (
        e.key === "Backspace" &&
        !currentInputValue &&
        (mode === "multiple" || mode === "tags")
      ) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (currentArray.length > 0) {
          const newValue = currentArray.slice(0, -1);
          if (!isControlled) {
            setInternalValue(newValue);
          }
          onChange?.(newValue);
        }
        return;
      }
    };

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;

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

    // Virtualization using shared hook
    const virtualizationParams = useVirtualization({
      enabled: virtualized || false,
      itemCount: selectableItems.length,
      itemHeight,
      maxHeight: 250,
      overscan: 3,
    });

    const {
      visibleStart,
      visibleEnd,
      offsetY,
      bottomSpacerHeight,
      containerHeight,
      handleScroll: virtualHandleScroll,
      reset,
    } = virtualizationParams;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      // Forward to virtualization hook if enabled
      if (virtualized) {
        virtualHandleScroll(e);
      }

      // Lazy Loading / Infinite Scroll
      if (onLoadMore && hasMore && !loading) {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollHeight - scrollTop - clientHeight < 50) {
          onLoadMore();
        }
      }
    };

    // Reset virtualization when options change or dropdown opens
    React.useEffect(() => {
      if (virtualized && isOpen) {
        reset();
      }
    }, [selectableItems.length, isOpen, virtualized]);

    // --- Rendering Helpers ---

    const iconSizes = {
      sm: "w-3.5 h-3.5",
      default: "w-4 h-4",
      lg: "w-5 h-5",
    };

    const renderOptionItem = (
      option: AutocompleteOption,
      index: number
    ): React.ReactNode => {
      const selected = isSelected(option.value);
      const active = index === focusedIndex;

      // Custom renderer
      if (renderOption) {
        return renderOption({
          option,
          selected,
          active,
          disabled: option.disabled || false,
          query: currentInputValue,
          onClick: () => {
            if (!option.disabled) {
              handleSelect(option.value);
            }
          },
        });
      }

      // Default rendering
      const labelText =
        typeof option.label === "string" ? option.label : String(option.value);

      return (
        <div
          key={option.value}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => !option.disabled && handleSelect(option.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors select-none rounded-sm",
            selected &&
              mode === "single" &&
              (variant === "aer"
                ? "bg-white/20 font-medium"
                : "bg-aer-primary/10 text-aer-primary font-medium"),
            selected &&
              (mode === "multiple" || mode === "tags") &&
              "bg-transparent",
            !selected &&
              active &&
              (variant === "aer" ? "bg-white/10" : "bg-aer-accent"),
            !selected &&
              !active &&
              !option.disabled &&
              (variant === "aer"
                ? "hover:bg-white/10"
                : "hover:bg-aer-muted/50"),
            option.disabled && "opacity-50 cursor-not-allowed",
            itemClassName
          )}
        >
          {(mode === "multiple" || mode === "tags") && (
            <Checkbox
              checked={selected}
              className="pointer-events-none w-auto"
              readOnly
            />
          )}
          <span
            className={cn(
              "flex-1 min-w-0",
              virtualized ? "truncate" : "wrap-break-word whitespace-normal",
              variant === "aer"
                ? "text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]"
                : "text-aer-foreground"
            )}
          >
            {dataSource === "local" && currentInputValue
              ? highlightMatch(labelText, currentInputValue)
              : labelText}
          </span>
          {mode === "single" && selected && (
            <Check
              className={cn("w-4 h-4 text-aer-primary ml-auto", iconClassName)}
            />
          )}
        </div>
      );
    };

    // Label wrapper helper
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
            {typeof error === "string" && error && (
              <p className={cn("text-xs text-red-500 mt-1.5", errorClassName)}>
                {error}
              </p>
            )}
          </div>
        </div>
      );
    };

    // Stable ref handler to prevent infinite loops
    const handleRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        referenceRef(node as any);
        if (typeof ref === "function") {
          ref(node as any);
        } else if (ref) {
          (ref as any).current = node;
        }
      },
      [ref, referenceRef]
    );

    // Main content
    const autocompleteContent = (
      <div
        className={cn(
          "relative w-full group/autocomplete",
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
            ref={handleRef}
            className={cn(
              autocompleteTriggerVariants({
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
            onClick={() => !disabled && !readOnly && inputRef.current?.focus()}
          >
            {/* Start Elements */}
            <div
              className={cn(
                "flex items-center gap-2 flex-1 min-w-0 py-1",
                wrapSelection ? "flex-wrap" : "flex-nowrap overflow-hidden"
              )}
            >
              {startIcon && (
                <span
                  className={cn(
                    "text-aer-muted-foreground shrink-0 flex items-center justify-center"
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

              {/* Selected Tags for Multiple Mode */}
              {(mode === "multiple" || mode === "tags") &&
                getSelectedOptions().map((opt) => (
                  <span
                    key={opt.value}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-aer-muted text-xs font-medium text-aer-foreground animate-in fade-in-0 zoom-in-95 max-w-full"
                    title={
                      typeof opt.label === "string" ? opt.label : undefined
                    }
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <span className="truncate">{opt.label}</span>
                    {!readOnly && !disabled && (
                      <span
                        role="button"
                        className="hover:text-red-500 cursor-pointer ml-1 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelect(opt.value);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </span>
                    )}
                  </span>
                ))}

              {/* Input Field */}
              <div className="relative flex-1 min-w-[60px] flex items-center">
                {!isOpen &&
                  displayValue &&
                  mode !== "multiple" &&
                  mode !== "tags" && (
                    <span
                      className="absolute inset-0 flex items-center truncate pointer-events-none"
                      onClick={() =>
                        !disabled && !readOnly && inputRef.current?.focus()
                      }
                    >
                      {displayValue}
                    </span>
                  )}
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInputValue}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    (!displayValue || mode === "multiple" || mode === "tags") &&
                    getSelectedOptions().length === 0
                      ? placeholder
                      : ""
                  }
                  disabled={disabled}
                  readOnly={readOnly}
                  aria-autocomplete="list"
                  aria-controls={isOpen ? "autocomplete-listbox" : undefined}
                  aria-expanded={isOpen}
                  aria-activedescendant={
                    focusedIndex >= 0
                      ? `autocomplete-option-${focusedIndex}`
                      : undefined
                  }
                  role="combobox"
                  className={cn(
                    "w-full bg-transparent outline-none min-w-8",
                    !isOpen &&
                      displayValue &&
                      mode !== "multiple" &&
                      mode !== "tags" &&
                      "opacity-0",
                    inputClassName
                  )}
                  {...inputProps}
                />
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
              {clearable &&
                (displayValue || currentInputValue) &&
                !disabled &&
                !readOnly && (
                  <div
                    role="button"
                    onClick={handleClear}
                    className="p-0.5 rounded-full hover:bg-aer-muted text-aer-muted-foreground transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </div>
                )}
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin text-aer-muted-foreground" />
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
              role="listbox"
              id="autocomplete-listbox"
            >
              {/* Options List */}
              <div
                className="overflow-y-auto max-h-[250px]"
                style={{
                  height: virtualized ? containerHeight : "auto",
                }}
                onScroll={handleScroll}
              >
                {loading && options.length === 0 ? (
                  renderLoading ? (
                    renderLoading()
                  ) : (
                    <div className="flex items-center justify-center py-6 text-sm text-aer-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading...
                    </div>
                  )
                ) : selectableItems.length === 0 ? (
                  renderEmpty ? (
                    renderEmpty(currentInputValue)
                  ) : (
                    <div className="py-6 text-center text-sm text-aer-muted-foreground">
                      {currentInputValue
                        ? `No results found for "${currentInputValue}"`
                        : "No options available"}
                    </div>
                  )
                ) : (
                  <>
                    {/* Virtual scrolling spacer for top */}
                    {virtualized && <div style={{ height: offsetY }} />}

                    <div className="p-1">
                      {virtualized
                        ? selectableItems
                            .slice(visibleStart, visibleEnd)
                            .map((option, i) =>
                              renderOptionItem(option, visibleStart + i)
                            )
                        : filteredOptions.map((item, itemIndex) => {
                            if (isGroup(item)) {
                              return (
                                <div key={`group-${itemIndex}`}>
                                  {renderGroupLabel ? (
                                    renderGroupLabel({
                                      label: item.label,
                                      itemCount: item.items.length,
                                    })
                                  ) : (
                                    <div className="px-2 py-1.5 text-xs font-semibold text-aer-muted-foreground uppercase tracking-wide">
                                      {item.label}
                                    </div>
                                  )}
                                  {item.items.map((option) => {
                                    const selectableIndex =
                                      selectableItems.findIndex(
                                        (si) => si.value === option.value
                                      );
                                    return renderOptionItem(
                                      option as AutocompleteOption,
                                      selectableIndex
                                    );
                                  })}
                                </div>
                              );
                            } else if (isSeparator(item)) {
                              return (
                                <div
                                  key={`separator-${itemIndex}`}
                                  className="my-1 h-px bg-aer-border"
                                />
                              );
                            } else {
                              const selectableIndex = selectableItems.findIndex(
                                (si) =>
                                  si.value ===
                                  (item as DropdownOptionItem).value
                              );
                              return renderOptionItem(
                                item as AutocompleteOption,
                                selectableIndex
                              );
                            }
                          })}
                    </div>

                    {/* Virtual scrolling spacer for bottom */}
                    {virtualized && (
                      <div style={{ height: bottomSpacerHeight }} />
                    )}
                  </>
                )}
              </div>
            </div>,
            document.body
          )}
      </div>
    );

    return renderWithLabel(autocompleteContent);
  }
);

Autocomplete.displayName = "Autocomplete";
