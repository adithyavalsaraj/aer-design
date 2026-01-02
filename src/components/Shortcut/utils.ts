import { type KeyCombination } from "./types";

const IS_MAC =
  typeof window !== "undefined" &&
  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);

export const MODIFIER_SYMBOLS: Record<string, string> = {
  Meta: IS_MAC ? "⌘" : "Win",
  Control: IS_MAC ? "⌃" : "Ctrl",
  Alt: IS_MAC ? "⌥" : "Alt",
  Shift: "⇧",
  Enter: "↵",
  Backspace: "⌫",
  Delete: "⌦",
  Escape: "Esc",
  Tab: "⇥",
  ArrowUp: "↑",
  ArrowDown: "↓",
  ArrowLeft: "←",
  ArrowRight: "→",
};

export const MODIFIER_KEYS = ["Meta", "Control", "Alt", "Shift"];

/**
 * Normalizes a key event into a standard string representation
 */
export function normalizeKey(e: KeyboardEvent): string | null {
  const key = e.key;

  // Ignore isolated modifier presses
  if (MODIFIER_KEYS.includes(key)) return null;

  return key;
}

/**
 * Formats a key combination for display (e.g. ["Meta", "K"] -> "⌘K")
 */
export function formatShortcut(keys: KeyCombination): string {
  if (!keys || keys.length === 0) return "";

  return keys
    .map((key) => MODIFIER_SYMBOLS[key] || key.toUpperCase())
    .join(IS_MAC ? "" : "+");
}

/**
 * Checks if a keyboard event matches a key combination
 */
export function matchShortcut(
  event: KeyboardEvent,
  keys: KeyCombination
): boolean {
  if (!keys || keys.length === 0) return false;

  const pressedModifiers = {
    Meta: event.metaKey,
    Control: event.ctrlKey,
    Alt: event.altKey,
    Shift: event.shiftKey,
  };

  // 1. Check if all required modifiers in 'keys' are pressed
  const requiredModifiers = keys.filter((k) => MODIFIER_KEYS.includes(k));
  const mainKey = keys.find((k) => !MODIFIER_KEYS.includes(k));

  // Check strict modifier equality
  // All modifiers present in `keys` must be pressed.
  // AND any modifier NOT present in `keys` must NOT be pressed.
  const allModifiers = ["Meta", "Control", "Alt", "Shift"];
  for (const mod of allModifiers) {
    const isRequired = requiredModifiers.includes(mod);
    const isPressed = pressedModifiers[mod as keyof typeof pressedModifiers];
    if (isRequired !== isPressed) return false;
  }

  // 2. Check the main key
  if (mainKey) {
    return event.key.toLowerCase() === mainKey.toLowerCase();
  }

  return true; // If only modifiers are required (rare)
}

export function detectOS() {
  return IS_MAC ? "mac" : "windows";
}
