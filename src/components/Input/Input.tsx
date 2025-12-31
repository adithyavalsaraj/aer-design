import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
      placeholder,
      ...props
    },
    ref
  ) => {
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
            error && "border-red-500 focus-within:ring-red-500",
            floatingLabel &&
              "pt-4 pb-0 has-[:placeholder-shown:not(:focus)]:pt-2 has-[:placeholder-shown:not(:focus)]:pb-2" // Dynamic padding for floating label
          )}
        >
          {/* Left Elements Stack */}
          {startIcon && (
            <span
              className={cn(
                "text-aer-muted-foreground transition-colors group-focus-within/input:text-aer-primary flex items-center justify-center shrink-0 [&>svg]:h-4 [&>svg]:w-4",
                floatingLabel && "mt-1"
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
                "flex h-9 w-full bg-transparent py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-aer-muted-foreground focus:outline-none disabled:cursor-not-allowed peer",
                floatingLabel && "placeholder-transparent h-6 pt-0 pb-1",
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
                  "peer-focus:-top-4 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-aer-primary",
                  "peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-aer-primary"
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
                "text-aer-muted-foreground transition-colors group-focus-within/input:text-aer-primary flex items-center justify-center shrink-0 [&>svg]:h-4 [&>svg]:w-4",
                floatingLabel && "mt-1"
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
