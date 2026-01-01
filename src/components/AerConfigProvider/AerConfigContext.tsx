import { createContext, useContext } from "react";

export type Direction = "ltr" | "rtl";
export type Size = "sm" | "default" | "lg";

export interface AerConfigContextType {
  direction: Direction;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
  size: Size;
  setSize: (size: Size) => void;
}

export const AerConfigContext = createContext<AerConfigContextType | undefined>(
  undefined
);

export function useAerConfig() {
  const context = useContext(AerConfigContext);
  if (context === undefined) {
    throw new Error("useAerConfig must be used within a AerConfigProvider");
  }
  return context;
}
