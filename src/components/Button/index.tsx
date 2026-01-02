import { useAerConfig } from "@/components/AerConfigProvider";
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
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const { size: globalSize } = useAerConfig();
    const computedSize = size || globalSize;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size: computedSize, className })
        )}
        ref={ref}
        disabled={isLoading || disabled}
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
