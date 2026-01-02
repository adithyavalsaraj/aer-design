import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean | string;
  label?: string;
  /** Position of the label relative to the textarea. @default "top" */
  labelPosition?: "top" | "left";
  /** Vertical alignment of label when position is "left". @default "center" */
  labelAlign?: "start" | "center" | "end";
  /** Fixed width for label when position is "left". */
  labelWidth?: string;
  /** Whether the field is required (shows asterisk). */
  required?: boolean;
  /** Helper text to display below the textarea. */
  helperText?: string;
  /** CSS classes for the helper text. */
  helperTextClassName?: string;
  variant?: "outline" | "filled" | "underlined";
  size?: "sm" | "default" | "lg";
  /** CSS classes for the root container element */
  className?: string;
  /** CSS classes for the textarea element itself */
  textareaClassName?: string;
  /** CSS classes for the label element */
  labelClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      textareaClassName,
      labelClassName,
      error,
      label,
      labelPosition = "top",
      labelAlign = "center",
      labelWidth,
      required,
      helperText,
      helperTextClassName,
      variant = "outline",
      placeholder,
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    // Variant styles matching Input component
    const variantStyles = {
      outline:
        "border border-aer-input bg-aer-background focus-within:ring-2 focus-within:ring-aer-ring focus-within:ring-offset-2 ring-offset-aer-background",
      filled:
        "border-b-2 border-aer-input/20 bg-aer-muted/30 focus-within:border-aer-primary focus-within:bg-aer-muted/50 rounded-t-md rounded-b-none",
      underlined:
        "border-b border-aer-input bg-transparent rounded-none px-0 focus-within:border-aer-primary",
    };

    const sizeStyles = {
      sm: "text-xs min-h-[60px]",
      default: "text-sm min-h-[80px]",
      lg: "text-base min-h-[100px]",
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

    const textareaContent = (
      <div
        className={cn(
          "relative group/input w-full cursor-text transition-all flex flex-col",
          variantStyles[variant],
          // Apply padding based on variant and size, matching Input's logic
          variant !== "underlined" && "px-3 py-2",
          variant === "outline" && "rounded-aer-md",
          error && "border-red-500 focus-within:ring-red-500",
          !label && className
        )}
      >
        <textarea
          className={cn(
            "flex w-full bg-transparent placeholder:text-aer-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 peer resize-y",
            sizeStyles[size],
            variant === "underlined" && "px-0",
            textareaClassName
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    );

    return renderWithLabel(textareaContent);
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
