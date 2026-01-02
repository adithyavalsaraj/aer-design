import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, Minus } from "lucide-react";
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
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "checked">,
    VariantProps<typeof checkboxContainerVariants> {
  checked?: boolean | "indeterminate";
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Error message or boolean state */
  error?: boolean | string;
  /** CSS classes for the root container element */
  className?: string;
  /** Class name for the text content container (label + description) */
  contentClassName?: string;
  /** Class name for the label text */
  labelClassName?: string;
  /** Class name for the description text */
  descriptionClassName?: string;
  /** Class name for the custom checkbox square */
  checkboxClassName?: string;
  /** Class name for the check icon */
  iconClassName?: string;
  /** Class name for the error text */
  errorClassName?: string;
  /** Size of the checkbox and label */
  size?: "sm" | "default" | "lg";
  /** Callback when state changes */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
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
      descriptionClassName,
      checkboxClassName,
      iconClassName,
      errorClassName,
      id,
      size: sizeProp,
      checked: controlledChecked,
      defaultChecked,
      onChange,
      onCheckedChange,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    const uniqueId = React.useId();
    const checkboxId = id || uniqueId;
    const isVertical = labelPosition === "top" || labelPosition === "bottom";

    const sizeStyles = {
      sm: {
        box: "size-4",
        icon: "size-3",
        text: "text-xs",
        desc: "text-[10px]",
      },
      default: {
        box: "size-5",
        icon: "size-3.5",
        text: "text-sm",
        desc: "text-xs",
      },
      lg: {
        box: "size-6",
        icon: "size-4",
        text: "text-base",
        desc: "text-sm",
      },
    };

    const sizes = sizeStyles[size] || sizeStyles.default;

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
            {...props}
            type="checkbox"
            id={checkboxId}
            className="peer sr-only"
            {...(controlledChecked !== undefined
              ? { checked: controlledChecked === true }
              : { defaultChecked })}
            onChange={(e) => {
              onCheckedChange?.(e.target.checked);
              onChange?.(e);
            }}
            ref={(input) => {
              if (input) {
                input.indeterminate = controlledChecked === "indeterminate";
              }
              if (typeof ref === "function") {
                ref(input);
              } else if (ref) {
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = input;
              }
            }}
          />
          <div
            className={cn(
              "flex items-center justify-center rounded-aer-md border-2 border-aer-muted-foreground/30 bg-aer-background text-aer-background transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-aer-ring peer-focus-visible:ring-offset-2 peer-checked:border-aer-primary peer-checked:bg-aer-primary peer-checked:text-aer-primary-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              sizes.box,
              controlledChecked === "indeterminate" &&
                "bg-aer-primary border-aer-primary text-aer-primary-foreground",
              error && "border-red-500",
              checkboxClassName
            )}
          >
            {controlledChecked === "indeterminate" ? (
              <Minus className={cn("stroke-[3]", sizes.icon, iconClassName)} />
            ) : (
              <Check className={cn("stroke-[3]", sizes.icon, iconClassName)} />
            )}
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
                  "font-medium leading-5",
                  sizes.text,
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
                  "text-aer-muted-foreground mt-0 leading-normal",
                  sizes.desc,
                  props.disabled && "opacity-50",
                  descriptionClassName
                )}
              >
                {description}
              </span>
            )}
            {typeof error === "string" && (
              <span
                className={cn(
                  "text-xs text-red-500 font-medium mt-1",
                  errorClassName
                )}
              >
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

export * from "./CheckboxGroup";
export { Checkbox };
