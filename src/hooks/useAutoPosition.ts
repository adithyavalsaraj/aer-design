import * as React from "react";

// --- Types ---

export type Side = "top" | "bottom" | "left" | "right";
export type Align = "start" | "center" | "end";

export interface CalculatePositionOptions {
  /** Bounding rect of the reference (trigger) element */
  referenceRect: DOMRect;
  /** Bounding rect of the floating (content) element */
  floatingRect: DOMRect;
  /** Preferred side to position the floating element */
  side: Side;
  /** Preferred alignment relative to the reference element */
  align: Align;
  /** Offset in pixels from the reference element */
  sideOffset?: number;
  /** Viewport width (defaults to window.innerWidth) */
  viewportWidth?: number;
  /** Viewport height (defaults to window.innerHeight) */
  viewportHeight?: number;
}

export interface CalculatePositionResult {
  /** Optimal side after collision detection */
  side: Side;
  /** Optimal alignment after collision detection */
  align: Align;
}

/**
 * Calculate the optimal position for a floating element relative to a reference element.
 * Uses 360-degree collision detection to find the best fit within the viewport.
 *
 * @param options - Configuration for position calculation
 * @returns The optimal side and alignment
 */
export function calculateOptimalPosition(
  options: CalculatePositionOptions
): CalculatePositionResult {
  const {
    referenceRect,
    floatingRect,
    side: preferredSide,
    align: preferredAlign,
    sideOffset = 4,
    viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight,
  } = options;

  // Helper: Check if a side fits on the main axis
  const checkSideMainAxisFit = (s: Side): boolean => {
    if (s === "top")
      return referenceRect.top - floatingRect.height - sideOffset >= 0;
    if (s === "bottom")
      return (
        referenceRect.bottom + floatingRect.height + sideOffset <=
        viewportHeight
      );
    if (s === "left")
      return referenceRect.left - floatingRect.width - sideOffset >= 0;
    if (s === "right")
      return (
        referenceRect.right + floatingRect.width + sideOffset <= viewportWidth
      );
    return false;
  };

  // Helper: Check if alignment fits on the cross axis
  const checkAlignCrossAxisFit = (a: Align, s: Side): boolean => {
    const tolerance = 1; // 1px tolerance

    if (s === "left" || s === "right") {
      // Vertical alignment
      let top = 0;
      if (a === "start") top = referenceRect.top;
      else if (a === "center")
        top =
          referenceRect.top +
          referenceRect.height / 2 -
          floatingRect.height / 2;
      else if (a === "end") top = referenceRect.bottom - floatingRect.height;
      return (
        top >= -tolerance &&
        top + floatingRect.height <= viewportHeight + tolerance
      );
    } else {
      // Horizontal alignment
      let left = 0;
      if (a === "start") left = referenceRect.left;
      else if (a === "center")
        left =
          referenceRect.left + referenceRect.width / 2 - floatingRect.width / 2;
      else if (a === "end") left = referenceRect.right - floatingRect.width;
      return (
        left >= -tolerance &&
        left + floatingRect.width <= viewportWidth + tolerance
      );
    }
  };

  // Priority lists for searching
  const getSidePriority = (preferred: Side): readonly Side[] => {
    if (preferred === "top") return ["top", "bottom", "right", "left"];
    if (preferred === "bottom") return ["bottom", "top", "right", "left"];
    if (preferred === "left") return ["left", "right", "bottom", "top"];
    if (preferred === "right") return ["right", "left", "bottom", "top"];
    return ["bottom", "top", "left", "right"];
  };

  const getAlignPriority = (preferred: Align): readonly Align[] => {
    if (preferred === "start") return ["start", "end", "center"];
    if (preferred === "end") return ["end", "start", "center"];
    return ["center", "start", "end"];
  };

  let bestSide: Side = preferredSide;
  let bestAlign: Align = preferredAlign;

  // Find optimal position
  const sidePriority = getSidePriority(preferredSide);
  let matchFound = false;

  for (const s of sidePriority) {
    if (!checkSideMainAxisFit(s)) continue;

    const alignPriority = getAlignPriority(preferredAlign);
    for (const a of alignPriority) {
      if (checkAlignCrossAxisFit(a, s)) {
        bestSide = s;
        bestAlign = a;
        matchFound = true;
        break;
      }
    }
    if (matchFound) break;
  }

  // Fallback: if nothing fits, return user preference
  if (!matchFound) {
    bestSide = preferredSide;
    bestAlign = preferredAlign;
  }

  return {
    side: bestSide,
    align: bestAlign,
  };
}

// --- Hook Implementation ---

export interface UseAutoPositionOptions {
  /** Whether the floating element is open/visible */
  isOpen: boolean;
  /** Preferred side to position the floating element */
  side?: Side;
  /** Preferred alignment relative to the reference element */
  align?: Align;
  /** Offset in pixels from the reference element */
  sideOffset?: number;
  /** Offset in pixels for alignment */
  alignOffset?: number;
  /** Enable collision detection and auto-repositioning */
  avoidCollisions?: boolean;
}

export interface UseAutoPositionReturn {
  /** Ref to attach to the reference (trigger) element */
  referenceRef: React.RefCallback<Element>;
  /** Ref to attach to the floating (content) element */
  floatingRef: React.RefCallback<HTMLElement>;
  /** CSS styles to apply to the floating element */
  floatingStyles: React.CSSProperties;
  /** Final computed placement after collision detection */
  placement: {
    side: Side;
    align: Align;
  };
  elements: {
    reference: Element | null;
    floating: HTMLElement | null;
  };
}

/**
 * Hook for auto-positioning floating elements with collision detection.
 * Automatically repositions the element to stay within the viewport.
 *
 * @param options - Configuration options
 * @returns Refs and styles for the floating element
 */
export function useAutoPosition(
  options: UseAutoPositionOptions
): UseAutoPositionReturn {
  const {
    isOpen,
    side = "bottom",
    align = "start",
    sideOffset = 4,
    alignOffset = 0,
    avoidCollisions = true,
  } = options;

  const [referenceElement, setReferenceElement] =
    React.useState<Element | null>(null);
  const [floatingElement, setFloatingElement] =
    React.useState<HTMLElement | null>(null);

  const [effectiveSide, setEffectiveSide] = React.useState<Side>(side);
  const [effectiveAlign, setEffectiveAlign] = React.useState<Align>(align);
  const [floatingStyles, setFloatingStyles] =
    React.useState<React.CSSProperties>({});

  // Update effective values when props change
  React.useEffect(() => {
    setEffectiveSide(side);
    setEffectiveAlign(align);
  }, [side, align]);

  // Auto-positioning logic
  React.useLayoutEffect(() => {
    if (!isOpen || !referenceElement || !floatingElement || !avoidCollisions) {
      return;
    }

    const floatingRect = floatingElement.getBoundingClientRect();
    const referenceRect = referenceElement.getBoundingClientRect();

    const result = calculateOptimalPosition({
      referenceRect,
      floatingRect,
      side,
      align,
      sideOffset,
    });

    // Update state if changed
    if (result.side !== effectiveSide || result.align !== effectiveAlign) {
      setEffectiveSide(result.side);
      setEffectiveAlign(result.align);
    }
  }, [
    isOpen,
    referenceElement,
    floatingElement,
    side,
    align,
    sideOffset,
    effectiveSide,
    effectiveAlign,
    avoidCollisions,
  ]);

  // Calculate styles based on effective placement
  React.useLayoutEffect(() => {
    if (!isOpen || !referenceElement || !floatingElement) {
      setFloatingStyles({});
      return;
    }

    const styles: React.CSSProperties = {
      position: "absolute",
      zIndex: 50,
    };

    // Calculate position based on side
    if (effectiveSide === "top") {
      styles.bottom = `calc(100% + ${sideOffset}px)`;
    } else if (effectiveSide === "bottom") {
      styles.top = `calc(100% + ${sideOffset}px)`;
    } else if (effectiveSide === "left") {
      styles.right = `calc(100% + ${sideOffset}px)`;
    } else if (effectiveSide === "right") {
      styles.left = `calc(100% + ${sideOffset}px)`;
    }

    // Calculate alignment
    if (effectiveSide === "top" || effectiveSide === "bottom") {
      // Horizontal alignment
      if (effectiveAlign === "start") {
        styles.left = `${alignOffset}px`;
      } else if (effectiveAlign === "center") {
        styles.left = "50%";
        styles.transform = "translateX(-50%)";
      } else if (effectiveAlign === "end") {
        styles.right = `${alignOffset}px`;
      }
    } else {
      // Vertical alignment
      if (effectiveAlign === "start") {
        styles.top = `${alignOffset}px`;
      } else if (effectiveAlign === "center") {
        styles.top = "50%";
        styles.transform = "translateY(-50%)";
      } else if (effectiveAlign === "end") {
        styles.bottom = `${alignOffset}px`;
      }
    }

    setFloatingStyles(styles);
  }, [
    isOpen,
    referenceElement,
    floatingElement,
    effectiveSide,
    effectiveAlign,
    sideOffset,
    alignOffset,
  ]);

  return {
    referenceRef: setReferenceElement,
    floatingRef: setFloatingElement,
    floatingStyles,
    placement: {
      side: effectiveSide,
      align: effectiveAlign,
    },
    elements: {
      reference: referenceElement,
      floating: floatingElement,
    },
  };
}
