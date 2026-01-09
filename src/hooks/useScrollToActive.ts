import { useEffect, type RefObject } from "react";

interface UseScrollToActiveProps {
  containerRef: RefObject<HTMLElement>;
  activeIndex: number;
  enabled?: boolean;
}

/**
 * Automatically scrolls a container to ensure the element with
 * `data-active-index="{activeIndex}"` is visible.
 */
export function useScrollToActive({
  containerRef,
  activeIndex,
  enabled = true,
}: UseScrollToActiveProps) {
  useEffect(() => {
    if (!enabled || activeIndex < 0 || !containerRef.current) return;

    const container = containerRef.current;

    // Find the active element by data attribute to handle complex structures (groups, etc)
    const activeEl = container.querySelector(
      `[data-active-index="${activeIndex}"]`
    ) as HTMLElement;

    if (!activeEl) return;

    // Calculate relative position
    const activeRect = activeEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const relativeTop = activeRect.top - containerRect.top;
    const relativeBottom = activeRect.bottom - containerRect.bottom;

    if (relativeTop < 0) {
      // Scroll up if item is above view
      container.scrollTop += relativeTop;
    } else if (relativeBottom > 0) {
      // Scroll down if item is below view
      container.scrollTop += relativeBottom;
    }
  }, [activeIndex, enabled, containerRef]);
}
