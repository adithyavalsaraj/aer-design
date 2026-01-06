import { createContext, useContext } from "react";

export interface DialogContextValue {
  onClose: () => void;
  isMaximized: boolean;
  isMinimized: boolean;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onRestore?: () => void;
  draggable?: boolean;
  maximizable?: boolean;
  minimizable?: boolean;
  showCloseButton?: boolean;
  handleMouseDown?: (e: React.MouseEvent) => void;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog");
  }
  return context;
}
