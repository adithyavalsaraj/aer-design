import * as React from "react";
import type { UsePopoverReturn } from "./types";

export interface PopoverContextValue extends UsePopoverReturn {
  variant?: "default" | "dark" | "light" | "aer";
  arrow?: boolean;
  zIndex: number;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

// Z-index context for nesting
const ZIndexContext = React.createContext<number>(1000);

export const PopoverProvider = PopoverContext.Provider;

export function usePopoverContext(): PopoverContextValue {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error(
      "Popover compound components must be used within a Popover component"
    );
  }
  return context;
}

export function usePopoverZIndex(): number {
  return React.useContext(ZIndexContext);
}

export const ZIndexProvider = ZIndexContext.Provider;
