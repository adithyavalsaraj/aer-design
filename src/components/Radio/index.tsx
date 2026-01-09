import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

// --- Types ---

interface RadioGroupContextValue {
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean | string;
  size?: "sm" | "default" | "lg";
  orientation?: "vertical" | "horizontal";
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

// --- Radio Group ---

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean | string;
  size?: "sm" | "default" | "lg";
  orientation?: "vertical" | "horizontal";
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      name,
      value,
      defaultValue,
      onChange,
      disabled,
      error,
      size,
      orientation = "vertical",
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = value !== undefined;
    const activeValue = isControlled ? value : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name,
          value: activeValue,
          onChange: handleValueChange,
          disabled,
          error,
          size,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn(
            orientation === "horizontal"
              ? "flex flex-wrap gap-4"
              : "grid gap-2",
            className
          )}
          role="radiogroup"
          aria-orientation={orientation}
          {...props}
        >
          {children}
        </div>
        {typeof error === "string" && (
          <div className="text-xs text-red-500 font-medium mt-1">{error}</div>
        )}
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

// --- Radio Item Styling ---

const radioItemVariants = cva(
  "group flex cursor-pointer relative transition-all duration-200 outline-none gap-3",
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
        aer: "p-4 border border-white/10 rounded-aer-xl bg-white/5 backdrop-blur-md shadow-lg text-white has-[:checked]:bg-white/10 has-[:checked]:border-white/20 transition-all hover:bg-white/10",
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

export interface RadioItemProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "onChange"
    >,
    VariantProps<typeof radioItemVariants> {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** CSS classes for the root container element */
  className?: string;
  /** Class name for the text content container (label + description) */
  contentClassName?: string;
  /** Class name for the label text */
  labelClassName?: string;
  /** Class name for the description text */
  descriptionClassName?: string;
  /** Class name for the radio circle indicator */
  radioClassName?: string;
  /** Class name for the inner dot indicator */
  dotClassName?: string;
  /** Class name for the error message text */
  errorClassName?: string;
  error?: boolean | string;
  size?: "sm" | "default" | "lg";
}

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  (
    {
      className,
      labelPosition,
      align,
      variant,
      label,
      description,
      id,
      value,
      disabled,
      contentClassName,
      labelClassName,
      descriptionClassName,
      radioClassName,
      dotClassName,
      errorClassName,
      error,
      size: sizeProp,
      onChange,
      checked,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const context = React.useContext(RadioGroupContext);
    const size = sizeProp || context.size || globalSize;

    const uniqueId = React.useId();
    const radioId = id || uniqueId;
    const isChecked = context.value === value;
    const isDisabled = disabled || context.disabled;
    const isVertical = labelPosition === "top" || labelPosition === "bottom";
    const isGroupHorizontal = context.orientation === "horizontal";

    const sizeStyles = {
      sm: {
        circle: "size-4",
        dot: "size-2",
        text: "text-xs",
        desc: "text-[10px]",
      },
      default: {
        circle: "size-5",
        dot: "size-2.5",
        text: "text-sm",
        desc: "text-xs",
      },
      lg: {
        circle: "size-6",
        dot: "size-3",
        text: "text-base",
        desc: "text-sm",
      },
    };

    const sizes = sizeStyles[size] || sizeStyles.default;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          radioItemVariants({ labelPosition, align, variant }),
          isDisabled && "cursor-not-allowed opacity-50",
          !isGroupHorizontal ? "w-full" : "w-auto py-0",
          className
        )}
      >
        <div className="relative flex items-center shrink-0">
          <input
            {...props}
            type="radio"
            id={radioId}
            ref={ref}
            name={context.name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={(e) => {
              if (e.target.checked) {
                context.onChange?.(value as string);
              }
              onChange?.(e);
            }}
            className="peer sr-only"
          />
          <div
            className={cn(
              "flex items-center justify-center rounded-full border-2 border-aer-muted-foreground/30 bg-aer-background text-aer-primary transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-aer-ring peer-focus-visible:ring-offset-2 peer-checked:border-aer-primary",
              sizes.circle,
              (context.error || error) &&
                "border-red-500 peer-checked:border-red-500",
              radioClassName
            )}
          >
            {/* The Dot */}
            <div
              className={cn(
                "rounded-full bg-current scale-0 transition-transform duration-200",
                sizes.dot,
                isChecked && "scale-100",
                dotClassName
              )}
            />
          </div>
        </div>

        {(label || description) && (
          <div
            className={cn(
              "flex flex-col select-none min-w-0 break-all",
              // Alignment overrides
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
                  descriptionClassName
                )}
              >
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
RadioItem.displayName = "RadioItem";

export { RadioGroup, RadioItem };
