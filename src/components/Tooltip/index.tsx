import { useAerConfig } from "@/components/AerConfigProvider";
import { useAutoPosition } from "@/hooks/useAutoPosition";
import { useContrastColor } from "@/hooks/useContrastColor";
import { cn } from "@/lib/utils";
import * as React from "react";
import { createPortal } from "react-dom";
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
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  style,
  scrollBehavior = "close",
  ...props
}: TooltipProps) => {
  const { autoContrast } = useAerConfig();
  const [internalIsOpen, setInternalIsOpen] =
    React.useState<boolean>(defaultOpen);

  const isOpen = controlledOpen ?? internalIsOpen;

  const setIsOpen = React.useCallback(
    (value: React.SetStateAction<boolean>) => {
      const newValue =
        typeof value === "function"
          ? (value as (prev: boolean) => boolean)(isOpen)
          : value;
      setInternalIsOpen(newValue);
      onOpenChange?.(newValue);
    },
    [isOpen, onOpenChange]
  );

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

  // Auto-positioning hook
  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen,
    side,
    align,
    sideOffset,
    strategy: "fixed",
    scrollBehavior,
    onScroll: () => setIsOpen(false),
  });

  // Re-attach internal triggerRef to hook's referenceRef
  React.useLayoutEffect(() => {
    if (triggerRef.current) {
      referenceRef(triggerRef.current);
    }
  }, [referenceRef]);

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

  // Auto Contrast Logic
  const backgroundColor = style?.backgroundColor as string;
  const contrastColor = useContrastColor(backgroundColor || "");

  const getMergedStyles = (): React.CSSProperties => {
    const finalStyle = { ...floatingStyles, ...style, zIndex: 2000 };

    if (autoContrast && backgroundColor) {
      finalStyle.color = contrastColor;
    }
    return finalStyle;
  };

  return (
    <>
      {triggerElement}
      {isOpen &&
        !disabled &&
        createPortal(
          <div
            ref={floatingRef}
            role="tooltip"
            id="tooltip"
            className={cn(tooltipVariants({ variant }), className)}
            style={getMergedStyles()}
            {...props}
          >
            <div className="relative z-10">{content}</div>
          </div>,
          document.body
        )}
    </>
  );
};

Tooltip.displayName = "Tooltip";

export type { TooltipProps } from "./types";
export { Tooltip as default };
