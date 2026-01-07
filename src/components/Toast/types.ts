import type { ReactNode } from "react";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "center-left"
  | "center"
  | "center-right";

export type ToastVariant =
  | "default"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "aer";

export interface ToastAction {
  label: string;
  onClick: () => void;
  altText?: string;
}

export interface ToastProps {
  /**
   * Direction for swipe-to-dismiss interaction.
   * @default "right"
   */
  swipeDirection?: "left" | "right" | "up" | "down" | "horizontal" | "vertical";
  /**
   * unique identifier for the toast
   */
  id?: string;
  /**
   * @default 0.95
   */
  transparency?: number;
  /**
   * The variation style of the toast
   * @default "default"
   */
  variant?: ToastVariant;
  /**
   * Main title of the toast
   */
  title?: ReactNode;
  /**
   * Description or body content
   */
  description?: ReactNode;
  /**
   * Action button configuration
   */
  action?: ToastAction;
  /**
   * Position of the toast on the screen
   * @default "top-right"
   */
  position?: ToastPosition;
  /**
   * Duration in milliseconds before auto-dismissing. Set to Infinity to disable.
   * @default 5000
   */
  duration?: number;
  /**
   * Custom X coordinate (overrides position)
   */
  x?: number | string;
  /**
   * Custom Y coordinate (overrides position)
   */
  y?: number | string;
  /**
   * Controlled open state (for standalone mode)
   */
  open?: boolean;
  /**
   * Callback for open state change (for standalone mode)
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Internal flag to indicate if rendered by container.
   */
  isRenderedByContainer?: boolean;
  /**
   * Whether to dismiss the toast when the component unmounts.
   * Set to false for "fire-and-forget" behavior where toast persists until duration ends.
   * @default true
   */
  dismissOnUnmount?: boolean;
  /**
   * Optional custom class name
   */
  className?: string;
}

export interface ToastState {
  toasts: ToastProps[];
}

export interface ToastContextType {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => string;
  dismiss: (id: string) => void;
}
