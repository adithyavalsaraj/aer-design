export type KeyCombination = string[];

export interface ShortcutAction {
  id: string;
  label: string;
  defaultKeys: KeyCombination;
  description?: string;
}

export interface ShortcutState {
  [actionId: string]: KeyCombination;
}

export interface ShortcutContextValue {
  shortcuts: ShortcutState;
  registerAction: (action: ShortcutAction) => void;
  updateShortcut: (actionId: string, keys: KeyCombination) => void;
  resetShortcut: (actionId: string) => void;
  isPressed: (actionId: string, event: KeyboardEvent) => boolean;
  getShortcutParams: (actionId: string) => string; // Returns standardized string for display e.g. "⌘K"
}
