import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useContrastColor } from "../../hooks/useContrastColor";
import { cn } from "../../lib/utils";
import { useAerConfig } from "../AerConfigProvider";
import { DialogContent } from "./DialogContent";
import { DialogContext } from "./DialogContext";
import { DialogFooter } from "./DialogFooter";
import { DialogHeader } from "./DialogHeader";
import type { DialogProps } from "./types";
import { useDialog } from "./useDialog";
import { useDraggable } from "./useDraggable";
import { useResizable } from "./useResizable";

export const Dialog = ({
  isOpen,
  onClose,
  position = "center",
  x,
  y,
  size = "md",
  width,
  height,
  variant = "default",
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  showBackdrop = true,
  backdropBlur = "md",
  backdropClassName,
  draggable = false,
  resizable = false,
  maximizable = false,
  minimizable = false,
  defaultMaximized = false,
  defaultMinimized = false,
  headless = false,
  children,
  minWidth = 200,
  minHeight = 100,
  maxWidth,
  maxHeight,
  className,
  overlayClassName,
  animationDuration = 200,
  ariaLabel,
  ariaDescribedBy,
  style,
  onOpen,
  onAfterClose,
  onDragStart,
  onDragEnd,
  onResizeStart,
  onResizeEnd,
  onMaximize,
  onMinimize,
  onRestore,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const savedPositionBeforeMinMax = useRef<{ x: number; y: number } | null>(
    null
  );
  // Use timestamp as unique instance ID for z-index stacking
  const instanceId = useRef(Date.now());

  // Validate positioning
  useEffect(() => {
    if ((x !== undefined || y !== undefined) && position !== "center") {
      console.error(
        "Dialog: Cannot use both preset position and custom x,y coordinates. Custom coordinates will be ignored."
      );
    }
  }, [x, y, position]);

  // Dialog state management
  const { dialogState, restore, toggleMaximize, toggleMinimize } = useDialog({
    isOpen,
    closeOnEscape,
    defaultMaximized,
    defaultMinimized,
    onClose,
    onOpen,
    onAfterClose,
    onMaximize,
    onMinimize,
    onRestore,
  });

  // Draggable functionality
  const {
    position: dragPosition,
    isDragging,
    handleMouseDown,
    setPosition,
  } = useDraggable({
    enabled:
      draggable &&
      !dialogState.isMaximized &&
      !dialogState.isMinimized &&
      !headless,
    onDragStart,
    onDragEnd,
    initialPosition: { x: 0, y: 0 },
  });

  // Save position before minimizing/maximizing and restore on restore
  const prevMinimized = React.useRef(dialogState.isMinimized);
  const prevMaximized = React.useRef(dialogState.isMaximized);

  React.useEffect(() => {
    // Save position before minimizing or maximizing
    if (!prevMinimized.current && dialogState.isMinimized) {
      // About to minimize - save current position
      savedPositionBeforeMinMax.current = { ...dragPosition };
    } else if (!prevMaximized.current && dialogState.isMaximized) {
      // About to maximize - save current position
      savedPositionBeforeMinMax.current = { ...dragPosition };
    } else if (
      (prevMinimized.current || prevMaximized.current) &&
      !dialogState.isMinimized &&
      !dialogState.isMaximized
    ) {
      // Restoring from minimized or maximized - restore saved position
      if (savedPositionBeforeMinMax.current) {
        setPosition(savedPositionBeforeMinMax.current);
        savedPositionBeforeMinMax.current = null;
      }
    }

    prevMinimized.current = dialogState.isMinimized;
    prevMaximized.current = dialogState.isMaximized;
  }, [
    dialogState.isMinimized,
    dialogState.isMaximized,
    dragPosition,
    setPosition,
  ]);

  // Auto Contrast Logic
  const { autoContrast } = useAerConfig();
  const contrastColor = useContrastColor(style?.backgroundColor as string);

  const finalStyle = { ...style };
  if (autoContrast && style?.backgroundColor) {
    finalStyle.color = contrastColor;
  }

  // Resizable functionality
  const { size: resizeSize, resizeHandleProps } = useResizable({
    enabled: resizable && !dialogState.isMaximized,
    minWidth,
    minHeight,
    maxWidth:
      maxWidth ||
      (typeof window !== "undefined" ? window.innerWidth * 0.95 : undefined),
    maxHeight:
      maxHeight ||
      (typeof window !== "undefined" ? window.innerHeight * 0.95 : undefined),
    onResizeStart,
    onResizeEnd,
    ref: dialogRef,
  });

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Size classes
  const sizeClasses = {
    sm: "w-[320px]",
    md: "w-[540px]",
    lg: "w-[800px]",
    xl: "w-[1100px]",
    full: "w-screen h-screen max-w-none",
    auto: "w-auto",
  };

  // Position classes
  const positionClasses = {
    center: "items-center justify-center",
    top: "items-start justify-center pt-20",
    bottom: "items-end justify-center pb-20",
    left: "items-center justify-start pl-20",
    right: "items-center justify-end pr-20",
    "top-left": "items-start justify-start p-20",
    "top-right": "items-start justify-end p-20",
    "bottom-left": "items-end justify-start p-20",
    "bottom-right": "items-end justify-end p-20",
  };

  // Variant classes
  const variantClasses = {
    default: "bg-aer-background border border-aer-border",
    alert: "bg-aer-background border-2 border-yellow-500",
    confirm: "bg-aer-background border-2 border-aer-primary",
    aer: "bg-aer-background/80 backdrop-blur-xl border border-white/20 shadow-2xl",
  };

  // Backdrop blur classes
  const backdropBlurClasses = {
    none: "",
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  };

  // Calculate dialog styles
  const getDialogStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    // Maximized state
    if (dialogState.isMaximized) {
      return {
        width: "100vw",
        height: "100vh",
        maxWidth: "none",
        transform: "none",
      };
    }

    // Minimized state
    if (dialogState.isMinimized) {
      return {
        height: "auto",
        maxHeight: "60px",
        overflow: "hidden",
      };
    }

    // Custom size
    if (resizeSize) {
      styles.width = resizeSize.width;
      styles.height = resizeSize.height;
    } else {
      if (width) styles.width = width;
      if (height) styles.height = height;
    }

    // Custom position or dragged position
    if (draggable && (dragPosition.x !== 0 || dragPosition.y !== 0)) {
      styles.position = "fixed";
      styles.left = dragPosition.x;
      styles.top = dragPosition.y;
      styles.transform = "none";
      styles.margin = 0;
    } else if (x !== undefined && y !== undefined && position === "center") {
      styles.position = "fixed";
      styles.left = x;
      styles.top = y;
      styles.transform = "none";
      styles.margin = 0;
    }

    return styles;
  };

  const dialogContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 flex",
        dialogState.isMinimized
          ? "items-end justify-start p-4 pointer-events-none"
          : !dialogState.isMaximized && positionClasses[position],
        overlayClassName
      )}
      style={{
        animation: `fadeIn ${animationDuration}ms ease-out`,
        ...(dialogState.isMinimized && {
          zIndex: 50 + (instanceId.current % 100),
        }),
      }}
    >
      {/* Backdrop - hidden when minimized */}
      {showBackdrop && !dialogState.isMinimized && (
        <div
          className={cn(
            "absolute inset-0 bg-black/50",
            backdropBlurClasses[backdropBlur],
            backdropClassName
          )}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "relative z-10 flex flex-col max-h-[90vh] max-w-[95vw] overflow-hidden",
          !dialogState.isMaximized && !headless && "rounded-lg shadow-xl",
          !dialogState.isMaximized &&
            !dialogState.isMinimized &&
            sizeClasses[size],
          dialogState.isMinimized && "w-64 pointer-events-auto",
          !headless && variantClasses[variant],
          headless
            ? className
            : dialogState.isMinimized
            ? className
            : cn(className),
          isDragging && "cursor-move",
          dialogState.isMaximized && "rounded-none max-h-none max-w-none"
        )}
        style={{
          ...getDialogStyles(),
          ...finalStyle,
          animation: `scaleIn ${animationDuration}ms ease-out`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Render children directly when not minimized */}
        <DialogContext.Provider
          value={{
            onClose,
            isMaximized: dialogState.isMaximized,
            isMinimized: dialogState.isMinimized,
            onMaximize: toggleMaximize,
            onMinimize: toggleMinimize,
            onRestore: restore,
            draggable,
            maximizable,
            minimizable,
            showCloseButton,
            handleMouseDown:
              draggable && (!dialogState.isMaximized || dialogState.isMinimized)
                ? handleMouseDown
                : undefined,
          }}
        >
          {dialogState.isMinimized
            ? // When minimized, only show the header (children should include DialogHeader)
              React.Children.toArray(children).find(
                (child) =>
                  React.isValidElement(child) && child.type === DialogHeader
              )
            : children}
        </DialogContext.Provider>

        {/* Resize Handles */}
        {resizable && !dialogState.isMaximized && !dialogState.isMinimized && (
          <>
            {/* Corner handles */}
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
              onMouseDown={resizeHandleProps.onMouseDown("nw")}
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
              onMouseDown={resizeHandleProps.onMouseDown("ne")}
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
              onMouseDown={resizeHandleProps.onMouseDown("sw")}
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
              onMouseDown={resizeHandleProps.onMouseDown("se")}
            />

            {/* Edge handles */}
            <div
              className="absolute top-0 left-4 right-4 h-1 cursor-n-resize"
              onMouseDown={resizeHandleProps.onMouseDown("n")}
            />
            <div
              className="absolute bottom-0 left-4 right-4 h-1 cursor-s-resize"
              onMouseDown={resizeHandleProps.onMouseDown("s")}
            />
            <div
              className="absolute left-0 top-4 bottom-4 w-1 cursor-w-resize"
              onMouseDown={resizeHandleProps.onMouseDown("w")}
            />
            <div
              className="absolute right-0 top-4 bottom-4 w-1 cursor-e-resize"
              onMouseDown={resizeHandleProps.onMouseDown("e")}
            />
          </>
        )}
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

// Re-export sub-components
Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
