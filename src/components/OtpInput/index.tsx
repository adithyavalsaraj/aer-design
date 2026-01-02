import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Input } from "../Input";

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  type?: "text" | "password";
  /** Custom character or icon to show when masked. Only used if type is "password" */
  maskChar?: React.ReactNode;
  pattern?: RegExp;
  /** CSS classes for the root container element */
  className?: string;
  /** CSS classes for each individual input cell */
  cellClassName?: string;
  /** CSS classes for the error message text */
  errorClassName?: string;
  error?: boolean | string;
  onBlur?: () => void;
  size?: "sm" | "default" | "lg";
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value: propsValue,
      onChange,
      disabled,
      type = "text",
      maskChar,
      pattern = /^\d$/,
      className,
      cellClassName,
      errorClassName,
      error,
      onBlur,
      size: sizeProp,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    const [internalValue, setInternalValue] = React.useState(propsValue || "");
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const sizeStyles = {
      sm: { container: "w-9 h-9", text: "text-sm" },
      default: { container: "w-10 h-10", text: "text-base" },
      lg: { container: "w-12 h-12", text: "text-lg pt-0.5" },
    };

    const sizes = sizeStyles[size] || sizeStyles.default;

    // Sync internal value with props value
    React.useEffect(() => {
      if (propsValue !== undefined) {
        setInternalValue(propsValue);
      }
    }, [propsValue]);

    const value = propsValue !== undefined ? propsValue : internalValue;

    const focusInput = (index: number) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]?.focus();
        inputRefs.current[index]?.select();
      }
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
      index: number
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValue = value.split("");

        if (value[index]) {
          newValue.splice(index, 1);
        } else if (index > 0) {
          newValue.splice(index - 1, 1);
        } else {
          return;
        }

        while (newValue.length < length) newValue.push("");

        const finalValue = newValue.join("").slice(0, length);
        if (propsValue === undefined) setInternalValue(finalValue);
        onChange?.(finalValue);

        if (index > 0) {
          focusInput(index - 1);
        } else {
          focusInput(0);
        }
      } else if (e.key === "Delete") {
        e.preventDefault();
        const newValue = value.split("");
        newValue.splice(index, 1);

        while (newValue.length < length) newValue.push("");

        const finalValue = newValue.join("").slice(0, length);
        if (propsValue === undefined) setInternalValue(finalValue);
        onChange?.(finalValue);

        focusInput(index);
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        e.preventDefault();
        focusInput(index + 1);
      }
    };

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const char = e.target.value.slice(-1);
      if (!char || pattern.test(char)) {
        const newValue = value.split("");
        for (let i = 0; i < length; i++) {
          if (newValue[i] === undefined) newValue[i] = "";
        }
        newValue[index] = char;
        const finalValue = newValue.join("").slice(0, length);

        if (propsValue === undefined) {
          setInternalValue(finalValue);
        }
        onChange?.(finalValue);

        if (char && index < length - 1) {
          focusInput(index + 1);
        } else if (char && index === length - 1) {
          e.target.blur();
        }
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData("text").trim().slice(0, length);
      if (pasteData.split("").every((char) => pattern.test(char))) {
        if (propsValue === undefined) {
          setInternalValue(pasteData);
        }
        onChange?.(pasteData);
        focusInput(Math.min(pasteData.length, length - 1));
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2 items-center justify-center relative pb-6",
          className
        )}
        onPaste={handlePaste}
        onBlur={onBlur}
        {...props}
      >
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="relative">
            <Input
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              className={cn("p-0 flex-shrink-0", sizes.container)}
              inputClassName={cn(
                "text-center font-bold h-full w-full",
                sizes.text,
                type === "password" &&
                  maskChar &&
                  "text-transparent select-none",
                error && "border-red-500 focus-visible:ring-red-500",
                cellClassName
              )}
              type={type === "password" && maskChar ? "text" : type}
              value={value[i] || ""}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onFocus={(e) => e.target.select()}
              onClick={(e) => e.currentTarget.select()}
              disabled={disabled}
              inputMode={pattern.source === "^\\d$" ? "numeric" : "text"}
              autoComplete="one-time-code"
            />
            {type === "password" && maskChar && value[i] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-aer-foreground">
                {maskChar}
              </div>
            )}
          </div>
        ))}
        {error && typeof error === "string" && (
          <div
            className={cn(
              "absolute bottom-0 left-0 w-full text-center text-xs text-red-500 font-medium",
              errorClassName
            )}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);
OtpInput.displayName = "OtpInput";

export { OtpInput };
