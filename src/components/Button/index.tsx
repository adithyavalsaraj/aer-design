import { useAerConfig } from "@/components/AerConfigProvider";
import { useContrastColor } from "@/hooks/useContrastColor";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import { type ButtonProps } from "./types";
import { buttonVariants } from "./variants";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const { size: globalSize, autoContrast } = useAerConfig();
    const computedSize = size || globalSize;

    // Auto Contrast Logic - only apply when backgroundColor is explicitly set via style prop
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const backgroundColor = style?.backgroundColor as string;
    const contrastColor = useContrastColor(
      backgroundColor || "",
      {},
      buttonRef
    );

    const finalStyle = { ...style };
    // Only override color if:
    // 1. autoContrast is enabled globally
    // 2. A backgroundColor was explicitly provided via style prop
    // 3. We successfully calculated a contrast color
    if (autoContrast && backgroundColor && contrastColor) {
      finalStyle.color = contrastColor;
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size: computedSize, className })
        )}
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        disabled={isLoading || disabled}
        style={finalStyle}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps } from "./types";
export { Button };
