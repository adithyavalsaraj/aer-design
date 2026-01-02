import * as React from "react";
import { type ShortcutContextValue } from "./types";

export const ShortcutContext = React.createContext<ShortcutContextValue | null>(
  null
);

export const useShortcutContext = () => {
  const context = React.useContext(ShortcutContext);
  if (!context) {
    throw new Error(
      "useShortcutContext must be used within a ShortcutProvider"
    );
  }
  return context;
};
