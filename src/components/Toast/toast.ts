import { globalToastManager } from "./globalToastManager.ts";
import type { ToastProps } from "./types.ts";

export const toast = (props: ToastProps) => {
  return globalToastManager.add(props);
};

// Add convenience methods
toast.success = (title: string, description?: string) => {
  return toast({ variant: "success", title, description });
};

toast.error = (title: string, description?: string) => {
  return toast({ variant: "error", title, description });
};

toast.warning = (title: string, description?: string) => {
  return toast({ variant: "warning", title, description });
};

toast.info = (title: string, description?: string) => {
  return toast({ variant: "info", title, description });
};

toast.neutral = (title: string, description?: string) => {
  return toast({ variant: "neutral", title, description });
};

toast.dismiss = (id: string) => {
  globalToastManager.dismiss(id);
};
