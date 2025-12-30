import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Check } from "lucide-react";
import * as React from "react";

// --- Variants ---

const checkboxContainerVariants = cva(
  "group flex w-full cursor-pointer relative transition-all duration-200 gap-3",
  {
    variants: {
      labelPosition: {
        left: "flex-row-reverse justify-end",
        right: "flex-row justify-start",
        top: "flex-col-reverse items-start",
        bottom: "flex-col items-start",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
      },
      variant: {
        default: "",
        card: "p-4 border rounded-aer-xl hover:bg-aer-muted/50 has-[:checked]:border-aer-primary has-[:checked]:bg-aer-primary/5 has-[:checked]:shadow-md ring-offset-background transition-all",
      },
    },
    compoundVariants: [
      {
        labelPosition: "left",
        align: "start",
        className: "items-start",
      },
      {
        labelPosition: "right",
        align: "start",
        className: "items-start",
      },
    ],
    defaultVariants: {
      labelPosition: "right",
      align: "start",
      variant: "default",
    },
  }
);

// --- Types ---

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof checkboxContainerVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Error message or boolean state */
  error?: boolean | string;
  /** Class name for the text content container */
  contentClassName?: string;
  /** Class name for the label text */
  labelClassName?: string;
}

// --- Component ---

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      labelPosition,
      align,
      variant,
      label,
      description,
      error,
      contentClassName,
      labelClassName,
      id,
      ...props
    },
    ref
  ) => {
    const uniqueId = React.useId();
    const checkboxId = id || uniqueId;
    const isVertical = labelPosition === "top" || labelPosition === "bottom";

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          checkboxContainerVariants({ labelPosition, align, variant }),
          className
        )}
      >
        <div className="relative flex items-center shrink-0">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "flex items-center justify-center size-5 rounded-aer-md border-2 border-aer-muted-foreground/30 bg-aer-background text-aer-background transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-aer-ring peer-focus-visible:ring-offset-2 peer-checked:border-aer-primary peer-checked:bg-aer-primary peer-checked:text-aer-primary-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              error && "border-red-500"
            )}
          >
            <Check className="size-3.5 stroke-[3]" />
          </div>
        </div>

        {(label || description) && (
          <div
            className={cn(
              "flex flex-col select-none min-w-0 break-all",
              // Alignment overrides for vertical layouts if needed
              isVertical && align === "center" && "items-center text-center",
              isVertical && align === "end" && "items-end text-right",
              !isVertical && "text-left",
              labelPosition === "left" && "text-right",
              contentClassName
            )}
          >
            {label && (
              <span
                className={cn(
                  "font-medium text-sm leading-5",
                  props.disabled && "opacity-70",
                  labelClassName
                )}
              >
                {label}
                {props.required && (
                  <span className="text-red-500 ml-0.5">*</span>
                )}
              </span>
            )}
            {description && (
              <span
                className={cn(
                  "text-xs text-aer-muted-foreground mt-0 leading-normal",
                  props.disabled && "opacity-50"
                )}
              >
                {description}
              </span>
            )}
            {typeof error === "string" && (
              <span className="text-xs text-red-500 font-medium mt-1">
                {error}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
