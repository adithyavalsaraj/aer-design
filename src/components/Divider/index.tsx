import { cn } from "@/lib/utils";
import * as React from "react";
import type { DividerProps } from "./types";

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant = "solid",
      thickness = "1px",
      color,
      labelPlacement = "center",
      labelGap = "1rem",
      children,
      style,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";
    const hasLabel = children && isHorizontal;

    const lineStyle: React.CSSProperties = {
      ...(color && { borderColor: color }),
      ...(thickness !== "1px" && {
        ...(isHorizontal
          ? { borderTopWidth: thickness }
          : { borderLeftWidth: thickness }),
      }),
      ...style,
    };

    const baseClasses = cn(
      "shrink-0 border-(--divider)",
      variant === "solid"
        ? "border-solid"
        : variant === "dashed"
        ? "border-dashed"
        : "border-dotted",
      isHorizontal ? "w-full border-t" : "h-full border-l"
    );

    if (hasLabel) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation={orientation}
          className={cn(
            "flex items-center w-full",
            labelPlacement === "end" && "flex-row-reverse",
            className
          )}
          style={style}
          {...props}
        >
          <div
            className={cn(
              baseClasses,
              "grow",
              labelPlacement === "start" ? "max-w-8" : "flex-1"
            )}
            style={lineStyle}
          />
          <div
            className="shrink-0 px-4 text-sm font-medium text-aer-muted-foreground whitespace-nowrap"
            style={{ paddingLeft: labelGap, paddingRight: labelGap }}
          >
            {children}
          </div>
          <div
            className={cn(
              baseClasses,
              "grow",
              labelPlacement === "end" ? "max-w-8" : "flex-1"
            )}
            style={lineStyle}
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={cn(baseClasses, className)}
        style={lineStyle}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";

export { Divider };
