import * as React from "react";

export interface OverlayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  /** The content to display in the overlay */
  content: React.ReactNode;
  /** Optional trigger element. If provided, clicking it will toggle the overlay */
  children?: React.ReactElement;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Preferred side of the trigger to display the overlay */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment relative to the trigger */
  align?: "start" | "center" | "end";
  /** Distance in pixels from the trigger */
  sideOffset?: number;
  /** Offset along the alignment axis */
  alignOffset?: number;
  /** Positioning strategy */
  strategy?: "fixed" | "absolute";
  /** Visual variant */
  variant?: "default" | "aer";
  /** Show backdrop behind overlay */
  backdrop?: boolean;
  /** Custom className for backdrop */
  backdropClassName?: string;
  /** Close overlay when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Close overlay when pressing Escape */
  closeOnEscape?: boolean;
  /** Close overlay when scrolling */
  closeOnScroll?: boolean;
  /** Modal mode - traps focus and prevents body scroll */
  modal?: boolean;
  /** Disable the overlay */
  disabled?: boolean;
}
