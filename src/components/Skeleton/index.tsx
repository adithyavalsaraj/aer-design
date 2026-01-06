import { cn } from "@/lib/utils";
import * as React from "react";
import type { SkeletonProps } from "./types";

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = "text",
      animation = "pulse",
      width,
      height,
      borderRadius,
      style,
      ...props
    },
    ref
  ) => {
    const isCircular = variant === "circular";
    const isText = variant === "text";
    const isRounded = variant === "rounded";

    const baseStyles: React.CSSProperties = {
      width: width,
      height: height,
      borderRadius: borderRadius
        ? borderRadius
        : isCircular
        ? "50%"
        : isRounded
        ? "0.5rem"
        : isText
        ? "0.25rem"
        : "0",
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-(--skeleton) overflow-hidden relative",
          // Base height for text if not specified
          isText && !height && "h-[1em] my-[0.1em]",
          // Circular height/width equality if one is missing
          isCircular && !height && width && "h-(--skeleton-width)",
          // Animations
          animation === "pulse" && "animate-pulse",
          animation === "wave" && [
            "after:content-[''] after:absolute after:inset-0",
            "after:bg-linear-to-r after:from-transparent after:via-aer-background/30 after:to-transparent",
            "after:(-translate-x-full) after:animate-[wave_2s_infinite]",
          ],
          className
        )}
        style={
          {
            ...baseStyles,
            "--skeleton-width": width
              ? typeof width === "number"
                ? `${width}px`
                : width
              : "auto",
          } as React.CSSProperties
        }
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton };
