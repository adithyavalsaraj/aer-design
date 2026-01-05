import React, { useEffect, useState } from "react";
import {
  AerConfigContext,
  type Direction,
  type Size,
} from "./AerConfigContext";

export interface AerConfigProviderProps {
  children: React.ReactNode;
  disablePersistence?: boolean;
  defaultDirection?: Direction;
  defaultSize?: Size;
  defaultAutoContrast?: boolean;
}

export function AerConfigProvider({
  children,
  disablePersistence = false,
  defaultDirection = "ltr",
  defaultSize = "default",
  defaultAutoContrast = false,
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

  // Auto Contrast State
  const [autoContrast, setAutoContrastState] = useState<boolean>(() => {
    if (disablePersistence) {
      return defaultAutoContrast;
    }
    const saved = localStorage.getItem("aer-auto-contrast");
    return saved === "true" || defaultAutoContrast;
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

  useEffect(() => {
    if (disablePersistence) return;
    localStorage.setItem("aer-auto-contrast", String(autoContrast));
  }, [autoContrast, disablePersistence]);

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

  const setAutoContrast = (enabled: boolean) => {
    setAutoContrastState(enabled);
  };

  const toggleAutoContrast = () => {
    setAutoContrastState((prev) => !prev);
  };

  return (
    <AerConfigContext.Provider
      value={{
        direction,
        toggleDirection,
        setDirection,
        size,
        setSize,
        autoContrast,
        setAutoContrast,
        toggleAutoContrast,
      }}
    >
      {children}
    </AerConfigContext.Provider>
  );
}
