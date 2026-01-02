import * as React from "react";
import { useShortcutContext } from "./ShortcutContext";
import { type KeyCombination } from "./types";

interface UseShortcutOptions {
  defaultKeys?: KeyCombination;
  label?: string;
  description?: string;
  enabled?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  /**
   * If provided, the shortcut will only trigger when focus is within this element.
   */
  scopeRef?: React.RefObject<HTMLElement>;
}

/**
 * Hook to register and listen for a keyboard shortcut.
 *
 * @param actionId Unique ID for the action (e.g., "save-document")
 * @param onTrigger Callback function when shortcut is pressed
 * @param options Configuration options
 */
export function useShortcut(
  actionId: string,
  onTrigger?: (e: KeyboardEvent) => void,
  options: UseShortcutOptions = {}
) {
  const {
    defaultKeys = [],
    label = actionId,
    description,
    enabled = true,
    preventDefault = true,
    stopPropagation = true,
    scopeRef,
  } = options;

  const { registerAction, isPressed, getShortcutParams } = useShortcutContext();

  // Register the action on mount
  React.useEffect(() => {
    registerAction({
      id: actionId,
      label,
      defaultKeys,
      description,
    });
  }, [
    actionId,
    JSON.stringify(defaultKeys),
    label,
    description,
    registerAction,
  ]);

  // Listen for keydown events
  React.useEffect(() => {
    if (!enabled || !onTrigger) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // 1. Scope Check
      if (scopeRef?.current) {
        const target = event.target as Node;
        // If target is not within scope, ignore
        if (!scopeRef.current.contains(target)) {
          return;
        }
      }

      // Ignore if user is typing in an input (unless specific modifier combo?)
      // Actually, standard shortcuts usually work unless focused in input depending on context.
      // But typically "Cmd+S" works everywhere. "K" might not.
      // For now, we trust isPressed logic.
      // We might want to add an option `ignoreInput` (default true/false).

      // Basic input protection for single keys without modifiers
      const isInput =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target as HTMLElement).isContentEditable;

      // If pressing just a letter in an input, don't trigger.
      // But if pressing Ctrl+S in input, DO trigger.
      const hasModifier = event.ctrlKey || event.metaKey || event.altKey;

      if (isInput && !hasModifier) {
        // Maybe let it pass if it's F-keys?
        // For now, strict check: if input and no modifier, ignore.
        return;
      }

      if (isPressed(actionId, event)) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        onTrigger(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    actionId,
    enabled,
    onTrigger,
    isPressed,
    preventDefault,
    stopPropagation,
  ]);

  // Return display string for UI
  return getShortcutParams(actionId);
}
