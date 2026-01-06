import { useAerConfig } from "@/components/AerConfigProvider";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "glass" | "aer";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      hoverable = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { autoContrast } = useAerConfig();
    const cardRef = React.useRef<HTMLDivElement>(null);

    // Auto Contrast Logic - only apply when backgroundColor is explicitly set via style prop
    const backgroundColor = style?.backgroundColor as string;
    const contrastColor = useContrastColor(backgroundColor || "", {}, cardRef);

    const finalStyle = { ...style };
    // Only override color if:
    // 1. autoContrast is enabled globally
    // 2. A backgroundColor was explicitly provided via style prop
    // 3. We successfully calculated a contrast color
    if (autoContrast && backgroundColor && contrastColor) {
      finalStyle.color = contrastColor;
    }
    const variants = {
      default:
        "bg-aer-card text-aer-card-foreground border-aer-border shadow-sm",
      outline: "bg-transparent text-aer-foreground border-aer-border",
      glass:
        "bg-aer-background/60 backdrop-blur-xl text-aer-foreground border-aer-border/40 shadow-lg",
      aer: "bg-black/5 dark:bg-white/5 backdrop-blur-2xl text-aer-foreground border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-linear-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
    };

    const paddings = {
      none: "p-0",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={(node) => {
          cardRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "rounded-aer-lg border transition-all duration-300",
          variants[variant],
          paddings[padding],
          hoverable && "hover:shadow-md hover:border-aer-primary/30",
          hoverable &&
            variant === "aer" &&
            "hover:bg-black/10 dark:hover:bg-white/10 hover:-translate-y-1",
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

Card.displayName = "Card";

const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-aer-muted-foreground", className)}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center mt-6 pt-4 border-t border-aer-border",
      className
    )}
    {...props}
  />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
