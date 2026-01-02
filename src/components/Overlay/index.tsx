import { calculateOptimalPosition } from "@/hooks";
import { cn } from "@/lib/utils";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { type OverlayProps } from "./types";
import { backdropVariants, overlayVariants } from "./variants";

export const Overlay = ({
  content,
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  strategy = "fixed",
  backdrop = false,
  backdropClassName,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  closeOnScroll = true,
  modal = false,
  disabled = false,
  className,
  ...props
}: OverlayProps) => {
  // State management (controlled/uncontrolled)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  const [effectiveSide, setEffectiveSide] = React.useState<typeof side>(side);
  const [effectiveAlign, setEffectiveAlign] =
    React.useState<typeof align>(align);

  const triggerRef = React.useRef<HTMLElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  // Auto-positioning logic
  React.useLayoutEffect(() => {
    if (isOpen && triggerRef.current && overlayRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const overlayRect = overlayRef.current.getBoundingClientRect();

      const result = calculateOptimalPosition({
        referenceRect: triggerRect,
        floatingRect: overlayRect,
        side,
        align,
        sideOffset,
      });

      setEffectiveSide(result.side as typeof side);
      setEffectiveAlign(result.align);
    }
  }, [isOpen, side, align, sideOffset]);

  // Close on Escape key
  React.useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, setIsOpen]);

  // Close on scroll (including nested scrollable containers)
  React.useEffect(() => {
    if (!closeOnScroll || !isOpen || !triggerRef.current) return;

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
  }, [isOpen, closeOnScroll, setIsOpen]);

  // Close on outside click
  React.useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(e.target as Node) &&
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
  }, [isOpen, closeOnOutsideClick, setIsOpen]);

  // Modal mode - prevent body scroll
  React.useEffect(() => {
    if (!modal || !isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modal, isOpen]);

  // Handle trigger click
  const handleTriggerClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  // Clone child and attach trigger ref and handlers
  const triggerElement = children
    ? React.cloneElement(children, {
        ref: triggerRef,
        onClick: (e: React.MouseEvent) => {
          (children.props as any).onClick?.(e);
          handleTriggerClick();
        },
        "aria-expanded": isOpen,
        "aria-haspopup": "true",
      } as any)
    : null;

  // Calculate position styles
  const getPositionStyles = (): React.CSSProperties => {
    if (!triggerRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const styles: React.CSSProperties = { position: strategy };

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
        styles.left = `${triggerRect.left + alignOffset}px`;
      } else if (effectiveAlign === "end") {
        styles.right = `${
          window.innerWidth - triggerRect.right + alignOffset
        }px`;
      } else {
        styles.left = `${
          triggerRect.left + triggerRect.width / 2 + alignOffset
        }px`;
        styles.transform = styles.transform
          ? `${styles.transform} translateX(-50%)`
          : "translateX(-50%)";
      }
    }

    return styles;
  };

  // Render overlay content
  const overlayContent = isOpen && !disabled && (
    <>
      {backdrop && (
        <div
          className={cn(backdropVariants(), backdropClassName)}
          onClick={() => closeOnOutsideClick && setIsOpen(false)}
        />
      )}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal={modal}
        className={cn(overlayVariants({ strategy }), className)}
        style={getPositionStyles()}
        {...props}
      >
        {content}
      </div>
    </>
  );

  // Use portal for proper stacking
  const portalContent =
    typeof document !== "undefined"
      ? ReactDOM.createPortal(overlayContent, document.body)
      : null;

  return (
    <>
      {triggerElement}
      {portalContent}
    </>
  );
};

Overlay.displayName = "Overlay";

export type { OverlayProps } from "./types";
export { Overlay as default };
