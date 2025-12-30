import React, { createContext, useContext, useEffect, useState } from "react";

type Direction = "ltr" | "rtl";

interface DirectionContextType {
  direction: Direction;
  toggleDirection: () => void;
  setDirection: (dir: Direction) => void;
}

const DirectionContext = createContext<DirectionContextType | undefined>(
  undefined
);

interface DirectionProviderProps {
  children: React.ReactNode;
  disablePersistence?: boolean;
  defaultDirection?: Direction;
}

export function DirectionProvider({
  children,
  disablePersistence = false,
  defaultDirection = "ltr",
}: DirectionProviderProps) {
  const [direction, setDirectionState] = useState<Direction>(() => {
    if (disablePersistence) {
      return defaultDirection;
    }
    // Check localStorage or default to 'ltr'
    const saved = localStorage.getItem("aer-direction");
    return (saved as Direction) || "ltr";
  });

  useEffect(() => {
    if (disablePersistence) return;

    document.documentElement.setAttribute("dir", direction);
    localStorage.setItem("aer-direction", direction);
  }, [direction, disablePersistence]);

  const toggleDirection = () => {
    setDirectionState((prev) => (prev === "ltr" ? "rtl" : "ltr"));
  };

  const setDirection = (dir: Direction) => {
    setDirectionState(dir);
  };

  return (
    <DirectionContext.Provider
      value={{ direction, toggleDirection, setDirection }}
    >
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
