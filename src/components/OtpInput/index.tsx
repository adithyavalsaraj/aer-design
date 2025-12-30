import { cn } from "@/lib/utils";
import * as React from "react";
import { Input } from "../Input";

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  type?: "text" | "password";
  /** Custom character or icon to show when masked. Only used if type is "password" */
  maskChar?: React.ReactNode;
  /** Regex pattern for validation. Defaults to /^\d$/ (numbers only) */
  /** Regex pattern for validation. Defaults to /^\d$/ (numbers only) */
  pattern?: RegExp;
  error?: boolean | string;
  onBlur?: () => void;
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      length = 6,
      value: propsValue,
      onChange,
      disabled,
      className,
      type = "text",
      maskChar,
      pattern = /^\d$/,
      error,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(propsValue || "");
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

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
          // If value exists, delete it and move back
          newValue.splice(index, 1);
        } else if (index > 0) {
          // If empty, delete previous and move back
          newValue.splice(index - 1, 1);
        } else {
          return;
        }

        // Pad with empty strings
        while (newValue.length < length) newValue.push("");

        const finalValue = newValue.join("").slice(0, length);
        if (propsValue === undefined) setInternalValue(finalValue);
        onChange?.(finalValue);

        // Move focus back logic
        if (index > 0) {
          focusInput(index - 1);
        } else {
          focusInput(0);
        }
      } else if (e.key === "Delete") {
        e.preventDefault();
        const newValue = value.split("");
        // Delete current (shift all subsequent left)
        newValue.splice(index, 1);

        // Pad
        while (newValue.length < length) newValue.push("");

        const finalValue = newValue.join("").slice(0, length);
        if (propsValue === undefined) setInternalValue(finalValue);
        onChange?.(finalValue);

        // Maintain focus at current index
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
        // Ensure array is long enough
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
      // Validate paste - every character must match the pattern
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
          "flex gap-2 items-center justify-center relative pb-6", // Add padding bottom for error message absolute positioning
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
              containerClassName="w-12 h-12 p-0 flex-shrink-0"
              className={cn(
                "text-center text-lg font-bold h-full w-full",
                type === "password" &&
                  maskChar &&
                  "text-transparent select-none",
                error && "border-red-500 focus-visible:ring-red-500"
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
        {typeof error === "string" && (
          <div className="absolute bottom-0 left-0 w-full text-center text-xs text-red-500 font-medium">
            {error}
          </div>
        )}
      </div>
    );
  }
);
OtpInput.displayName = "OtpInput";

export { OtpInput };
