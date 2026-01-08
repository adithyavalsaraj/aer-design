import type { Align, Side } from "@/hooks/useAutoPosition";
import * as React from "react";

// --- Trigger Types ---

export type TriggerType = "click" | "hover" | "focus" | "manual";
export type TriggerMode = TriggerType | TriggerType[];

// --- Placement ---

export interface PopoverPlacement {
  side: Side;
  align: Align;
}

// --- usePopover Hook ---

export interface UsePopoverOptions {
  // State
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;

  // Triggers
  /** How the popover is triggered */
  trigger?: TriggerMode;

  // Interaction
  /** Close when clicking outside the popover */
  closeOnOutsideClick?: boolean;
  /** Close when pressing Escape key */
  closeOnEscape?: boolean;
  /** Close when scrolling */
  closeOnScroll?: boolean;
  /** Close when window is resized */
  closeOnResize?: boolean;
  /** Close when interacting inside the popover */
  closeOnInteractInside?: boolean;

  // Delays (for hover trigger)
  /** Delay in ms before opening on hover */
  openDelay?: number;
  /** Delay in ms before closing on hover */
  closeDelay?: number;

  // Positioning (passed to useAutoPosition)
  /** Preferred side to position the popover */
  side?: Side;
  /** Preferred alignment relative to the anchor */
  align?: Align;
  /** Distance in pixels from the anchor */
  sideOffset?: number;
  /** Offset in pixels for alignment */
  alignOffset?: number;
  /** Positioning strategy */
  strategy?: "absolute" | "fixed";
  /** Behavior when scrolling */
  scrollBehavior?: "close" | "reposition";
  /** Enable collision detection */
  avoidCollisions?: boolean;

  // Accessibility
  /** Disable the popover */
  disabled?: boolean;

  // Lifecycle
  /** Callback when popover opens */
  onOpen?: () => void;
  /** Callback when popover closes */
  onClose?: () => void;

  // Advanced
  /** Additional refs that should not trigger outside click */
  whitelistedRefs?: React.RefObject<HTMLElement>[];
}

export interface UsePopoverReturn {
  // State
  /** Current open state */
  open: boolean;

  // Imperative API
  /** Open the popover */
  openPopover: () => void;
  /** Close the popover */
  closePopover: () => void;
  /** Toggle the popover */
  togglePopover: () => void;

  // Refs
  /** Ref callback for the anchor element */
  anchorRef: React.RefCallback<Element>;
  /** Ref callback for the floating element */
  floatingRef: React.RefCallback<HTMLElement>;
  /** Ref for the arrow element */
  arrowRef: React.RefObject<HTMLDivElement | null>;

  // Positioning (from useAutoPosition)
  /** Computed styles for the floating element */
  floatingStyles: React.CSSProperties;
  /** Final placement after collision detection */
  placement: PopoverPlacement;
  /** Force update position */
  updatePosition: () => void;

  // Elements
  /** Reference to the anchor element */
  anchorElement: Element | null;
  /** Reference to the floating element */
  floatingElement: HTMLElement | null;

  // Props getters (for accessibility)
  /** Get props for the anchor element */
  getAnchorProps: () => Record<string, any>;
  /** Get props for the floating element */
  getFloatingProps: () => Record<string, any>;
}

// --- Popover Component ---

export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    UsePopoverOptions {
  /** The element that triggers the popover */
  children: React.ReactNode;

  /** The content to display in the popover */
  content?: React.ReactNode;

  // Styling
  /** Additional class name for the root container */
  className?: string;
  /** Additional class name for the content */
  contentClassName?: string;
  /** Additional class name for the arrow */
  arrowClassName?: string;
  /** Visual variant */
  variant?: "default" | "dark" | "light" | "aer";

  // Portal
  /** Render in a portal */
  portal?: boolean;
  /** Custom portal container */
  portalContainer?: HTMLElement;

  // Advanced
  /** Unmount content when closed */
  unmountOnClose?: boolean;
  /** Modal mode (prevents body scroll) */
  modal?: boolean;
  /** Show arrow indicator */
  arrow?: boolean;
}

// --- Compound Components ---

export interface PopoverTriggerProps extends React.HTMLAttributes<HTMLElement> {
  /** Render as a different element */
  asChild?: boolean;
  children: React.ReactNode;
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a different element */
  asChild?: boolean;
  children: React.ReactNode;
}

export interface PopoverArrowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Width of the arrow */
  width?: number;
  /** Height of the arrow */
  height?: number;
}

export interface PopoverCloseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Render as a different element */
  asChild?: boolean;
  children?: React.ReactNode;
}
