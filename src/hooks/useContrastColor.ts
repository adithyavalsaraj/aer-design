import type { ContrastOptions } from "@/lib/contrast";
import {
  getAccessibleTextColor,
  getComputedBackgroundColor,
} from "@/lib/contrast";
import { useEffect, useMemo, useState } from "react";

/**
 * React hook for automatic contrast calculation
 *
 * Automatically determines the best text color (light or dark) based on
 * the provided background color or a DOM reference to ensure WCAG compliance.
 *
 * @param backgroundColor - Background color (hex, rgb, rgba, or undefined)
 * @param options - Configuration options for contrast calculation
 * @param ref - Optional React ref to an element to detect background color from
 * @returns Accessible text color that meets WCAG standards
 */
export function useContrastColor(
  backgroundColor?: string,
  options?: ContrastOptions,
  ref?: React.RefObject<HTMLElement | null>
): string | undefined {
  const [computedColor, setComputedColor] = useState<string | undefined>(
    undefined
  );

  // If we have a ref but no explicit background color, we need to detect it
  useEffect(() => {
    // If explicit background is provided, we don't need to compute (unless we want to support fallback?)
    // Actually, usually if backgroundColor is provided, we use it.
    if (backgroundColor || !ref?.current) {
      return;
    }

    const detect = () => {
      const color = getComputedBackgroundColor(ref.current!);
      if (color) {
        setComputedColor(color);
      }
    };

    // Initial detection
    // Use requestAnimationFrame to avoid "setState during render" warning if this effect runs synchronously often?
    // Actually, effect runs after render, so it's fine.
    detect();

    const elementObserver = new MutationObserver(detect);
    elementObserver.observe(ref.current, { attributes: true });

    const rootObserver = new MutationObserver(detect);
    rootObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    return () => {
      elementObserver.disconnect();
      rootObserver.disconnect();
    };
  }, [backgroundColor, ref]);

  const effectiveColor = backgroundColor ?? computedColor;

  const { lightColor, darkColor, wcagLevel, isLargeText } = options || {};
  const memoizedOptions = useMemo(
    () => ({ lightColor, darkColor, wcagLevel, isLargeText }),
    [lightColor, darkColor, wcagLevel, isLargeText]
  );

  return useMemo(() => {
    if (!effectiveColor) return undefined;

    try {
      return getAccessibleTextColor(effectiveColor, memoizedOptions);
    } catch (error) {
      console.warn("Error calculating contrast color:", error);
      return undefined;
    }
  }, [effectiveColor, memoizedOptions]);
}
