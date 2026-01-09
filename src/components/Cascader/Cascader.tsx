import { useAerConfig } from "@/components/AerConfigProvider";
import { useAutoPosition } from "@/hooks/useAutoPosition";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronDown, X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import { CascaderMenu } from "./CascaderMenu";
import type { CascaderOption, CascaderProps } from "./types";
import { getOptionPath } from "./utils";

const cascaderTriggerVariants = cva(
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
        aer: "border border-white/10 bg-white/5 backdrop-blur-md shadow-md text-white hover:bg-white/10 focus-visible:ring-white/20",
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
      isOpen: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "outline",
        isOpen: true,
        class: "ring-2 ring-aer-ring border-aer-primary",
      },
    ],
    defaultVariants: {
      variant: "outline",
      error: false,
      size: "default",
      isOpen: false,
    },
  }
);

export function Cascader({
  options,
  value,
  onChange,
  placeholder = "Select...",
  displayRender,
  disabled = false,
  className,
  triggerClassName,
  menuClassName,
  itemClassName,
  iconClassName,
  labelClassName,
  errorClassName,
  variant = "outline",
  size: sizeProp,
  error,
  label,
  labelPosition = "top",
  labelAlign = "center",
  labelWidth,
  required,
  helperText,
  helperTextClassName,
  clearable,
  loading,
  loadData,
  startIcon,
  endIcon,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  virtualized,
  itemHeight = 32,
  scrollBehavior = "reposition",
  onBlur,
  matchTriggerWidth = true,
  renderOption,
}: CascaderProps) {
  const { size: globalSize } = useAerConfig();
  const size = sizeProp || globalSize || "default";

  const [isOpen, setIsOpen] = React.useState(false);

  // Auto positioning for the root menu
  const { referenceRef, floatingRef, floatingStyles, elements } =
    useAutoPosition({
      isOpen,
      side: "bottom",
      align: "start",
      sideOffset: 4,
      strategy: "fixed",
      scrollBehavior,
      onScroll: () => {
        setIsOpen(false);
        onBlur?.();
      },
      matchWidth: matchTriggerWidth,
    });

  // Handle outside interactions and scroll
  React.useEffect(() => {
    if (!isOpen) return;

    const handleInteractOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      const floatingEl = elements.floating;
      const referenceEl = elements.reference;

      // Check if click is inside any cascader menu (including submenus in portals)
      const isInsideMenu = target.closest("[data-cascader-menu]");

      if (
        floatingEl &&
        referenceEl &&
        !floatingEl.contains(target as Node) &&
        !referenceEl.contains(target as Node) &&
        !isInsideMenu
      ) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleInteractOutside);
    document.addEventListener("touchstart", handleInteractOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleInteractOutside);
      document.removeEventListener("touchstart", handleInteractOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, elements.floating, elements.reference]);

  // Calculate display label
  const displayLabel = React.useMemo(() => {
    if (!value) return null;
    const path = getOptionPath(options, value);
    if (!path) return value; // Fallback to value if path not found

    const labels = path.map((o) => o.label);
    if (displayRender) {
      return displayRender(labels);
    }
    return labels.join(" / ");
  }, [value, options, displayRender]);

  const handleSelect = (option: CascaderOption, isLeaf: boolean) => {
    if (isLeaf) {
      onChange?.(option.value);
      setIsOpen(false);
      onBlur?.();
    }
    // Non-leaf clicks just expand, handled by CascaderMenu hover/click logic internally
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(undefined as any);
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    default: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const hasAddon = addonBefore || addonAfter;

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
          className
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

  const cascaderContent = (
    <div
      className={cn(
        "relative inline-block w-full text-left",
        !label && className
      )}
    >
      <div className="flex items-stretch w-full">
        {addonBefore && (
          <div
            className={cn(
              "flex items-center px-3 border border-r-0 rounded-l-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap"
            )}
          >
            {addonBefore}
          </div>
        )}
        <div
          ref={referenceRef}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            cascaderTriggerVariants({
              variant,
              size,
              error: !!error,
              isOpen,
            }),
            !hasAddon && variant === "outline" && "rounded-aer-md",
            addonBefore && "border-l-0 rounded-l-none",
            addonAfter && "border-r-0 rounded-r-none",
            addonBefore && !addonAfter && "rounded-r-aer-md",
            addonAfter && !addonBefore && "rounded-l-aer-md",
            triggerClassName
          )}
        >
          {/* Start Icon */}
          {startIcon && (
            <span
              className={cn(
                "text-aer-muted-foreground shrink-0 flex items-center justify-center mr-2"
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

          {/* Prefix */}
          {prefix && (
            <span className="text-aer-muted-foreground text-sm font-medium shrink-0 flex items-center mr-2">
              {prefix}
            </span>
          )}

          {/* Display Value / Placeholder */}
          <div className="relative flex-1 text-left">
            {displayLabel ? (
              <span className="block truncate">{displayLabel}</span>
            ) : (
              <span className={cn("text-aer-muted-foreground")}>
                {placeholder}
              </span>
            )}
          </div>

          {/* Suffix */}
          {suffix && (
            <span className="text-aer-muted-foreground text-sm font-medium shrink-0 whitespace-nowrap ml-2">
              {suffix}
            </span>
          )}

          {/* End Icon */}
          {endIcon && (
            <span
              className={cn(
                "text-aer-muted-foreground flex items-center justify-center ml-2",
                iconSizes[size],
                iconClassName
              )}
            >
              {endIcon}
            </span>
          )}

          {/* Clear Button */}
          {clearable && displayLabel && !disabled && (
            <div
              role="button"
              onClick={handleClear}
              className="p-0.5 rounded-full hover:bg-aer-muted text-aer-muted-foreground transition-colors ml-2"
            >
              <X className="w-3.5 h-3.5" />
            </div>
          )}

          {loading ? (
            <div className="ml-2 animate-spin">
              <svg
                className={cn(iconSizes[size], "text-aer-muted-foreground")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : (
            <ChevronDown
              className={cn(
                "w-4 h-4 ml-2 opacity-50 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          )}
        </div>

        {addonAfter && (
          <div
            className={cn(
              "flex items-center px-3 border border-l-0 rounded-r-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap"
            )}
          >
            {addonAfter}
          </div>
        )}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={floatingRef}
            style={{ ...floatingStyles, zIndex: 1000 }}
            className={cn("animate-in fade-in zoom-in-95", menuClassName)}
          >
            <CascaderMenu
              options={options}
              onSelect={handleSelect}
              selectedValue={value}
              loadData={loadData}
              depth={0}
              menuClassName={menuClassName}
              itemClassName={cn(
                itemClassName,
                variant === "aer" &&
                  "hover:bg-white/10 hover:text-white focus:bg-white/10"
              )}
              renderOption={renderOption}
              variant={variant}
              className={cn(
                variant === "aer" &&
                  "bg-white/10 backdrop-blur-2xl border-white/10 shadow-2xl"
              )}
              virtualized={virtualized}
              itemHeight={itemHeight}
              scrollBehavior={scrollBehavior}
            />
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

  return renderWithLabel(cascaderContent);
}
