import { createContext, useContext } from "react";
import type { TabOrientation, TabVariant } from "./types";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: TabOrientation;
  variant: TabVariant;
  headless: boolean;
}

export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined
);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider");
  }
  return context;
};
