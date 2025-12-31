import { useAerConfig } from "@/components/AerConfigProvider";
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
  containerClassName?: string;
  error?: boolean | string;
  label?: string;
  floatingLabel?: boolean;
  variant?: "outline" | "filled" | "underlined";
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
      error,
      label,
      floatingLabel,
      variant = "outline",
      size: sizeProp,
      placeholder,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

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

    return (
      <div
        className={cn(
          "flex items-stretch group/input",
          !containerClassName?.includes("w-") && "w-full",
          containerClassName
        )}
      >
        {addonBefore && (
          <div className="flex items-center px-3 border border-r-0 rounded-l-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap">
            {addonBefore}
          </div>
        )}
        <div
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "relative flex items-center gap-2 transition-all cursor-text",
            variantStyles[variant],
            !containerClassName?.includes("px-") &&
              !containerClassName?.includes("p-") &&
              variant !== "underlined" &&
              "px-3",
            !containerClassName?.includes("w-") && "w-full",
            !hasAddon && variant === "outline" && "rounded-aer-md",
            addonBefore && "border-l-0",
            addonAfter && "border-r-0",
            addonBefore && !addonAfter && "rounded-r-aer-md",
            addonAfter && !addonBefore && "rounded-l-aer-md",
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
                iconSizes[size]
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

          <div
            className={cn(
              "relative flex-1",
              floatingLabel &&
                "pt-4 pb-0 has-[:placeholder-shown:not(:focus)]:pt-2 has-[:placeholder-shown:not(:focus)]:pb-2"
            )}
          >
            <input
              type={type}
              className={cn(
                "flex w-full bg-transparent py-2 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-aer-muted-foreground focus:outline-none disabled:cursor-not-allowed peer",
                sizeStyles[size],
                floatingLabel && "placeholder-transparent h-6 pt-0 pb-1",
                // Adjust text size for floating label state if needed, but usually keep it consistent
                className
              )}
              placeholder={floatingLabel ? placeholder || label : placeholder}
              ref={inputRef}
              {...props}
            />
            {floatingLabel && (
              <label
                className={cn(
                  "absolute left-0 top-0 text-sm text-aer-muted-foreground transition-all duration-200 pointer-events-none origin-left",
                  // Check for value (placeholder-shown) or focus
                  "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base",
                  "peer-focus:-top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-aer-primary",
                  "peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-aer-primary"
                )}
              >
                {label || placeholder}
              </label>
            )}
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
                iconSizes[size]
              )}
            >
              {endIcon}
            </span>
          )}
        </div>
        {addonAfter && (
          <div className="flex items-center px-3 border border-l-0 rounded-r-aer-md bg-aer-muted text-aer-muted-foreground text-sm shrink-0 whitespace-nowrap">
            {addonAfter}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
