import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import { ToastContainer } from "./ToastContainer.tsx";
import type { ToastContextType, ToastProps, ToastState } from "./types.ts";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type Action =
  | { type: "ADD_TOAST"; payload: ToastProps }
  | { type: "DISMISS_TOAST"; payload: string }
  | { type: "REMOVE_TOAST"; payload: string };

const toastReducer = (state: ToastState, action: Action): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };
    case "DISMISS_TOAST":
      // In a real implementation we might trigger an exit animation here
      // For now, we will just filter it out or mark it as closing if we had animation state
      // Simplest zero-dep approach: Filter it out immediately,
      // OR better: The "dismiss" method usually triggers the `open=false` transition
      // But since we are managing state array, let's remove it.
      // Wait, to animate out, the Toast component needs to know it's closing.
      // So "dismiss" should probably set a flag, and then "remove" deletes it.
      // For simplicity in this step, let's remove.
      // Actually, for animation, it is better if the component handles its own "open" state
      // derived from existence, or we pass an "open" prop.
      // Let's stick to simple adding/removal for the Context,
      // and let the ToastContainer handle the mapping.
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const toast = useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastProps = { ...props, id };
    dispatch({ type: "ADD_TOAST", payload: newToast });
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "DISMISS_TOAST", payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={state.toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
