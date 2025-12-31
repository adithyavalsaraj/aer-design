import React, { createContext, useContext, useEffect, useState } from "react";

export type Direction = "ltr" | "rtl";
export type Size = "sm" | "default" | "lg";

interface AerConfigContextType {
  direction: Direction;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
  size: Size;
  setSize: (size: Size) => void;
}

const AerConfigContext = createContext<AerConfigContextType | undefined>(
  undefined
);

export interface AerConfigProviderProps {
  children: React.ReactNode;
  disablePersistence?: boolean;
  defaultDirection?: Direction;
  defaultSize?: Size;
}

export function AerConfigProvider({
  children,
  disablePersistence = false,
  defaultDirection = "ltr",
  defaultSize = "default",
}: AerConfigProviderProps) {
  // Direction State
  const [direction, setDirectionState] = useState<Direction>(() => {
    if (disablePersistence) {
      return defaultDirection;
    }
    const saved = localStorage.getItem("aer-direction");
    return (saved as Direction) || defaultDirection;
  });

  // Size State
  const [size, setSizeState] = useState<Size>(() => {
    if (disablePersistence) {
      return defaultSize;
    }
    const saved = localStorage.getItem("aer-size");
    return (saved as Size) || defaultSize;
  });

  // Persistence Effects
  useEffect(() => {
    if (disablePersistence) return;
    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("aer-direction", direction);
  }, [direction, disablePersistence]);

  useEffect(() => {
    if (disablePersistence) return;
    localStorage.setItem("aer-size", size);
  }, [size, disablePersistence]);

  // Actions
  const toggleDirection = () => {
    setDirectionState((prev) => (prev === "ltr" ? "rtl" : "ltr"));
  };

  const setDirection = (dir: Direction) => {
    setDirectionState(dir);
  };

  const setSize = (s: Size) => {
    setSizeState(s);
  };

  return (
    <AerConfigContext.Provider
      value={{
        direction,
        toggleDirection,
        setDirection,
        size,
        setSize,
      }}
    >
      {children}
    </AerConfigContext.Provider>
  );
}

export function useAerConfig() {
  const context = useContext(AerConfigContext);
  if (context === undefined) {
    throw new Error("useAerConfig must be used within a AerConfigProvider");
  }
  return context;
}
