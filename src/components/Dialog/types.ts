export type DialogPosition =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full" | "auto";

export type DialogVariant = "default" | "alert" | "confirm" | "aer";

export type BackdropBlur = "none" | "sm" | "md" | "lg";

export type FooterAlign = "left" | "center" | "right" | "space-between";

export type ContentPadding = "none" | "sm" | "md" | "lg";

export interface DialogProps {
  // Core
  isOpen: boolean;
  onClose: () => void;

  // Positioning (mutually exclusive with x,y)
  position?: DialogPosition;
  x?: number; // Custom x position (pixels from left)
  y?: number; // Custom y position (pixels from top)

  // Size
  size?: DialogSize;
  width?: string | number; // Custom width
  height?: string | number; // Custom height

  // Variants
  variant?: DialogVariant;

  // Close mechanisms
  showCloseButton?: boolean; // Default: true
  closeOnEscape?: boolean; // Default: true
  closeOnBackdropClick?: boolean; // Default: true

  // Backdrop
  showBackdrop?: boolean; // Default: true
  backdropBlur?: BackdropBlur; // Default: 'md'
  backdropClassName?: string;

  // Advanced features
  draggable?: boolean; // Default: false
  resizable?: boolean; // Default: false
  maximizable?: boolean; // Default: false - Show maximize button
  minimizable?: boolean; // Default: false - Show minimize button
  defaultMaximized?: boolean; // Default: false - Start maximized
  defaultMinimized?: boolean; // Default: false - Start minimized
  headless?: boolean; // Default: false

  // Templates
  header?: React.ReactNode;
  children: React.ReactNode; // Content
  footer?: React.ReactNode;

  // Constraints (for draggable/resizable)
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;

  // Styling
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  style?: React.CSSProperties;

  // Animation
  animationDuration?: number; // Default: 200ms

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;

  // Callbacks
  onOpen?: () => void;
  onAfterClose?: () => void;
  onDragStart?: () => void;
  onDragEnd?: (position: { x: number; y: number }) => void;
  onResizeStart?: () => void;
  onResizeEnd?: (size: { width: number; height: number }) => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onRestore?: () => void; // When returning from maximized/minimized state
}

export interface DialogHeaderProps {
  title?: string;
  icon?: React.ReactNode;
  showCloseButton?: boolean;
  showMaximizeButton?: boolean;
  showMinimizeButton?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
  onClose?: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onRestore?: () => void;
  className?: string;
  titleClassName?: string;
  closeButtonClassName?: string;
  controlButtonsClassName?: string;
  children?: React.ReactNode; // For custom header content
}

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  scrollable?: boolean; // Default: true
  padding?: ContentPadding; // Default: 'md'
}

export interface DialogFooterProps {
  children?: React.ReactNode;
  className?: string;
  align?: FooterAlign; // Default: 'right'

  // Default actions
  defaultActions?: {
    showCancel?: boolean; // Default: true
    showConfirm?: boolean; // Default: true
    cancelText?: string; // Default: 'Cancel'
    confirmText?: string; // Default: 'Confirm'
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmVariant?: "primary" | "destructive"; // Default: 'primary'
    confirmLoading?: boolean;
    cancelDisabled?: boolean;
    confirmDisabled?: boolean;
  };
}

export interface DialogState {
  isMaximized: boolean;
  isMinimized: boolean;
  position: { x: number; y: number } | null;
  size: { width: number; height: number } | null;
}
