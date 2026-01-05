import type { ContrastOptions } from "@/lib/contrast";
import { getAccessibleTextColor } from "@/lib/contrast";
import { useMemo } from "react";

/**
 * React hook for automatic contrast calculation
 *
 * Automatically determines the best text color (light or dark) based on
 * the provided background color to ensure WCAG compliance.
 *
 * @param backgroundColor - Background color (hex, rgb, rgba, or undefined)
 * @param options - Configuration options for contrast calculation
 * @returns Accessible text color that meets WCAG standards
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const bgColor = '#3498db';
 *   const textColor = useContrastColor(bgColor);
 *
 *   return (
 *     <div style={{ backgroundColor: bgColor, color: textColor }}>
 *       Accessible Text
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With custom options
 * const textColor = useContrastColor('#f1c40f', {
 *   lightColor: '#f8f9fa',
 *   darkColor: '#212529',
 *   wcagLevel: 'AAA',
 * });
 * ```
 */
export function useContrastColor(
  backgroundColor: string | undefined,
  options?: ContrastOptions
): string {
  return useMemo(() => {
    // Fallback to dark text if no background provided
    if (!backgroundColor) {
      return options?.darkColor || "#000000";
    }

    try {
      return getAccessibleTextColor(backgroundColor, options);
    } catch (error) {
      console.error("Error calculating contrast color:", error);
      // Fallback to dark text on error
      return options?.darkColor || "#000000";
    }
  }, [
    backgroundColor,
    options?.lightColor,
    options?.darkColor,
    options?.wcagLevel,
    options?.isLargeText,
  ]);
}
