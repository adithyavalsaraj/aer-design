import { useAerConfig } from "@/components/AerConfigProvider";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  /** @deprecated Use className instead - applies to root container */
  containerClassName?: string;
  /** CSS classes for root container (spacing, layout) */
  className?: string;
  /** CSS classes for the input element (text styling) */
  inputClassName?: string;
  /** CSS classes for the label element */
  labelClassName?: string;
  /** CSS classes for icon containers */
  iconClassName?: string;
  /** CSS classes for addon containers */
  addonClassName?: string;
  error?: boolean | string;
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
  variant?: "outline" | "filled" | "underlined" | "aer";
  size?: "sm" | "default" | "lg";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      endIcon,
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      containerClassName,
      inputClassName,
      labelClassName,
      iconClassName,
      addonClassName,
      error,
      label,
      labelPosition = "top",
      labelAlign = "center",
      labelWidth,
      required,
      helperText,
      helperTextClassName,
      variant = "outline",
      size: sizeProp,
      placeholder,
      style,
      ...props
    },
    ref
  ) => {
    const { size: globalSize, autoContrast } = useAerConfig();
    const size = sizeProp || globalSize;

    // Auto Contrast Logic
    const backgroundColor = style?.backgroundColor as string;
    const contrastColor = useContrastColor(backgroundColor || "");

    const finalStyle = { ...style };
    if (autoContrast && backgroundColor) {
      finalStyle.color = contrastColor;
    }

    const hasAddon = addonBefore || addonAfter;
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge forwarded ref with local ref
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Variant styles
    const variantStyles = {
      outline:
        "border border-aer-input bg-aer-background focus-within:ring-2 focus-within:ring-aer-ring focus-within:ring-offset-2 ring-offset-aer-background",
      filled:
        "border-b-2 border-aer-input/20 bg-aer-muted/30 focus-within:border-aer-primary focus-within:bg-aer-muted/50 rounded-t-md rounded-b-none",
      underlined:
        "border-b border-aer-input bg-transparent rounded-none px-0 focus-within:border-aer-primary",
      aer: "bg-white/5 backdrop-blur-xl border border-white/10 focus-within:bg-white/10 focus-within:border-white/20 shadow-2xl ring-1 ring-white/5 transition-all duration-300",
    };

    const sizeStyles = {
      sm: "h-9 text-xs",
      default: "h-10 text-sm",
      lg: "h-11 text-base",
    };

    const iconSizes = {
      sm: "[&>svg]:w-3.5 [&>svg]:h-3.5",
      default: "[&>svg]:w-4 [&>svg]:h-4",
      lg: "[&>svg]:w-5 [&>svg]:h-5",
    };

    // Label wrapper component (identical to Cascader)
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

    const inputContent = (
      <div
        className={cn(
          "flex items-stretch group/input",
          !(className || containerClassName)?.includes("w-") && "w-full",
          !label && (className || containerClassName)
        )}
      >
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
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "relative flex items-center gap-2 transition-all cursor-text",
            variantStyles[variant as keyof typeof variantStyles],
            !(className || containerClassName)?.includes("px-") &&
              !(className || containerClassName)?.includes("p-") &&
              variant !== "underlined" &&
              "px-3",
            !(className || containerClassName)?.includes("w-") && "w-full",
            !hasAddon && variant === "outline" && "rounded-aer-md",
            addonBefore && "border-l-0",
            addonAfter && "border-r-0",
            addonBefore && !addonAfter && "rounded-r-aer-md",
            addonAfter && !addonBefore && "rounded-l-aer-md",
            props.disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500 focus-within:ring-red-500"
          )}
        >
          {/* Left Elements Stack */}
          {startIcon && (
            <span
              className={cn(
                "text-aer-muted-foreground transition-colors group-focus-within/input:text-aer-primary flex items-center justify-center shrink-0",
                iconSizes[size],
                iconClassName
              )}
            >
              {startIcon}
            </span>
          )}
          {prefix && (
            <span className="text-aer-muted-foreground text-sm font-medium shrink-0 whitespace-nowrap">
              {prefix}
            </span>
          )}

          <div className="relative flex-1">
            <input
              type={type}
              className={cn(
                "flex w-full bg-transparent py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-aer-muted-foreground focus:outline-none disabled:cursor-not-allowed",
                sizeStyles[size],
                inputClassName
              )}
              placeholder={placeholder}
              ref={inputRef}
              style={finalStyle}
              {...props}
            />
          </div>

          {/* Right Elements Stack */}
          {suffix && (
            <span className="text-aer-muted-foreground text-sm font-medium shrink-0 whitespace-nowrap">
              {suffix}
            </span>
          )}
          {endIcon && (
            <span
              className={cn(
                "text-aer-muted-foreground transition-colors group-focus-within/input:text-aer-primary flex items-center justify-center shrink-0",
                iconSizes[size],
                iconClassName
              )}
            >
              {endIcon}
            </span>
          )}
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
    );

    return renderWithLabel(inputContent);
  }
);
Input.displayName = "Input";

export { Input };
