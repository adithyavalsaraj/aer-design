import * as React from "react";
import { type MenuContextValue } from "./types";

export const MenuContext = React.createContext<MenuContextValue | undefined>(
  undefined
);

export function useMenu() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a Menu provider");
  }
  return context;
}
