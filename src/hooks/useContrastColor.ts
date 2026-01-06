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
  const [detectedColor, setDetectedColor] = useState<string | undefined>(
    backgroundColor
  );

  // Sync detected color with backgroundColor prop
  useEffect(() => {
    if (backgroundColor) {
      setDetectedColor(backgroundColor);
    }
  }, [backgroundColor]);

  // Effect to detect color from ref if backgroundColor is not provided
  useEffect(() => {
    if (!backgroundColor && ref?.current) {
      const detect = () => {
        const color = getComputedBackgroundColor(ref.current!);
        if (color) {
          setDetectedColor(color);
        } else {
          setDetectedColor(undefined);
        }
      };

      // Initial detection
      detect();

      // Observe the element itself for status variations or direct style changes
      const elementObserver = new MutationObserver(detect);
      elementObserver.observe(ref.current, { attributes: true });

      // Observe the root element for theme changes (class="dark", data-theme="...")
      const rootObserver = new MutationObserver(detect);
      rootObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      return () => {
        elementObserver.disconnect();
        rootObserver.disconnect();
      };
    }
  }, [backgroundColor, ref]);

  return useMemo(() => {
    // If no color detected, return undefined to avoid forcing an incorrect color
    if (!detectedColor) {
      return undefined;
    }

    try {
      return getAccessibleTextColor(detectedColor, options);
    } catch (error) {
      console.error("Error calculating contrast color:", error);
      return undefined;
    }
  }, [
    detectedColor,
    options?.lightColor,
    options?.darkColor,
    options?.wcagLevel,
    options?.isLargeText,
  ]);
}
