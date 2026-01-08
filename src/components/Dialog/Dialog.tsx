import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useContrastColor } from "../../hooks/useContrastColor";
import { cn } from "../../lib/utils";
import { useAerConfig } from "../AerConfigProvider";
import { DialogContent } from "./DialogContent";
import { DialogContext } from "./DialogContext";
import { DialogFooter } from "./DialogFooter";
import { DialogHeader } from "./DialogHeader";
import { dialogStackingManager } from "./dialogStackingManager";
import type { DialogProps } from "./types";
import { useDialog } from "./useDialog";
import { useDraggable } from "./useDraggable";
import { useResizable } from "./useResizable";

let dialogCounter = 0;

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
  title,
  icon,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const savedPositionBeforeMinMax = useRef<{ x: number; y: number } | null>(
    null
  );
  // Use a global counter for unique instance ID to prevent collisions during rapid creation
  const instanceId = useRef<string>(null!);
  if (!instanceId.current) {
    instanceId.current = `dialog-${++dialogCounter}`;
  }
  const instanceIdStr = instanceId.current;

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
      // Restoring from minimized or maximized to NORMAL state - restore saved position
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

  // Sync initial position from props with viewport safety
  React.useEffect(() => {
    if (isOpen && x !== undefined && y !== undefined) {
      const winWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
      const winHeight =
        typeof window !== "undefined" ? window.innerHeight : 800;

      // Get actual dialog dimensions if available
      let dialogWidth = 400; // Default estimate
      let dialogHeight = 300; // Default estimate

      if (dialogRef.current) {
        const rect = dialogRef.current.getBoundingClientRect();
        if (rect.width > 0) dialogWidth = rect.width;
        if (rect.height > 0) dialogHeight = rect.height;
      }

      // Ensure all four sides stay within the viewport with a 20px margin
      const maxX = Math.max(0, winWidth - dialogWidth - 20);
      const maxY = Math.max(0, winHeight - dialogHeight - 20);

      const safeX = Math.max(20, Math.min(Number(x), maxX));
      const safeY = Math.max(20, Math.min(Number(y), maxY));

      setPosition({ x: safeX, y: safeY });
    }
  }, [isOpen, x, y, setPosition]);

  // Stacking Logic
  const [minimizedIndex, setMinimizedIndex] = React.useState(() => {
    const idx = dialogStackingManager.getMinimizedIndex(instanceIdStr);
    return idx;
  });
  const [zIndex, setZIndex] = React.useState(() => {
    const z = dialogStackingManager.getZIndex(instanceIdStr);
    return z === -1 ? 50 : z;
  });

  const [stackingMode, setStackingModeState] = React.useState(
    dialogStackingManager.getStackingMode()
  );

  React.useEffect(() => {
    const handleStackUpdate = () => {
      setStackingModeState(dialogStackingManager.getStackingMode());
    };
    return dialogStackingManager.subscribe(handleStackUpdate);
  }, []);

  // Sync metadata for taskbar
  React.useEffect(() => {
    dialogStackingManager.updateMetadata(instanceIdStr, {
      title,
      icon,
      onRestore: () => restore(),
    });
  }, [instanceIdStr, title, icon, restore]);

  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (isOpen && !dialogState.isMaximized && !dialogState.isMinimized) {
        if (!dialogRef.current) return;

        const rect = dialogRef.current.getBoundingClientRect();
        const dialogWidth = rect.width;
        const dialogHeight = rect.height;

        // Determine if we are currently using fixed dragPosition or CSS centering
        const isUsingDragPos = dragPosition.x !== 0 || dragPosition.y !== 0;

        // Calculate limits for the top-left corner
        const maxX = Math.max(20, window.innerWidth - dialogWidth - 20);
        const maxY = Math.max(20, window.innerHeight - dialogHeight - 20);

        if (isUsingDragPos) {
          // Case 1: Already using fixed positioning. Clamp it.
          const safeX = Math.max(20, Math.min(dragPosition.x, maxX));
          const safeY = Math.max(20, Math.min(dragPosition.y, maxY));

          if (safeX !== dragPosition.x || safeY !== dragPosition.y) {
            setPosition({ x: safeX, y: safeY });
          }
        } else {
          // Case 2: Centered via CSS (0,0). Rescue only if it actually hits an edge.
          const isOffLeft = rect.left < 20;
          const isOffTop = rect.top < 20;
          const isOffRight = rect.right > window.innerWidth - 20;
          const isOffBottom = rect.bottom > window.innerHeight - 20;

          if (isOffLeft || isOffTop || isOffRight || isOffBottom) {
            const rescueX = Math.max(20, Math.min(rect.left, maxX));
            const rescueY = Math.max(20, Math.min(rect.top, maxY));
            setPosition({ x: rescueX, y: rescueY });
          }
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    isOpen,
    dialogState.isMaximized,
    dialogState.isMinimized,
    dragPosition,
    setPosition,
  ]);

  // Bring to front on interaction or maximize
  const bringToFront = () => {
    dialogStackingManager.bringToFront(instanceIdStr);
  };

  // Handle overall lifecycle registration
  React.useEffect(() => {
    if (isOpen) {
      dialogStackingManager.bringToFront(instanceIdStr);
    }
    return () => {
      dialogStackingManager.remove(instanceIdStr);
    };
  }, [isOpen, instanceIdStr]);

  // Handle maximized elevation
  React.useEffect(() => {
    if (dialogState.isMaximized) {
      dialogStackingManager.bringToFront(instanceIdStr);
    }
  }, [dialogState.isMaximized, instanceIdStr]);

  // Handle minimized registration
  React.useEffect(() => {
    if (dialogState.isMinimized) {
      dialogStackingManager.addMinimized(instanceIdStr);
    } else {
      dialogStackingManager.removeMinimized(instanceIdStr);
      // Ensure dialog is brought to the front when restored from minimized state
      dialogStackingManager.bringToFront(instanceIdStr);
    }
  }, [dialogState.isMinimized, instanceIdStr]);

  // Stacking Subscription
  React.useEffect(() => {
    const handleUpdate = () => {
      const idx = dialogStackingManager.getMinimizedIndex(instanceIdStr);
      const z = dialogStackingManager.getZIndex(instanceIdStr);
      setMinimizedIndex(idx);
      setZIndex(z);
    };

    const unsubscribe = dialogStackingManager.subscribe(handleUpdate);
    handleUpdate();

    return () => {
      unsubscribe();
    };
  }, [instanceIdStr]);

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

    // Minimized state ALWAYS takes precedence for visual rendering
    if (dialogState.isMinimized) {
      if (stackingMode === "scroll") {
        return { display: "none" };
      }

      // Calculate wrapping
      const gap = 20;
      const width = 240;
      const totalWidth = width + gap;
      const maxPerRow = Math.max(
        1,
        Math.floor((windowWidth - 40) / totalWidth)
      );

      const row = Math.floor(minimizedIndex / maxPerRow);
      const col = minimizedIndex % maxPerRow;

      const bottomOffset = 20 + row * 70;
      const leftOffset = 20 + col * totalWidth;

      return {
        height: "auto",
        maxHeight: "60px",
        overflow: "hidden",
        width: `${width}px`,
        left: minimizedIndex >= 0 ? `${leftOffset}px` : "20px",
        bottom: `${bottomOffset}px`,
        position: "fixed",
        margin: 0,
      };
    }

    // Maximized state (only if not minimized)
    if (dialogState.isMaximized) {
      return {
        width: "100vw",
        height: "100vh",
        maxWidth: "none",
        transform: "none",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
      };
    }

    // Custom size (from resizing)
    if (resizeSize) {
      styles.width = resizeSize.width;
      styles.height = resizeSize.height;
    } else {
      if (width) styles.width = width;
      if (height) styles.height = height;
    }

    // Custom position or dragged position
    if (dragPosition.x !== 0 || dragPosition.y !== 0) {
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
        "fixed inset-0 flex transition-all duration-200",
        dialogState.isMinimized
          ? stackingMode === "scroll"
            ? "pointer-events-none opacity-0 invisible"
            : "items-end justify-start p-4 pointer-events-none"
          : !dialogState.isMaximized && positionClasses[position],
        // Allow click-through when no backdrop is shown and not maximized
        !showBackdrop && !dialogState.isMaximized && "pointer-events-none",
        overlayClassName
      )}
      style={{
        zIndex,
        animation: `fadeIn ${animationDuration}ms ease-out`,
      }}
      onMouseDownCapture={bringToFront}
    >
      {/* Backdrop - hidden when minimized */}
      {showBackdrop && !dialogState.isMinimized && (
        <div
          className={cn(
            "absolute inset-0 bg-black/50 pointer-events-auto",
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
          "relative z-10 flex flex-col max-h-[90vh] max-w-[95vw] overflow-hidden pointer-events-auto",
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

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.Footer = DialogFooter;
