import { useAerConfig } from "@/components/AerConfigProvider";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "filled" | "outline" | "soft" | "ghost" | "aer";
  status?: "default" | "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "lg" | "full";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant = "filled",
      status = "default",
      size = "md",
      rounded = "md",
      children,
      style,
      ...props
    },
    ref
  ) => {
    const variants = {
      filled: {
        default: "bg-aer-muted text-aer-muted-foreground border-transparent",
        primary:
          "bg-aer-primary text-aer-primary-foreground border-transparent",
        success: "bg-emerald-500 text-white border-transparent",
        warning: "bg-amber-500 text-white border-transparent",
        error:
          "bg-aer-destructive text-aer-destructive-foreground border-transparent",
      },
      outline: {
        default: "bg-transparent text-aer-muted-foreground border-aer-border",
        primary: "bg-transparent text-aer-primary border-aer-primary/50",
        success:
          "bg-transparent text-emerald-600 border-emerald-500/50 dark:text-emerald-400",
        warning:
          "bg-transparent text-amber-600 border-amber-500/50 dark:text-amber-400",
        error: "bg-transparent text-aer-destructive border-aer-destructive/50",
      },
      soft: {
        default: "bg-aer-muted/50 text-aer-muted-foreground border-transparent",
        primary: "bg-aer-primary/10 text-aer-primary border-transparent",
        success:
          "bg-emerald-500/10 text-emerald-600 border-transparent dark:text-emerald-400",
        warning:
          "bg-amber-500/10 text-amber-600 border-transparent dark:text-amber-400",
        error: "bg-aer-destructive/10 text-aer-destructive border-transparent",
      },
      ghost: {
        default: "bg-transparent text-aer-muted-foreground border-transparent",
        primary: "bg-transparent text-aer-primary border-transparent",
        success:
          "bg-transparent text-emerald-600 border-transparent dark:text-emerald-400",
        warning:
          "bg-transparent text-amber-600 border-transparent dark:text-amber-400",
        error: "bg-transparent text-aer-destructive border-transparent",
      },
      aer: {
        default:
          "bg-black/5 dark:bg-white/5 backdrop-blur-md text-aer-muted-foreground border-black/10 dark:border-white/10 shadow-sm",
        primary:
          "bg-aer-primary/10 backdrop-blur-md text-aer-primary border-aer-primary/20 shadow-sm",
        success:
          "bg-emerald-500/10 backdrop-blur-md text-emerald-500 border-emerald-500/20 shadow-sm",
        warning:
          "bg-amber-500/10 backdrop-blur-md text-amber-500 border-amber-500/20 shadow-sm",
        error:
          "bg-aer-destructive/10 backdrop-blur-md text-aer-destructive border-aer-destructive/20 shadow-sm",
      },
    };

    const sizes = {
      sm: "px-1.5 py-0.5 text-[10px] font-bold",
      md: "px-2 py-0.5 text-[11px] font-bold",
      lg: "px-2.5 py-1 text-xs font-bold",
    };

    const radius = {
      sm: "rounded-aer-sm",
      md: "rounded-aer-md",
      lg: "rounded-aer-lg",
      full: "rounded-full",
    };

    const { autoContrast } = useAerConfig();
    const badgeRef = React.useRef<HTMLDivElement>(null);

    // Auto Contrast Logic - only apply when backgroundColor is explicitly set via style prop
    const backgroundColor = style?.backgroundColor as string;
    const contrastColor = useContrastColor(backgroundColor || "", {}, badgeRef);

    const finalStyle = { ...style };
    // Only override color if:
    // 1. autoContrast is enabled globally
    // 2. A backgroundColor was explicitly provided via style prop
    // 3. We successfully calculated a contrast color
    if (autoContrast && backgroundColor && contrastColor) {
      finalStyle.color = contrastColor;
    }

    return (
      <div
        ref={(node) => {
          badgeRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "inline-flex items-center justify-center border transition-colors whitespace-nowrap uppercase tracking-wider",
          variants[variant][status],
          sizes[size],
          radius[rounded],
          variant === "aer" && "text-shadow-sm",
          className
        )}
        style={finalStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
