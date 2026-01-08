import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { globalToastManager } from "./globalToastManager.ts";
import { ToastContainer } from "./ToastContainer.tsx";
import type { ToastProps } from "./types.ts";

export const GlobalToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastProps[]>(() =>
    globalToastManager.getToasts()
  );

  useEffect(() => {
    // Subscribe to global toast manager
    const unsubscribe = globalToastManager.subscribe(setToasts);
    return () => unsubscribe();
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <ToastContainer
      toasts={toasts}
      onDismiss={(id) => globalToastManager.dismiss(id)}
    />,
    document.body
  );
};
