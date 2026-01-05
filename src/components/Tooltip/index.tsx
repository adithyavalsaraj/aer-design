import { useAerConfig } from "@/components/AerConfigProvider";
import { calculateOptimalPosition } from "@/hooks";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import * as React from "react";
import { type TooltipProps } from "./types";
import { tooltipVariants } from "./variants";

export const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  variant = "default",
  sideOffset = 8,
  showDelay = 200,
  hideDelay = 0,
  trigger = "hover",
  arrow = true,
  disabled = false,
  className,
  style,
  ...props
}: TooltipProps) => {
  const { autoContrast } = useAerConfig();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [effectiveSide, setEffectiveSide] = React.useState<typeof side>(side);
  const [effectiveAlign, setEffectiveAlign] =
    React.useState<typeof align>(align);

  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const showTimeoutRef = React.useRef<number | undefined>(undefined);
  const hideTimeoutRef = React.useRef<number | undefined>(undefined);

  // Clear timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Auto-positioning logic
  React.useLayoutEffect(() => {
    if (isOpen && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const result = calculateOptimalPosition({
        referenceRect: triggerRect,
        floatingRect: tooltipRect,
        side,
        align,
        sideOffset,
      });

      setEffectiveSide(result.side as typeof side);
      setEffectiveAlign(result.align);
    }
  }, [isOpen, side, align, sideOffset]);

  const handleShow = () => {
    if (disabled) return;
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    showTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, showDelay);
  };

  const handleHide = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, hideDelay);
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Close on scroll (including nested scrollable containers)
  React.useEffect(() => {
    if (!isOpen || !triggerRef.current) return;

    const handleScroll = () => {
      setIsOpen(false);
    };

    // Find all scrollable parent elements
    const scrollableParents: (Element | Window)[] = [window];
    let element = triggerRef.current.parentElement;

    while (element) {
      const { overflow, overflowY, overflowX } =
        window.getComputedStyle(element);
      const isScrollable =
        overflow === "auto" ||
        overflow === "scroll" ||
        overflowY === "auto" ||
        overflowY === "scroll" ||
        overflowX === "auto" ||
        overflowX === "scroll";

      if (isScrollable) {
        scrollableParents.push(element);
      }

      element = element.parentElement;
    }

    // Add scroll listeners to all scrollable parents
    scrollableParents.forEach((parent) => {
      parent.addEventListener("scroll", handleScroll);
    });

    return () => {
      scrollableParents.forEach((parent) => {
        parent.removeEventListener("scroll", handleScroll);
      });
    };
  }, [isOpen]);

  // Close on outside click for click trigger
  React.useEffect(() => {
    if (trigger !== "click" || !isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, trigger]);

  // Clone child and attach trigger ref and handlers
  const triggerElement = React.cloneElement(children, {
    ref: triggerRef,
    ...(trigger === "hover"
      ? {
          onMouseEnter: handleShow,
          onMouseLeave: handleHide,
          onFocus: handleShow,
          onBlur: handleHide,
        }
      : {
          onClick: (e: React.MouseEvent) => {
            (children.props as any).onClick?.(e);
            handleToggle();
          },
        }),
    "aria-describedby": isOpen ? "tooltip" : undefined,
  } as any);

  // Calculate position styles
  const getPositionStyles = (): React.CSSProperties => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const styles: React.CSSProperties = { position: "fixed" };

    // Vertical positioning
    if (effectiveSide === "top") {
      styles.bottom = `${window.innerHeight - triggerRect.top + sideOffset}px`;
    } else if (effectiveSide === "bottom") {
      styles.top = `${triggerRect.bottom + sideOffset}px`;
    } else {
      // For left/right, center vertically
      if (effectiveAlign === "start") {
        styles.top = `${triggerRect.top}px`;
      } else if (effectiveAlign === "end") {
        styles.bottom = `${window.innerHeight - triggerRect.bottom}px`;
      } else {
        styles.top = `${triggerRect.top + triggerRect.height / 2}px`;
        styles.transform = "translateY(-50%)";
      }
    }

    // Horizontal positioning
    if (effectiveSide === "left") {
      styles.right = `${window.innerWidth - triggerRect.left + sideOffset}px`;
    } else if (effectiveSide === "right") {
      styles.left = `${triggerRect.right + sideOffset}px`;
    } else {
      // For top/bottom, align horizontally
      if (effectiveAlign === "start") {
        styles.left = `${triggerRect.left}px`;
      } else if (effectiveAlign === "end") {
        styles.right = `${window.innerWidth - triggerRect.right}px`;
      } else {
        styles.left = `${triggerRect.left + triggerRect.width / 2}px`;
        styles.transform = styles.transform
          ? `${styles.transform} translateX(-50%)`
          : "translateX(-50%)";
      }
    }

    return styles;
  };

  // Auto Contrast Logic
  const backgroundColor = style?.backgroundColor as string;
  const contrastColor = useContrastColor(backgroundColor || "");

  const getMergedStyles = (): React.CSSProperties => {
    const positionStyles = getPositionStyles();
    const finalStyle = { ...positionStyles, ...style };

    if (autoContrast && backgroundColor) {
      finalStyle.color = contrastColor;
    }
    return finalStyle;
  };

  return (
    <>
      {triggerElement}
      {isOpen && !disabled && (
        <div
          ref={tooltipRef}
          role="tooltip"
          id="tooltip"
          className={cn(tooltipVariants({ variant }), className)}
          style={getMergedStyles()}
          {...props}
        >
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};

Tooltip.displayName = "Tooltip";

export type { TooltipProps } from "./types";
export { Tooltip as default };
