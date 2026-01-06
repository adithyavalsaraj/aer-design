import { useCallback, useEffect, useState } from "react";
import type { DialogState } from "./types";

interface UseDialogOptions {
  isOpen: boolean;
  closeOnEscape?: boolean;
  defaultMaximized?: boolean;
  defaultMinimized?: boolean;
  onClose: () => void;
  onOpen?: () => void;
  onAfterClose?: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onRestore?: () => void;
}

interface UseDialogReturn {
  dialogState: DialogState;
  maximize: () => void;
  minimize: () => void;
  restore: () => void;
  toggleMaximize: () => void;
  toggleMinimize: () => void;
}

export const useDialog = ({
  isOpen,
  closeOnEscape = true,
  defaultMaximized = false,
  defaultMinimized = false,
  onClose,
  onOpen,
  onAfterClose,
  onMaximize,
  onMinimize,
  onRestore,
}: UseDialogOptions): UseDialogReturn => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isMaximized: defaultMaximized,
    isMinimized: defaultMinimized,
    position: null,
    size: null,
  });

  // Handle open/close lifecycle
  useEffect(() => {
    if (isOpen) {
      onOpen?.();
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "";
      onAfterClose?.();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onOpen, onAfterClose]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  // Unlock body scroll when minimized to allow page interaction
  useEffect(() => {
    if (isOpen && dialogState.isMinimized) {
      document.body.style.overflow = "";
    } else if (isOpen && !dialogState.isMinimized) {
      document.body.style.overflow = "hidden";
    }
  }, [isOpen, dialogState.isMinimized]);

  const maximize = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isMaximized: true,
      isMinimized: false,
    }));
    onMaximize?.();
  }, [onMaximize]);

  const minimize = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isMaximized: false,
      isMinimized: true,
    }));
    onMinimize?.();
  }, [onMinimize]);

  const restore = useCallback(() => {
    setDialogState((prev) => ({
      ...prev,
      isMaximized: false,
      isMinimized: false,
    }));
    onRestore?.();
  }, [onRestore]);

  const toggleMaximize = useCallback(() => {
    if (dialogState.isMaximized) {
      restore();
    } else {
      maximize();
    }
  }, [dialogState.isMaximized, maximize, restore]);

  const toggleMinimize = useCallback(() => {
    if (dialogState.isMinimized) {
      restore();
    } else {
      minimize();
    }
  }, [dialogState.isMinimized, minimize, restore]);

  return {
    dialogState,
    maximize,
    minimize,
    restore,
    toggleMaximize,
    toggleMinimize,
  };
};
