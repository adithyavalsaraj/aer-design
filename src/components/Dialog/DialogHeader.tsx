import { AppWindow, Maximize, Minus, PictureInPicture2, X } from "lucide-react";
import React from "react";
import { cn } from "../../lib/utils";
import { useDialogContext } from "./DialogContext";
import type { DialogHeaderProps } from "./types";

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  (
    {
      title,
      icon,
      showCloseButton: showCloseButtonProp,
      showMaximizeButton: showMaximizeButtonProp,
      showMinimizeButton: showMinimizeButtonProp,
      isMaximized: isMaximizedProp,
      isMinimized: isMinimizedProp,
      onClose: onCloseProp,
      onMaximize: onMaximizeProp,
      onMinimize: onMinimizeProp,
      onRestore: onRestoreProp,
      className,
      titleClassName,
      closeButtonClassName,
      controlButtonsClassName,
      children,
    },
    ref
  ) => {
    // Try to get context, fall back to props if not in Dialog
    let context;
    try {
      context = useDialogContext();
    } catch {
      context = null;
    }

    // Use context values if available, otherwise use props
    const showCloseButton =
      showCloseButtonProp ?? context?.showCloseButton ?? true;
    const showMaximizeButton =
      showMaximizeButtonProp ?? context?.maximizable ?? false;
    const showMinimizeButton =
      showMinimizeButtonProp ?? context?.minimizable ?? false;
    const isMaximized = isMaximizedProp ?? context?.isMaximized ?? false;
    const isMinimized = isMinimizedProp ?? context?.isMinimized ?? false;
    const onClose = onCloseProp ?? context?.onClose;
    const onMaximize = onMaximizeProp ?? context?.onMaximize;
    const onMinimize = onMinimizeProp ?? context?.onMinimize;
    const onRestore = onRestoreProp ?? context?.onRestore;
    const handleMouseDown = context?.handleMouseDown;
    const draggable = context?.draggable;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 px-6 py-4 border-b border-aer-border",
          (draggable && !isMaximized) || isMinimized ? "cursor-move" : "",
          isMinimized && "cursor-pointer",
          className
        )}
        onMouseDown={handleMouseDown}
        onClick={isMinimized ? onRestore : undefined}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && <div className="shrink-0 text-aer-foreground">{icon}</div>}
          {title && (
            <h2
              className={cn(
                "text-lg font-semibold text-aer-foreground truncate",
                titleClassName
              )}
            >
              {title}
            </h2>
          )}
          {children}
        </div>

        <div
          className={cn(
            "flex items-center gap-1 shrink-0",
            controlButtonsClassName
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimize Button */}
          {showMinimizeButton && (
            <button
              type="button"
              onClick={isMinimized ? onRestore : onMinimize}
              className={cn(
                "p-1.5 rounded-md hover:bg-aer-accent transition-colors",
                "text-aer-muted-foreground hover:text-aer-foreground",
                "focus:outline-none focus:ring-2 focus:ring-aer-ring"
              )}
              aria-label={isMinimized ? "Restore" : "Minimize"}
            >
              {isMinimized ? (
                <AppWindow className="w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Maximize Button */}
          {showMaximizeButton && (
            <button
              type="button"
              onClick={onMaximize}
              className={cn(
                "p-1.5 rounded-md hover:bg-aer-accent transition-colors",
                "text-aer-muted-foreground hover:text-aer-foreground",
                "focus:outline-none focus:ring-2 focus:ring-aer-ring"
              )}
              aria-label={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? (
                <PictureInPicture2 className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Close Button */}
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "p-1.5 rounded-md hover:bg-aer-accent transition-colors",
                "text-aer-muted-foreground hover:text-aer-foreground",
                "focus:outline-none focus:ring-2 focus:ring-aer-ring",
                closeButtonClassName
              )}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

DialogHeader.displayName = "DialogHeader";
