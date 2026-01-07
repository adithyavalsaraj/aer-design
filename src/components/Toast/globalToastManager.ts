import { ensureGlobalToastContainer } from "./mountGlobal.tsx";
import type { ToastProps } from "./types.ts";

type ToastListener = (toasts: ToastProps[]) => void;

class GlobalToastManager {
  private toasts: ToastProps[] = [];
  private listeners: Set<ToastListener> = new Set();
  private idCounter = 0;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  getToasts() {
    return this.toasts;
  }

  add(toast: ToastProps) {
    if (this.listeners.size === 0) {
      ensureGlobalToastContainer();
    }

    const id = toast.id || `toast-${++this.idCounter}-${Date.now()}`;
    const newToast: ToastProps = { ...toast, id };

    const existingIndex = this.toasts.findIndex((t) => t.id === id);
    if (existingIndex > -1) {
      // Update existing
      this.toasts = [
        ...this.toasts.slice(0, existingIndex),
        newToast,
        ...this.toasts.slice(existingIndex + 1),
      ];
    } else {
      // Add new
      this.toasts = [...this.toasts, newToast];
    }

    this.notify();

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }
}

export const globalToastManager = new GlobalToastManager();
