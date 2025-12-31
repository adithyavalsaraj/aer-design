import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  label?: string;
  floatingLabel?: boolean;
  variant?: "outline" | "filled" | "underlined";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      label,
      floatingLabel,
      variant = "outline",
      placeholder,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      outline:
        "border border-aer-input bg-aer-background focus-within:ring-2 focus-within:ring-aer-ring focus-within:ring-offset-2 ring-offset-aer-background rounded-aer-md",
      filled:
        "border-b-2 border-aer-input/20 bg-aer-muted/30 focus-within:border-aer-primary focus-within:bg-aer-muted/50 rounded-t-md rounded-b-none",
      underlined:
        "border-b border-aer-input bg-transparent rounded-none px-0 focus-within:border-aer-primary",
    };

    return (
      <div
        className={cn(
          "relative group/input w-full cursor-text transition-all",
          variantStyles[variant],
          error && "border-red-500 focus-within:ring-red-500",
          floatingLabel && "pt-4"
        )}
      >
        <textarea
          className={cn(
            "flex min-h-[80px] w-full bg-transparent px-3 py-2 text-sm placeholder:text-aer-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer resize-y",
            // Floating label adjustments
            floatingLabel && "placeholder-transparent pt-0",
            variant === "underlined" && "px-0",
            className
          )}
          placeholder={floatingLabel ? placeholder || label : placeholder}
          ref={ref}
          {...props}
        />
        {floatingLabel && (
          <label
            className={cn(
              "absolute left-3 top-2 text-sm text-aer-muted-foreground transition-all duration-200 pointer-events-none origin-left bg-aer-background/0 px-1",
              // Check for value (placeholder-shown) or focus
              "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base",
              "peer-focus:top-1 peer-focus:text-xs peer-focus:text-aer-primary",
              "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-aer-primary",
              variant === "underlined" && "left-0 px-0"
            )}
          >
            {label || placeholder}
          </label>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
