import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { X } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
import {
  PopoverProvider,
  usePopoverContext,
  usePopoverZIndex,
  ZIndexProvider,
} from "./PopoverContext";
import type {
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./types";
import { usePopover } from "./usePopover";
import { popoverArrowVariants, popoverContentVariants } from "./variants";

// --- Popover Root ---

export const Popover = ({
  children,
  content,
  className,
  contentClassName,
  arrowClassName,
  variant = "default",
  portal = true,
  portalContainer,
  unmountOnClose = false,
  modal = false,
  arrow = false,
  ...options
}: PopoverProps) => {
  const popover = usePopover(options);

  // Get parent z-index and increment for nesting
  const parentZIndex = usePopoverZIndex();
  const zIndex = parentZIndex + 1;

  // Modal mode - prevent body scroll
  React.useEffect(() => {
    if (!modal || !popover.open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modal, popover.open]);

  const contextValue = React.useMemo(
    () => ({
      ...popover,
      variant,
      arrow,
      zIndex,
    }),
    [popover, variant, arrow, zIndex]
  );

  // Render content
  const shouldRenderContent = popover.open || !unmountOnClose;

  const floatingContent = shouldRenderContent && (
    <div
      ref={popover.floatingRef}
      className={cn(popoverContentVariants({ variant }), contentClassName)}
      style={{
        ...popover.floatingStyles,
        zIndex,
        visibility: popover.open ? "visible" : "hidden",
        pointerEvents: popover.open ? "auto" : "none",
      }}
      {...popover.getFloatingProps()}
    >
      {content}
      {arrow && (
        <div
          ref={popover.arrowRef}
          className={cn(popoverArrowVariants({ variant }), arrowClassName)}
          style={{
            position: "absolute",
            // Arrow positioning based on placement
            ...(popover.placement.side === "top" && {
              bottom: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
            ...(popover.placement.side === "bottom" && {
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
            ...(popover.placement.side === "left" && {
              right: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
            ...(popover.placement.side === "right" && {
              left: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
          }}
        />
      )}
    </div>
  );

  const portalContent =
    portal && typeof document !== "undefined"
      ? createPortal(floatingContent, portalContainer || document.body)
      : floatingContent;

  // When using high-level API with content prop, clone children to attach anchor props
  const triggerElement = content
    ? React.cloneElement(
        children as React.ReactElement,
        {
          ...popover.getAnchorProps(),
          ref: (node: any) => {
            popover.anchorRef(node);
            // Preserve existing ref if any
            const existingRef = (children as any).ref;
            if (existingRef) {
              if (typeof existingRef === "function") existingRef(node);
              else existingRef.current = node;
            }
          },
        } as any
      )
    : children;

  return (
    <ZIndexProvider value={zIndex}>
      <PopoverProvider value={contextValue}>
        {content ? (
          <>
            {triggerElement}
            {portalContent}
          </>
        ) : (
          <div className={cn("inline-block", className)}>{children}</div>
        )}
      </PopoverProvider>
    </ZIndexProvider>
  );
};

Popover.displayName = "Popover";

// --- Popover Trigger ---

export const PopoverTrigger = React.forwardRef<
  HTMLElement,
  PopoverTriggerProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const { anchorRef, getAnchorProps } = usePopoverContext();
  const Comp = asChild ? Slot : "button";

  const anchorProps = getAnchorProps();

  // Wrap onClick to stop propagation (prevents parent popovers from closing)
  const wrappedAnchorProps = {
    ...anchorProps,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      anchorProps.onClick?.(e);
    },
  };

  // Merge refs properly for Slot compatibility
  const mergedRef = React.useCallback(
    (node: any) => {
      anchorRef(node);
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as any).current = node;
      }
    },
    [anchorRef, ref]
  );

  return (
    <Comp
      ref={mergedRef}
      type={asChild ? undefined : "button"}
      className={className}
      {...wrappedAnchorProps}
      {...props}
    >
      {children}
    </Comp>
  );
});

PopoverTrigger.displayName = "PopoverTrigger";

// --- Popover Content ---

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const {
    floatingRef,
    floatingStyles,
    getFloatingProps,
    open,
    variant,
    arrow,
    arrowRef,
    placement,
    zIndex,
  } = usePopoverContext();

  const Comp = asChild ? Slot : "div";
  const floatingProps = getFloatingProps();

  if (!open) return null;

  return createPortal(
    <Comp
      ref={(node: any) => {
        floatingRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
      }}
      className={cn(popoverContentVariants({ variant }), className)}
      style={{ ...floatingStyles, zIndex }}
      {...floatingProps}
      {...props}
    >
      {children}
      {arrow && (
        <div
          ref={arrowRef}
          className={cn(popoverArrowVariants({ variant }))}
          style={{
            position: "absolute",
            ...(placement.side === "top" && {
              bottom: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
            ...(placement.side === "bottom" && {
              top: "-4px",
              left: "50%",
              transform: "translateX(-50%)",
            }),
            ...(placement.side === "left" && {
              right: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
            ...(placement.side === "right" && {
              left: "-4px",
              top: "50%",
              transform: "translateY(-50%)",
            }),
          }}
        />
      )}
    </Comp>,
    document.body
  );
});

PopoverContent.displayName = "PopoverContent";

// --- Popover Arrow ---

export const PopoverArrow = React.forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, width = 8, height = 8, ...props }, ref) => {
    const { arrowRef, variant, placement } = usePopoverContext();

    return (
      <div
        ref={(node) => {
          if (arrowRef) (arrowRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(popoverArrowVariants({ variant }), className)}
        style={{
          position: "absolute",
          width: `${width}px`,
          height: `${height}px`,
          ...(placement.side === "top" && {
            bottom: `-${height / 2}px`,
            left: "50%",
            transform: "translateX(-50%)",
          }),
          ...(placement.side === "bottom" && {
            top: `-${height / 2}px`,
            left: "50%",
            transform: "translateX(-50%)",
          }),
          ...(placement.side === "left" && {
            right: `-${width / 2}px`,
            top: "50%",
            transform: "translateY(-50%)",
          }),
          ...(placement.side === "right" && {
            left: `-${width / 2}px`,
            top: "50%",
            transform: "translateY(-50%)",
          }),
        }}
        {...props}
      />
    );
  }
);

PopoverArrow.displayName = "PopoverArrow";

// --- Popover Close ---

export const PopoverClose = React.forwardRef<
  HTMLButtonElement,
  PopoverCloseProps
>(({ className, asChild = false, children, onClick, ...props }, ref) => {
  const { closePopover } = usePopoverContext();

  // Validate asChild usage
  if (asChild && !React.isValidElement(children)) {
    throw new Error(
      "PopoverClose with asChild prop requires a single valid React element as child"
    );
  }

  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    closePopover();
  };

  if (asChild) {
    // When using asChild, render only the child element with merged props
    return (
      <Comp ref={ref} className={className} onClick={handleClick} {...props}>
        {children}
      </Comp>
    );
  }

  // When not using asChild, render as button with default styling
  return (
    <Comp
      ref={ref}
      type="button"
      className={cn(
        "absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children || <X className="h-4 w-4" />}
      <span className="sr-only">Close</span>
    </Comp>
  );
});

PopoverClose.displayName = "PopoverClose";
