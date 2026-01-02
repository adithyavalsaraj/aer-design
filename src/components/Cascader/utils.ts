import type { CascaderOption } from "./types";

/**
 * Recursively searches for a value in the options tree and returns the path to it.
 * @param options The options tree
 * @param value The value to find
 * @returns Array of options representing the path, or null if not found
 */
export function getOptionPath(
  options: CascaderOption[],
  value: string | number
): CascaderOption[] | null {
  for (const option of options) {
    if (option.value === value) {
      return [option];
    }

    if (option.children) {
      const childrenPath = getOptionPath(option.children, value);
      if (childrenPath) {
        return [option, ...childrenPath];
      }
    }
  }
  return null;
}
