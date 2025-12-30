import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Input, type InputProps } from "./Input";

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        disabled={disabled}
        {...props}
        endIcon={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
            className="flex items-center justify-center h-full hover:text-aer-foreground transition-colors outline-none focus:text-aer-primary"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? "Hide password" : "Show password"}
            </span>
          </button>
        }
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
