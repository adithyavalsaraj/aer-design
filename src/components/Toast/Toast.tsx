import { cva } from "class-variance-authority";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  X,
} from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { globalToastManager } from "./globalToastManager";
import type { ToastPosition, ToastProps } from "./types.ts";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-96 items-start gap-4 overflow-hidden rounded-xl border p-4 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default:
          "border-blue-300 dark:border-blue-400 !bg-blue-100 dark:!bg-blue-100 !text-blue-700 dark:!text-blue-700",
        neutral:
          "border-gray-300 dark:border-gray-400 !bg-gray-100 dark:!bg-gray-100 !text-gray-700 dark:!text-gray-700",
        success:
          "border-green-300 dark:border-green-400 !bg-green-100 dark:!bg-green-100 !text-green-700 dark:!text-green-700",
        error:
          "border-red-300 dark:border-red-400 !bg-red-100 dark:!bg-red-100 !text-red-700 dark:!text-red-700",
        warning:
          "border-amber-400 dark:border-amber-500 !bg-amber-100 dark:!bg-amber-100 !text-amber-600 dark:!text-amber-600",
        info: "border-blue-300 dark:border-blue-400 !bg-blue-100 dark:!bg-blue-100 !text-blue-700 dark:!text-blue-700",
        aer: "aer-glass border-white/20 dark:border-white/10 text-aer-foreground shadow-xl backdrop-blur-xl bg-white/[var(--toast-opacity)] dark:bg-black/[var(--toast-opacity)]",
      },
      position: {
        "top-left": "data-[state=open]:slide-in-from-left-full",
        "top-center": "data-[state=open]:slide-in-from-top-full",
        "top-right": "data-[state=open]:slide-in-from-right-full",
        "bottom-left": "data-[state=open]:slide-in-from-left-full",
        "bottom-center": "data-[state=open]:slide-in-from-bottom-full",
        "bottom-right": "data-[state=open]:slide-in-from-right-full",
        "center-left": "data-[state=open]:slide-in-from-left-full",
        center: "data-[state=open]:fade-in-0 zoom-in-95",
        "center-right": "data-[state=open]:slide-in-from-right-full",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "top-right",
    },
  }
);

const ToastIcon = ({ variant }: { variant?: ToastProps["variant"] }) => {
  switch (variant) {
    case "success":
      return <CheckCircle2 className="h-5 w-5" />;
    case "error":
      return <AlertCircle className="h-5 w-5" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5" />;
    case "info":
      return <Info className="h-5 w-5" />;
    case "aer":
      return <Sparkles className="h-5 w-5" />;
    default:
      return null;
  }
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      title,
      description,
      action,
      open,
      onOpenChange,
      duration = 5000,
      position,
      x,
      y,
      id,
      isRenderedByContainer,
      dismissOnUnmount = true,
      swipeDirection = "right",
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(open ?? true);
    const [isPaused, setIsPaused] = React.useState(false);
    const [touchStart, setTouchStart] = React.useState<{
      x: number;
      y: number;
    } | null>(null);
    const [swipeOffset, setSwipeOffset] = React.useState(0);

    // Handle Declarative Standalone Mode
    const activeToastId = React.useRef<string | null>(null);
    const generatedId = React.useId();
    const internalId = id || generatedId;

    const handleDismiss = () => {
      if (onOpenChange) {
        onOpenChange(false);
      } else {
        setIsVisible(false);
      }
    };

    React.useEffect(() => {
      // If NOT rendered by container, we delegate to the global manager
      if (!isRenderedByContainer) {
        if (open !== false) {
          // Add to global manager
          // We reconstruct the props object to pass it along
          const toastProps: ToastProps = {
            className,
            variant,
            title,
            description,
            action,
            open,
            onOpenChange,
            duration,
            position,
            x,
            y,
            id: internalId,
            ...props,
          };

          // If we already have an active ID, we might ideally update it, but for now we just add new.
          // To prevent duplicates on re-renders, we could check if activeToastId.current is set?
          // But if props changed, we can't update.
          // Simplest for now: Only add if not active, or just rely on mount/unmount.
          // But useEffect runs on dep change.
          // Let's assume this effect runs only on 'open' change for now to be safe.

          if (!activeToastId.current) {
            activeToastId.current = globalToastManager.add({
              ...toastProps,
              onOpenChange: (isOpen) => {
                onOpenChange?.(isOpen);
                if (!isOpen) activeToastId.current = null;
              },
            });
          }
        } else {
          // Dismiss if open becomes false
          if (activeToastId.current) {
            globalToastManager.dismiss(activeToastId.current);
            activeToastId.current = null;
          }
        }
      }

      return () => {
        // Cleanup on unmount or re-run
        if (!isRenderedByContainer && activeToastId.current) {
          if (dismissOnUnmount) {
            globalToastManager.dismiss(activeToastId.current);
          }
          activeToastId.current = null;
        }
      };
    }, [open, isRenderedByContainer, dismissOnUnmount]);

    // Moved early return to end of render to satisfy rules-of-hooks

    React.useEffect(() => {
      if (open !== undefined) {
        setIsVisible(open);
      }
    }, [open]);

    // Handle auto-dismiss with pause support
    React.useEffect(() => {
      if (!isVisible || duration === Infinity || isPaused) return;

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }, [isVisible, duration, isPaused]);

    // Handle Swipe Gestures
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
      setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!touchStart) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - touchStart.x;
      const diffY = currentY - touchStart.y;

      const direction = swipeDirection ?? "right";
      const isVertical =
        direction === "up" || direction === "down" || direction === "vertical";
      const isHorizontal = !isVertical; // "left", "right", "horizontal"

      // Vertical Logic
      if (isVertical) {
        if (direction === "up" && diffY < 0) setSwipeOffset(diffY);
        else if (direction === "down" && diffY > 0) setSwipeOffset(diffY);
        else if (direction === "vertical") setSwipeOffset(diffY);
        return;
      }

      // Horizontal Logic
      if (isHorizontal) {
        if (direction === "right" && diffX > 0) setSwipeOffset(diffX);
        else if (direction === "left" && diffX < 0) setSwipeOffset(diffX);
        else if (direction === "horizontal") setSwipeOffset(diffX);
      }
    };

    const handleTouchEnd = () => {
      if (Math.abs(swipeOffset) > 100) {
        handleDismiss();
      } else {
        setSwipeOffset(0);
      }
      setTouchStart(null);
      setIsPaused(false);
    };

    if (!isRenderedByContainer || !isVisible) return null;

    const isVerticalSwipe =
      swipeDirection === "up" ||
      swipeDirection === "down" ||
      swipeDirection === "vertical";

    // Dynamic transform based on active axis
    const swipeTransform = isVerticalSwipe
      ? `translateY(${swipeOffset}px)`
      : `translateX(${swipeOffset}px)`;

    const isFixed = !!position || (x !== undefined && y !== undefined);

    const getOpacity = (level?: number) => {
      if (level === undefined) return "0.95"; // Default to 0.95
      return String(level);
    };

    // Style for standalone positioning and transparency
    const style: React.CSSProperties = {
      ...(x !== undefined && { left: x }),
      ...(y !== undefined && { top: y }),
      ...(!isRenderedByContainer &&
      isFixed &&
      (x !== undefined || y !== undefined)
        ? { position: "fixed", zIndex: 100 }
        : {}),
      // @ts-expect-error -- CSS variable
      "--toast-opacity": getOpacity(props.transparency),
      // Apply opacity to background for non-aer variants
      ...(variant !== "aer" && props.transparency
        ? { opacity: getOpacity(props.transparency) }
        : {}),
      // Swipe transform
      transform: swipeTransform,
      transition: swipeOffset === 0 ? "transform 0.2s ease-out" : "none",
      // Prevent browser handling of gestures in swipe direction
      touchAction: isVerticalSwipe
        ? "pan-x" // If vertical swipe, allow horizontal pan, block vertical
        : "pan-y", // If horizontal swipe, allow vertical pan, block horizontal
    };

    // If strictly standalone using "position='top-right'", we apply fixed classes
    // Only apply if NOT rendered by container
    const standaloneClasses =
      !isRenderedByContainer &&
      isFixed &&
      x === undefined &&
      y === undefined &&
      position
        ? getFixedPositionClass(position)
        : "";

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        data-state={isVisible ? "open" : "closed"}
        className={cn(
          toastVariants({ variant, position }),
          standaloneClasses,
          className
        )}
        style={style}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        {...props}
      >
        <ToastIcon variant={variant} />

        <div className="grid gap-1 flex-1">
          {title && (
            <div className="text-sm font-semibold leading-tight">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90 leading-normal">
              {description}
            </div>
          )}
        </div>

        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick();
              handleDismiss();
            }}
            className="group inline-flex h-8 items-center justify-center rounded-md border border-aer-border bg-transparent px-3 text-xs font-medium transition-colors hover:bg-aer-muted focus:outline-none focus:ring-1 focus:ring-aer-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-aer-destructive/30 group-[.destructive]:hover:border-aer-destructive/30 group-[.destructive]:hover:bg-aer-destructive group-[.destructive]:hover:text-aer-destructive-foreground group-[.destructive]:focus:ring-aer-destructive shrink-0"
          >
            {action.label}
          </button>
        )}
        {!action && (
          <button
            onClick={handleDismiss}
            className="rounded-md p-1 text-aer-foreground/50 opacity-0 transition-opacity hover:text-aer-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 shrink-0 -mt-1 -mr-1"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = "Toast";

// Helper for standalone positioning classes
function getFixedPositionClass(pos: ToastPosition) {
  switch (pos) {
    case "top-left":
      return "fixed top-4 left-4 z-[100]";
    case "top-center":
      return "fixed top-4 left-1/2 -translate-x-1/2 z-[100]";
    case "top-right":
      return "fixed top-4 right-4 z-[100]";
    case "bottom-left":
      return "fixed bottom-4 left-4 z-[100]";
    case "bottom-center":
      return "fixed bottom-4 left-1/2 -translate-x-1/2 z-[100]";
    case "bottom-right":
      return "fixed bottom-4 right-4 z-[100]";
    case "center-left":
      return "fixed top-1/2 left-4 -translate-y-1/2 z-[100]";
    case "center":
      return "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]";
    case "center-right":
      return "fixed top-1/2 right-4 -translate-y-1/2 z-[100]";
    default:
      return "";
  }
}
