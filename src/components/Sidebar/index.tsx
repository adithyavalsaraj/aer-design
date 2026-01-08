import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";

// --- Variants ---

const sidebarVariants = cva(
  "flex bg-aer-background transition-[width,height,transform] duration-300 ease-in-out border-aer-border z-40",
  {
    variants: {
      position: {
        left: "flex-col h-full border-e inset-y-0 start-0",
        right: "flex-col h-full border-s inset-y-0 end-0",
        top: "flex-row w-full border-b inset-x-0 top-0 items-center px-4",
        bottom: "flex-row w-full border-t inset-x-0 bottom-0 items-center px-4",
      },
      mode: {
        fixed: "fixed",
        sticky: "sticky",
        absolute: "absolute",
        floating: "fixed m-4 rounded-aer-xl border shadow-xl", // Trendy "island" look
        overlay: "fixed z-50 h-full", // Overlay mode
        icon: "fixed inset-y-0 z-30", // Icon-only mode
      },
      variant: {
        default: "bg-aer-background border-aer-border",
        aer: "bg-white/5 backdrop-blur-xl border-white/10 text-white shadow-2xl",
      },
      collapsed: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        position: ["left", "right"],
        collapsed: false,
        className: "w-64 shrink-0",
      },
      {
        position: ["left", "right"],
        collapsed: true,
        className: "w-[4.5rem] shrink-0",
      },
      {
        position: ["top", "bottom"],
        className: "h-16 shrink-0",
      },
      // Adjust floating margins/positioning
      {
        mode: "floating",
        position: "left",
        className: "start-0 top-0 bottom-0 h-[calc(100%-2rem)]",
      },
      {
        mode: "floating",
        position: "right",
        className: "end-0 top-0 bottom-0 h-[calc(100%-2rem)]",
      },
      {
        mode: "floating",
        position: "top",
        className: "top-0 start-0 end-0 w-[calc(100%-2rem)]",
      },
      {
        mode: "floating",
        position: "bottom",
        className: "bottom-0 start-0 end-0 w-[calc(100%-2rem)]",
      },
    ],
    defaultVariants: {
      position: "left",
      mode: "fixed",
      collapsed: false,
      variant: "default",
    },
  }
);

// --- Types ---

export interface SidebarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle">,
    VariantProps<typeof sidebarVariants> {
  isOpen?: boolean; // Controls visibility (rendering)
  hoverable?: boolean; // Enables "Rail" behavior: expand on hover
  overlay?: boolean; // Enables overlay mode with backdrop
  collapsed?: boolean;
  backdrop?: boolean; // Shows backdrop (if overlay is true)
  onBackdropClick?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onCollapse?: (collapsed: boolean) => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showNestedBorder?: boolean; // Toggles left border for nested items
}

// --- Context for Items ---
interface SidebarContextValue {
  collapsed?: boolean;
  position?: "left" | "right" | "top" | "bottom" | null;
  variant?: "default" | "aer";
  onOpenChange?: (isOpen: boolean) => void;
  showNestedBorder?: boolean;
}
const SidebarContext = React.createContext<SidebarContextValue>({
  collapsed: false,
  position: "left",
  variant: "default",
  showNestedBorder: true,
});

export const useSidebar = () => React.useContext(SidebarContext);

// --- Main Component ---

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      position = "left",
      mode = "fixed",
      collapsed = false,
      hoverable = false,
      isOpen = true,
      overlay = false,
      backdrop = true,
      variant = "default",
      onBackdropClick,
      onOpenChange,
      onCollapse,
      children,
      onMouseEnter,
      onMouseLeave,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showNestedBorder = true,
      ...props
    },
    ref
  ) => {
    // Internal hover state for "Rail" interaction
    const [isHovered, setIsHovered] = React.useState(false);

    // Determines if overlay should be active
    const showOverlay = overlay && isOpen;

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && showOverlay && closeOnEscape) {
          // Should only close if overlay is active/visible
          onOpenChange?.(false);
        }
      };
      if (showOverlay) {
        window.addEventListener("keydown", handleKeyDown);
      }
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [showOverlay, closeOnEscape, onOpenChange]);

    const handleBackdropClick = () => {
      if (closeOnBackdropClick) onOpenChange?.(false);
      onBackdropClick?.();
    };

    // Determine effective visual state:
    // Icon mode implies collapsed behavior basic
    const isActuallyCollapsed =
      (collapsed || mode === "icon") && (!hoverable || !isHovered);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) setIsHovered(false);
      onMouseLeave?.(e);
    };

    // ... (rest of render logic remains similar, relying on isActuallyCollapsed)
    // Responsive Transformation Logic
    // If not open, we translate it off-screen based on position
    const getHiddenClass = () => {
      if (isOpen) return "translate-x-0 translate-y-0 opacity-100";

      switch (position) {
        case "left":
          return "-translate-x-full opacity-0";
        case "right":
          return "translate-x-full opacity-0";
        case "top":
          return "-translate-y-full opacity-0";
        case "bottom":
          return "translate-y-full opacity-0";
        default:
          return "invisible opacity-0";
      }
    };

    return (
      <SidebarContext.Provider
        value={{
          collapsed: !!isActuallyCollapsed,
          position,
          variant: variant || "default",
          onOpenChange,
          showNestedBorder,
        }}
      >
        {/* Backdrop for Overlay Mode */}
        {overlay && isOpen && backdrop && (
          <div
            className="absolute inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        <aside
          ref={ref}
          className={cn(
            sidebarVariants({
              position,
              mode: overlay ? "overlay" : mode,
              variant,
              collapsed: isActuallyCollapsed,
            }),
            getHiddenClass(),
            className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          {children}
        </aside>
      </SidebarContext.Provider>
    );
  }
);
Sidebar.displayName = "Sidebar";

// --- Sub-components ---

const SidebarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "flex items-center min-h-16 border-b border-aer-border/40 shrink-0 gap-3 transition-all duration-300 ease-in-out",
        collapsed ? "justify-center px-0" : "px-4", // Auto-center when collapsed
        className
      )}
      {...props}
    />
  );
};

const SidebarContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { position } = useSidebar();
  const isHorizontal = position === "top" || position === "bottom";
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (isHorizontal) {
    return (
      <div
        className={cn(
          "flex-1 flex items-center min-w-0 px-2 gap-1 overflow-hidden",
          className
        )}
        {...props}
      >
        <button
          onClick={() => scroll("left")}
          className="p-1 rounded-full hover:bg-aer-muted text-aer-muted-foreground shrink-0 focus:outline-none focus:ring-2 focus:ring-aer-ring"
          type="button"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div
          ref={scrollRef}
          className="flex flex-1 items-center gap-4 overflow-x-auto scrollbar-none snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>
        <button
          onClick={() => scroll("right")}
          className="p-1 rounded-full hover:bg-aer-muted text-aer-muted-foreground shrink-0 focus:outline-none focus:ring-2 focus:ring-aer-ring"
          type="button"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex-1 overflow-auto p-2 scrollbar-thin scrollbar-thumb-aer-border flex flex-col gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SidebarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center px-4 py-4 min-h-16 border-t border-aer-border/40 shrink-0 gap-3",
      className
    )}
    {...props}
  />
);

const SidebarSection = ({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { collapsed, position } = React.useContext(SidebarContext);
  // Hide title in horizontal mode or fully collapsed mode
  const isHorizontal = position === "top" || position === "bottom";
  const shouldHideTitle = collapsed || isHorizontal;

  return (
    <div
      className={cn(
        isHorizontal ? "flex items-center gap-2 h-full" : "mb-2 w-full",
        className
      )}
    >
      {title && !shouldHideTitle && (
        <h4 className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-aer-muted-foreground/70 animate-in fade-in duration-300">
          {title}
        </h4>
      )}
      <div
        className={cn(
          "flex",
          isHorizontal
            ? "flex-row gap-1 items-center h-full"
            : "flex-col gap-0.5"
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface SidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

// ... (existing imports)

// ... (SidebarItem component start)
const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    const { collapsed, position, variant } = React.useContext(SidebarContext);
    const isHorizontal = position === "top" || position === "bottom";

    // Tooltip Logic (Portal)
    const [tooltipStyles, setTooltipStyles] =
      React.useState<React.CSSProperties | null>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    // Combine refs
    const setRefs = (element: HTMLButtonElement | null) => {
      buttonRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
          element;
    };

    const handleMouseEnter = () => {
      if (collapsed && !isHorizontal && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        // Position to the right (end) of the sidebar item
        // For RTL support, we should detect direction, but simple 'left' vs 'right' based on sidebar position is easier?
        // Actually, if sidebar is on 'right' position, tooltip should be on left.
        // Let's use the 'position' context!

        let top = rect.top + rect.height / 2; // vertically centered
        let left = 0;
        let transform = "translateY(-50%)";

        if (position === "right") {
          // Sidebar on right, tooltip to left
          left = rect.left - 8; // 8px gap
          transform = "translate(-100%, -50%)"; // origin right-center
        } else {
          // Sidebar on left (default), tooltip to right
          left = rect.right + 8; // 8px gap
          transform = "translateY(-50%)"; // origin left-center
        }

        setTooltipStyles({
          position: "fixed",
          top,
          left,
          transform,
          zIndex: 100, // Top of everything
        });
      }
    };

    const handleMouseLeave = () => {
      setTooltipStyles(null);
    };

    React.useEffect(() => {
      if (active && !collapsed && !isHorizontal && buttonRef.current) {
        buttonRef.current.scrollIntoView({
          block: "nearest",
          behavior: "instant",
        });
      }
    }, [active, collapsed, isHorizontal]);

    return (
      <>
        <button
          ref={setRefs}
          onMouseEnter={(e) => {
            handleMouseEnter();
            props.onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            handleMouseLeave();
            props.onMouseLeave?.(e);
          }}
          className={cn(
            "group flex items-center gap-3 rounded-aer-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-aer-ring",
            // Layout
            isHorizontal ? "px-3 py-2" : "w-full px-3 py-2",
            // Collapsed specific (Vertical only)
            collapsed &&
              !isHorizontal &&
              "justify-center px-0 w-10 h-10 mx-auto",
            // Colors & States
            active
              ? variant === "aer"
                ? "bg-white/20 text-white shadow-lg"
                : "bg-aer-primary text-aer-primary-foreground shadow-md shadow-aer-primary/20"
              : variant === "aer"
              ? "text-white/70 hover:bg-white/10 hover:text-white"
              : "text-aer-foreground/80 hover:bg-aer-muted hover:text-aer-foreground hover:translate-x-0.5 active:scale-95",
            // Reset hover effects for horizontal/custom layouts
            (isHorizontal || className?.includes("flex-col")) &&
              "hover:translate-x-0",
            className
          )}
          {...props}
        >
          {icon && (
            <span
              className={cn(
                "flex items-center justify-center shrink-0 transition-transform duration-200",
                collapsed ? "size-5" : "size-4",
                !active && !collapsed && "group-hover:scale-110"
              )}
            >
              {icon}
            </span>
          )}

          {/* Label Rendering Logic */}
          {(!collapsed || isHorizontal) && (
            <span
              className={cn(
                "truncate animate-in fade-in ltr:slide-in-from-left-2 rtl:slide-in-from-right-2 duration-300 leading-tight",
                isHorizontal && "whitespace-nowrap"
              )}
            >
              {children}
            </span>
          )}
        </button>

        {/* Floating Tooltip Portal for Collapsed Mode (Only Vertical) */}
        {collapsed &&
          !isHorizontal &&
          tooltipStyles &&
          createPortal(
            <div
              className="pointer-events-none rounded-md bg-aer-foreground px-2 py-1 text-xs text-aer-background shadow-md animate-in fade-in zoom-in-95 duration-200 whitespace-nowrap"
              style={tooltipStyles}
            >
              {children}
            </div>,
            document.body
          )}
      </>
    );
  }
);
SidebarItem.displayName = "SidebarItem";

// --- Nested Item with Expand/Collapse ---

interface SidebarNestedItemProps {
  icon?: React.ReactNode;
  label: string;
  defaultExpanded?: boolean;
  indent?: string; // Indentation with CSS unit (default: "1rem")
  children: React.ReactNode;
  className?: string;
  showBorder?: boolean; // Override global setting
}

const SidebarNestedItem = ({
  icon,
  label,
  defaultExpanded = false,
  indent = "1rem", // Default 1rem
  children,
  className,
  showBorder,
}: SidebarNestedItemProps) => {
  const { collapsed, position, variant, showNestedBorder } =
    React.useContext(SidebarContext);

  const effectiveShowBorder = showBorder ?? showNestedBorder ?? true;
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const isHorizontal = position === "top" || position === "bottom";
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [panelStyles, setPanelStyles] = React.useState<React.CSSProperties>({});

  // Recursively check if any child (at any level) is active
  const hasActiveChild = React.useMemo(() => {
    const checkActive = (children: React.ReactNode): boolean => {
      let foundActive = false;
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          // Check if this child is active
          if ((child.props as any).active) {
            foundActive = true;
          }
          // Recursively check this child's children
          if ((child.props as any).children) {
            if (checkActive((child.props as any).children)) {
              foundActive = true;
            }
          }
        }
      });
      return foundActive;
    };
    return checkActive(children);
  }, [children]);

  // Auto-expand if a child is active
  React.useEffect(() => {
    if (hasActiveChild && !collapsed && !isHorizontal) {
      setIsExpanded(true);
    }
  }, [hasActiveChild, collapsed, isHorizontal]);

  // Calculate panel position when opened
  React.useEffect(() => {
    if (isPanelOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      let styles: React.CSSProperties = {
        position: "fixed",
        zIndex: 100,
      };

      if (isHorizontal) {
        // Horizontal sidebar: show panel below/above
        if (position === "top") {
          styles.top = rect.bottom + 8;
          styles.left = rect.left;
        } else {
          styles.bottom = window.innerHeight - rect.top + 8;
          styles.left = rect.left;
        }
      } else {
        // Vertical sidebar: show panel to the side
        styles.top = rect.top;
        if (position === "right") {
          styles.right = window.innerWidth - rect.left + 8;
        } else {
          styles.left = rect.right + 8;
        }
      }

      setPanelStyles(styles);
    }
  }, [isPanelOpen, position, isHorizontal]);

  // Close panel when clicking outside
  React.useEffect(() => {
    if (!isPanelOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(".sidebar-nested-panel")
      ) {
        setIsPanelOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPanelOpen]);

  // In collapsed or horizontal mode, show as a trigger with floating panel
  if (collapsed || isHorizontal) {
    return (
      <>
        <button
          ref={buttonRef}
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className={cn(
            "group flex items-center gap-3 rounded-aer-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-aer-ring",
            isHorizontal
              ? "px-3 py-2 justify-between w-full"
              : "w-full px-3 py-2",
            collapsed &&
              !isHorizontal &&
              "justify-center px-0 w-10 h-10 mx-auto",
            variant === "aer"
              ? "text-white/70 hover:bg-white/10 hover:text-white"
              : "text-aer-foreground/80 hover:bg-aer-muted hover:text-aer-foreground hover:translate-x-0.5 active:scale-95",
            isPanelOpen && (variant === "aer" ? "bg-white/10" : "bg-aer-muted"),
            hasActiveChild &&
              !isPanelOpen &&
              (variant === "aer" ? "bg-white/10" : "bg-aer-primary/10"),
            className
          )}
        >
          <div className="flex items-center gap-3">
            {icon && (
              <span
                className={cn(
                  "flex items-center justify-center shrink-0 transition-transform duration-200",
                  collapsed ? "size-5" : "size-4"
                )}
              >
                {icon}
              </span>
            )}
            {(!collapsed || isHorizontal) && (
              <span className="truncate leading-tight">{label}</span>
            )}
          </div>
          {/* Chevron indicator for nested items */}
          {(!collapsed || isHorizontal) && (
            <>
              {isHorizontal ? (
                position === "top" ? (
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      isPanelOpen && "rotate-180"
                    )}
                  />
                ) : (
                  <ChevronUp
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      isPanelOpen && "rotate-180"
                    )}
                  />
                )
              ) : (
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-200",
                    isPanelOpen && "rotate-90"
                  )}
                />
              )}
            </>
          )}
        </button>

        {/* Floating Panel */}
        {isPanelOpen &&
          createPortal(
            <div
              className="sidebar-nested-panel min-w-[240px] bg-aer-background border border-aer-border rounded-aer-lg shadow-xl p-2 space-y-0.5 animate-in fade-in zoom-in-95 duration-200"
              style={panelStyles}
            >
              <div className="px-3 py-2 text-xs font-semibold text-aer-muted-foreground border-b border-aer-border mb-2">
                {label}
              </div>
              {/* Wrap children in context with collapsed=false to show labels */}
              <SidebarContext.Provider
                value={{
                  collapsed: false,
                  position,
                  variant,
                }}
              >
                <div className="flex flex-col w-full">{children}</div>
              </SidebarContext.Provider>
            </div>,
            document.body
          )}
      </>
    );
  }

  // Normal expanded mode (vertical, not collapsed)
  return (
    <div className={cn("w-full", className)}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "group flex items-center justify-between gap-3 w-full px-3 py-2 rounded-aer-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-aer-ring",
          "text-aer-foreground/80 hover:bg-aer-muted hover:text-aer-foreground hover:translate-x-0.5 active:scale-95",
          hasActiveChild && "bg-aer-primary/10"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex items-center justify-center shrink-0 size-4 transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
          )}
          <span className="truncate leading-tight">{label}</span>
        </div>
        <ChevronRight
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            isExpanded && "rotate-90"
          )}
        />
      </button>
      {isExpanded && (
        <div
          className={cn(
            "mt-1 space-y-0.5 animate-in slide-in-from-top-2 fade-in duration-200",
            effectiveShowBorder && "border-s-2 border-aer-border/30"
          )}
          style={{
            marginInlineStart: effectiveShowBorder
              ? indent
              : `calc(${indent} / 2)`,
            paddingInlineStart: effectiveShowBorder ? `calc(${indent} / 2)` : 0,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
SidebarNestedItem.displayName = "SidebarNestedItem";

export {
  Sidebar,
  SidebarClose,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNestedItem,
  SidebarSection,
};

const SidebarClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, onClick, ...props }, ref) => {
  const { onOpenChange } = useSidebar();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpenChange?.(false);
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={cn(
        "p-2 rounded-md hover:bg-aer-muted transition-colors",
        className
      )}
      {...props}
    >
      {children || <X className="size-4" />}
    </button>
  );
});
SidebarClose.displayName = "SidebarClose";
