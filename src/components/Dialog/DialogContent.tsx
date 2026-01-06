import React from "react";
import { cn } from "../../lib/utils";
import type { DialogContentProps } from "./types";

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ children, className, scrollable = true, padding = "md" }, ref) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex-1",
        scrollable && "overflow-y-auto",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
});

DialogContent.displayName = "DialogContent";
