import { useState, type UIEvent } from "react";

export interface UseVirtualizationOptions {
  /** Whether virtualization is enabled */
  enabled: boolean;
  /** Total number of items in the list */
  itemCount: number;
  /** Height of each item in pixels */
  itemHeight: number;
  /** Maximum height of the container */
  maxHeight?: number;
  /** Number of items to render above/below visible area (overscan) */
  overscan?: number;
}

export interface UseVirtualizationReturn {
  /** Current scroll position */
  scrollTop: number;
  /** Total height of all items */
  totalHeight: number;
  /** Actual container height (constrained by maxHeight) */
  containerHeight: number;
  /** Index of first visible item */
  visibleStart: number;
  /** Index of last visible item (exclusive) */
  visibleEnd: number;
  /** Offset for top spacer div */
  offsetY: number;
  /** Height for bottom spacer div */
  bottomSpacerHeight: number;
  /** Scroll event handler */
  handleScroll: (e: UIEvent<HTMLDivElement>) => void;
  /** Reset scroll position to top */
  reset: () => void;
}

/**
 * Hook for virtualizing long lists without external libraries.
 * Only renders visible items + overscan buffer for performance.
 *
 * @example
 * ```ts
 * const { visibleStart, visibleEnd, offsetY, bottomSpacerHeight, handleScroll } =
 *   useVirtualization({
 *     enabled: true,
 *     itemCount: items.length,
 *     itemHeight: 36,
 *   });
 *
 * const visibleItems = items.slice(visibleStart, visibleEnd);
 * ```
 */
export function useVirtualization({
  enabled,
  itemCount,
  itemHeight,
  maxHeight = 250,
  overscan = 3,
}: UseVirtualizationOptions): UseVirtualizationReturn {
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate virtualization parameters
  const totalHeight = itemCount * itemHeight;
  const containerHeight = Math.min(totalHeight, maxHeight);

  // Calculate visible range
  const visibleStart = enabled
    ? Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
    : 0;
  const visibleEnd = enabled
    ? Math.min(
        itemCount,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
      )
    : itemCount;

  // Calculate spacer heights
  const offsetY = enabled ? visibleStart * itemHeight : 0;
  const bottomSpacerHeight = enabled
    ? totalHeight - offsetY - (visibleEnd - visibleStart) * itemHeight
    : 0;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (enabled) {
      setScrollTop(e.currentTarget.scrollTop);
    }
  };

  return {
    scrollTop,
    totalHeight,
    containerHeight,
    visibleStart,
    visibleEnd,
    offsetY,
    bottomSpacerHeight,
    handleScroll,
    reset: () => setScrollTop(0),
  };
}
