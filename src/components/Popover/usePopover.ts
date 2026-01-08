import { useAutoPosition } from "@/hooks/useAutoPosition";
import * as React from "react";
import type { TriggerType, UsePopoverOptions, UsePopoverReturn } from "./types";

/**
 * Headless hook for popover behavior.
 * Provides state management, trigger handling, and positioning integration.
 */
export function usePopover(options: UsePopoverOptions = {}): UsePopoverReturn {
  const {
    // State
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,

    // Triggers
    trigger = "click",

    // Interaction
    closeOnOutsideClick = true,
    closeOnEscape = true,
    closeOnResize = false,
    closeOnInteractInside = false,

    // Delays
    openDelay = 0,
    closeDelay = 0,

    // Positioning
    side = "bottom",
    align = "start",
    sideOffset = 4,
    alignOffset = 0,
    strategy = "fixed",
    scrollBehavior = "reposition",
    avoidCollisions = true,

    // Accessibility
    disabled = false,

    // Lifecycle
    onOpen,
    onClose,

    // Advanced
    whitelistedRefs = [],
  } = options;

  // State management (controlled/uncontrolled)
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (disabled) return;

      if (!isControlled) {
        setUncontrolledOpen(value);
      }
      onOpenChange?.(value);

      // Lifecycle callbacks
      if (value) {
        onOpen?.();
      } else {
        onClose?.();
      }
    },
    [isControlled, onOpenChange, onOpen, onClose, disabled]
  );

  // Refs
  const arrowRef = React.useRef<HTMLDivElement | null>(null);
  const openTimeoutRef = React.useRef<number | undefined>(undefined);
  const closeTimeoutRef = React.useRef<number | undefined>(undefined);

  // Clear timeouts on unmount
  React.useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Auto-positioning hook integration
  const {
    referenceRef: anchorRef,
    floatingRef,
    floatingStyles,
    placement,
    elements,
  } = useAutoPosition({
    isOpen: open,
    side,
    align,
    sideOffset,
    alignOffset,
    avoidCollisions,
    strategy,
    scrollBehavior,
    onScroll: scrollBehavior === "close" ? () => setOpen(false) : undefined,
  });

  // Force update position
  const updatePosition = React.useCallback(() => {
    // The useAutoPosition hook handles this internally via its tick state
    // We expose this for manual control if needed
  }, []);

  // Imperative API
  const openPopover = React.useCallback(() => {
    if (disabled) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);

    if (openDelay > 0) {
      openTimeoutRef.current = window.setTimeout(() => {
        setOpen(true);
      }, openDelay);
    } else {
      setOpen(true);
    }
  }, [disabled, openDelay, setOpen]);

  const closePopover = React.useCallback(() => {
    if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);

    if (closeDelay > 0) {
      closeTimeoutRef.current = window.setTimeout(() => {
        setOpen(false);
      }, closeDelay);
    } else {
      setOpen(false);
    }
  }, [closeDelay, setOpen]);

  const togglePopover = React.useCallback(() => {
    if (open) {
      closePopover();
    } else {
      openPopover();
    }
  }, [open, openPopover, closePopover]);

  // Determine active triggers
  const triggers = React.useMemo<TriggerType[]>(() => {
    if (trigger === "manual") return [];
    return Array.isArray(trigger) ? trigger : [trigger];
  }, [trigger]);

  const hasClickTrigger = triggers.includes("click");
  const hasHoverTrigger = triggers.includes("hover");
  const hasFocusTrigger = triggers.includes("focus");

  // Close on Escape key
  React.useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopover();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, closePopover]);

  // Close on outside click
  React.useEffect(() => {
    if (!closeOnOutsideClick || !open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // Check if click is inside floating element
      if (elements.floating && elements.floating.contains(target)) {
        if (closeOnInteractInside) {
          closePopover();
        }
        return;
      }

      // Check if click is inside anchor element
      if (elements.reference && elements.reference.contains(target)) {
        return;
      }

      // Check if click is inside any popover content (for nested popovers)
      // This prevents parent popovers from closing when clicking in child popovers
      const clickedElement = target as HTMLElement;
      const isInsideAnyPopover = clickedElement.closest('[role="dialog"]');
      if (isInsideAnyPopover) {
        return;
      }

      // Check whitelisted refs
      const isWhitelisted = whitelistedRefs.some(
        (ref) => ref.current && ref.current.contains(target)
      );
      if (isWhitelisted) return;

      // Click is outside - close popover
      closePopover();
    };

    // Delay to avoid immediate close on trigger click
    setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    open,
    closeOnOutsideClick,
    closeOnInteractInside,
    closePopover,
    elements.floating,
    elements.reference,
    whitelistedRefs,
  ]);

  // Close on resize
  React.useEffect(() => {
    if (!closeOnResize || !open) return;

    const handleResize = () => {
      closePopover();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open, closeOnResize, closePopover]);

  // Props getters for accessibility
  const getAnchorProps = React.useCallback((): Record<string, any> => {
    const props: Record<string, any> = {
      "aria-expanded": open,
      "aria-haspopup": "true",
    };

    // Add trigger-specific handlers
    if (hasClickTrigger) {
      props.onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        togglePopover();
      };
    }

    if (hasHoverTrigger) {
      props.onMouseEnter = openPopover;
      props.onMouseLeave = closePopover;
    }

    if (hasFocusTrigger) {
      props.onFocus = openPopover;
      props.onBlur = closePopover;
    }

    // Keyboard support for click trigger
    if (hasClickTrigger) {
      props.onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePopover();
        }
      };
    }

    return props;
  }, [
    open,
    hasClickTrigger,
    hasHoverTrigger,
    hasFocusTrigger,
    togglePopover,
    openPopover,
    closePopover,
  ]);

  const getFloatingProps = React.useCallback((): Record<string, any> => {
    return {
      role: "dialog",
      "aria-modal": false,
      tabIndex: -1,
    };
  }, []);

  return {
    // State
    open,

    // Imperative API
    openPopover,
    closePopover,
    togglePopover,

    // Refs
    anchorRef,
    floatingRef,
    arrowRef,

    // Positioning
    floatingStyles,
    placement,
    updatePosition,

    // Elements
    anchorElement: elements.reference,
    floatingElement: elements.floating,

    // Props getters
    getAnchorProps,
    getFloatingProps,
  };
}
