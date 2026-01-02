import * as React from "react";
import { ShortcutContext } from "./ShortcutContext";
import {
  type KeyCombination,
  type ShortcutAction,
  type ShortcutState,
} from "./types";
import { formatShortcut, matchShortcut } from "./utils";

const STORAGE_KEY = "aer-shortcuts";

export const ShortcutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Store user-defined overrides
  const [overrides, setOverrides] = React.useState<ShortcutState>({});

  // Store registered actions (defaults)
  const registry = React.useRef<Record<string, ShortcutAction>>({});

  // Memoized effective shortcuts map for Context consumers
  // This is derived from registry + overrides
  // However, since registry is a Ref (to avoid re-renders on register),
  // we need a way to force update consumers when registry changes?
  // Actually, 'registerAction' is usually called once.
  // We can use a state for 'registryVersion' to force updates if needed,
  // or just store registry in state. Storing in state might cause cascades.
  // Let's store registry in Ref, but use a state 'shortcuts' that acts as the source of truth for consumers.
  // When registerAction is called, we update 'shortcuts' if it's new.

  const [shortcuts, setShortcuts] = React.useState<ShortcutState>({});

  // Load overrides from local storage on mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setOverrides(parsed);
      }
    } catch (e) {
      console.warn("Failed to load shortcuts from localStorage", e);
    }
  }, []);

  // Sync effective shortcuts whenever overrides change
  React.useEffect(() => {
    setShortcuts((prev) => {
      const next = { ...prev };
      // Apply overrides
      Object.entries(overrides).forEach(([id, keys]) => {
        next[id] = keys;
      });
      return next;
    });
  }, [overrides]);

  const registerAction = React.useCallback(
    (action: ShortcutAction) => {
      if (registry.current[action.id]) return; // Already registered

      registry.current[action.id] = action;

      // Update effective shortcuts
      setShortcuts((prev) => {
        // If there's an override, it takes precedence (handled by overrides effect usually,
        // but here we are adding a NEW default)
        // If override exists for this ID, use it. Else use default.
        if (overrides[action.id]) return prev; // Override already in place

        return {
          ...prev,
          [action.id]: action.defaultKeys,
        };
      });
    },
    [overrides]
  );

  const updateShortcut = React.useCallback(
    (actionId: string, keys: KeyCombination) => {
      setOverrides((prev) => {
        const next = { ...prev, [actionId]: keys };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const resetShortcut = React.useCallback((actionId: string) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[actionId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });

    // Restore default
    const defaultAction = registry.current[actionId];
    if (defaultAction) {
      setShortcuts((prev) => ({
        ...prev,
        [actionId]: defaultAction.defaultKeys,
      }));
    }
  }, []);

  const isPressed = React.useCallback(
    (actionId: string, event: KeyboardEvent) => {
      const keys = shortcuts[actionId];
      // If not registered yet, we can't match logic.
      // But usually isPressed is called inside components that registered it.
      // Fallback: Check overrides directly? No, rely on effective state.
      if (!keys) return false;
      return matchShortcut(event, keys);
    },
    [shortcuts]
  );

  const getShortcutParams = React.useCallback(
    (actionId: string) => {
      const keys = shortcuts[actionId];
      return formatShortcut(keys || []);
    },
    [shortcuts]
  );

  return (
    <ShortcutContext.Provider
      value={{
        shortcuts,
        registerAction,
        updateShortcut,
        resetShortcut,
        isPressed,
        getShortcutParams,
      }}
    >
      {children}
    </ShortcutContext.Provider>
  );
};
