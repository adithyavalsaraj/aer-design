/**
 * Contrast Calculation Utilities
 *
 * Provides functions to calculate color contrast ratios and determine
 * accessible text colors according to WCAG 2.1 guidelines.
 *
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */

/**
 * Convert hex color to RGB values
 * @param hex - Hex color string (e.g., "#FF5733" or "FF5733")
 * @returns RGB object with r, g, b values (0-255)
 */
export function hexToRgb(
  hex: string
): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, "");

  // Handle 3-digit hex
  const expandedHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex);

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Parse RGB/RGBA color string to RGBA values
 * @param color - Color string (e.g., "rgb(255, 87, 51)", "rgba(255, 87, 51, 0.5)", "#FF5733")
 * @returns RGBA object with r, g, b values (0-255) and a (0-1)
 */
export function parseRgba(
  color: string
): { r: number; g: number; b: number; a: number } | null {
  if (!color) return null;
  const cleanColor = color.trim().toLowerCase();

  if (cleanColor.startsWith("#")) {
    const rgb = hexToRgb(cleanColor);
    return rgb ? { ...rgb, a: 1 } : null;
  }

  // Matches rgb(r, g, b), rgba(r, g, b, a), rgb(r g b), rgba(r g b / a)
  const match = cleanColor.match(
    /rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s\/]+([\d.]+))?\s*\)/
  );

  if (!match) return null;

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

/**
 * Calculate relative luminance of a color according to WCAG formula
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 * @returns Relative luminance (0-1)
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getLuminance(r: number, g: number, b: number): number {
  // Convert to 0-1 range
  const [rs, gs, bs] = [r, g, b].map((val) => {
    const normalized = val / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color (hex, rgb, or rgba)
 * @param color2 - Second color (hex, rgb, or rgba)
 * @returns Contrast ratio (1-21)
 * @see https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgba1 = parseRgba(color1);
  const rgba2 = parseRgba(color2);

  if (!rgba1 || !rgba2) {
    console.warn("Invalid color format provided to getContrastRatio", {
      color1,
      color2,
    });
    return 1;
  }

  const lum1 = getLuminance(rgba1.r, rgba1.g, rgba1.b);
  const lum2 = getLuminance(rgba2.r, rgba2.g, rgba2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param contrastRatio - Contrast ratio to check
 * @param level - WCAG level ('AA' or 'AAA')
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns Whether the contrast ratio meets the standard
 */
export function meetsWCAG(
  contrastRatio: number,
  level: "AA" | "AAA" = "AA",
  isLargeText: boolean = false
): boolean {
  if (level === "AAA") {
    return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7;
  }
  // AA level
  return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5;
}

export interface ContrastOptions {
  /** Light color to use for text (default: white) */
  lightColor?: string;
  /** Dark color to use for text (default: black) */
  darkColor?: string;
  /** WCAG level to meet (default: 'AA') */
  wcagLevel?: "AA" | "AAA";
  /** Whether the text is large (18pt+ or 14pt+ bold) */
  isLargeText?: boolean;
}

/**
 * Get accessible text color based on background color
 * Automatically determines whether to use light or dark text to meet WCAG standards
 *
 * @param backgroundColor - Background color (hex, rgb, or rgba)
 * @param options - Configuration options
 * @returns Accessible text color (light or dark)
 */
export function getAccessibleTextColor(
  backgroundColor: string,
  options: ContrastOptions = {}
): string {
  const {
    lightColor = "#ffffff",
    darkColor = "#000000",
    wcagLevel = "AA",
    isLargeText = false,
  } = options;

  // Calculate contrast with both light and dark colors
  const lightContrast = getContrastRatio(backgroundColor, lightColor);
  const darkContrast = getContrastRatio(backgroundColor, darkColor);

  // Check if light color meets WCAG standards
  const lightMeetsStandard = meetsWCAG(lightContrast, wcagLevel, isLargeText);
  const darkMeetsStandard = meetsWCAG(darkContrast, wcagLevel, isLargeText);

  // If both meet standards, choose the one with higher contrast
  if (lightMeetsStandard && darkMeetsStandard) {
    return lightContrast > darkContrast ? lightColor : darkColor;
  }

  // If only one meets standards, use that one
  if (lightMeetsStandard) return lightColor;
  if (darkMeetsStandard) return darkColor;

  // If neither meets standards, use the one with higher contrast
  return lightContrast > darkContrast ? lightColor : darkColor;
}

/**
 * Get computed background color of an element, blending semi-transparent
 * layers with their parents to find the actual visual background.
 *
 * @param element - DOM element to get background color from
 * @returns Background color in rgb format, or null if detection fails
 */
export function getComputedBackgroundColor(
  element: HTMLElement
): string | null {
  const computed = window.getComputedStyle(element);
  const bgColor = computed.backgroundColor;

  if (!bgColor || bgColor === "transparent" || bgColor === "rgba(0, 0, 0, 0)") {
    const parent = element.parentElement;
    return parent ? getComputedBackgroundColor(parent) : null;
  }

  const rgba = parseRgba(bgColor);

  if (!rgba || rgba.a === 0) {
    const parent = element.parentElement;
    return parent ? getComputedBackgroundColor(parent) : null;
  }

  // If fully opaque, we're done
  if (rgba.a === 1) {
    return bgColor;
  }

  // If semi-transparent, blend with parent
  const parent = element.parentElement;
  const parentBg = parent ? getComputedBackgroundColor(parent) : null;

  if (!parentBg) return null;

  const parentRgba = parseRgba(parentBg);
  if (!parentRgba) return null;

  // Alpha blending formula: C = C1 * a1 + C2 * (1 - a1)
  const r = Math.round(rgba.r * rgba.a + parentRgba.r * (1 - rgba.a));
  const g = Math.round(rgba.g * rgba.a + parentRgba.g * (1 - rgba.a));
  const b = Math.round(rgba.b * rgba.a + parentRgba.b * (1 - rgba.a));

  return `rgb(${r}, ${g}, ${b})`;
}
