import { useAerConfig } from "@/components/AerConfigProvider";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import * as React from "react";
import type {
  AvatarGroupProps,
  AvatarProps,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
} from "./types";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-14 w-14 text-lg",
};

const statusSizeClasses: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5 border-1",
  sm: "h-2 w-2 border-1.5",
  md: "h-2.5 w-2.5 border-2",
  lg: "h-3 w-3 border-2",
  xl: "h-3.5 w-3.5 border-2",
};

const statusColors: Record<AvatarStatus, string> = {
  online: "bg-emerald-500",
  offline: "bg-aer-muted-foreground",
  busy: "bg-aer-destructive",
  away: "bg-amber-500",
};

const roundedClasses = {
  sm: "rounded-aer-sm",
  md: "rounded-aer-md",
  lg: "rounded-aer-lg",
  full: "rounded-full",
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      initials,
      size = "md",
      variant = "filled",
      status,
      rounded = "full",
      fallbackIcon,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = React.useState(false);
    const { autoContrast } = useAerConfig();
    const avatarRef = React.useRef<HTMLDivElement>(null);

    const variants: Record<AvatarVariant, string> = {
      filled: "bg-aer-muted text-aer-muted-foreground border-transparent",
      outline: "bg-transparent text-aer-muted-foreground border-aer-border",
      soft: "bg-aer-muted/30 text-aer-muted-foreground border-transparent",
      ghost: "bg-transparent text-aer-muted-foreground border-transparent",
      aer: "bg-black/5 dark:bg-white/5 backdrop-blur-md text-aer-muted-foreground border-black/10 dark:border-white/10 shadow-sm",
    };

    // Use primary theme for filled/soft if initials are active
    const activeInitialsVariant =
      variant === "filled"
        ? "bg-aer-primary text-aer-primary-foreground"
        : variant === "soft"
        ? "bg-aer-primary/10 text-aer-primary"
        : variants[variant];

    const backgroundColor = style?.backgroundColor as string;
    const contrastColor = useContrastColor(
      backgroundColor || "",
      {},
      avatarRef
    );

    const finalStyle = { ...style };
    if (autoContrast && backgroundColor && contrastColor) {
      finalStyle.color = contrastColor;
    }

    const renderContent = () => {
      if (src && !imageError) {
        return (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover rounded-[inherit]"
            onError={() => setImageError(true)}
          />
        );
      }

      if (initials) {
        return (
          <span className="font-bold uppercase tracking-tighter">
            {initials.slice(0, 2)}
          </span>
        );
      }

      return fallbackIcon || <User className="h-1/2 w-1/2" />;
    };

    return (
      <div
        ref={(node) => {
          avatarRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative inline-flex items-center justify-center border shrink-0 overflow-visible",
          (variant === "filled" || variant === "soft") && "bg-aer-background",
          sizeClasses[size],
          roundedClasses[rounded],
          className
        )}
        style={finalStyle}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex items-center justify-center rounded-[inherit] overflow-hidden",
            variants[variant],
            (!src || imageError) && activeInitialsVariant
          )}
        >
          {renderContent()}
        </div>
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full border-2 border-aer-background",
              statusColors[status],
              statusSizeClasses[size]
            )}
            aria-label={status}
            role="status"
          />
        )}
        {children}
      </div>
    );
  }
);

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      size = "md",
      variant,
      maxCount,
      spacing = -12,
      rounded = "full",
      className,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children);
    const totalCount = childrenArray.length;
    const itemsToShow = maxCount
      ? childrenArray.slice(0, maxCount)
      : childrenArray;
    const remainingCount = totalCount - itemsToShow.length;

    const defaultSpacing: Record<AvatarSize, number> = {
      xs: -6,
      sm: -8,
      md: -10,
      lg: -12,
      xl: -14,
    };

    const finalSpacing = spacing === -12 ? defaultSpacing[size] : spacing;

    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-center", className)}
        {...props}
      >
        {itemsToShow.map((child, index) => {
          if (!React.isValidElement(child)) return null;
          const element = child as React.ReactElement<any>;
          return React.cloneElement(element, {
            size,
            variant: variant || element.props.variant,
            rounded: rounded || element.props.rounded,
            className: cn(
              element.props.className,
              "border-2 border-aer-background"
            ),
            style: {
              marginLeft: index !== 0 ? finalSpacing : 0,
              zIndex: itemsToShow.length - index,
              ...element.props.style,
            },
          });
        })}
        {remainingCount > 0 && (
          <Avatar
            size={size}
            variant={variant || "filled"}
            rounded={rounded}
            initials={`+${remainingCount}`}
            className="border-2 border-aer-background"
            style={{
              marginLeft: finalSpacing,
              zIndex: 0,
            }}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup };
