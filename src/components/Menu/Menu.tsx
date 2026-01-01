import { calculateOptimalPosition } from "@/hooks";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { MenuContext, useMenu } from "./MenuContext";
import {
  type MenuContentProps,
  type MenuGroupProps,
  type MenuItemProps,
  type MenuLabelProps,
  type MenuProps,
  type MenuSeparatorProps,
  type MenuTriggerProps,
  type SubMenuProps,
} from "./types";
import { menuContentVariants, menuItemVariants } from "./variants";

// --- Menu Root ---

export function Menu({
  children,
  isOpen: controlledOpen,
  onOpenChange,
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = React.useCallback(
    (open: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    },
    [isControlled, onOpenChange]
  );

  const closeMenu = React.useCallback(() => setIsOpen(false), [setIsOpen]);
  const openMenu = React.useCallback(() => setIsOpen(true), [setIsOpen]);
  const toggleMenu = React.useCallback(
    () => setIsOpen(!isOpen),
    [isOpen, setIsOpen]
  );

  const contextValue = React.useMemo(
    () => ({ isOpen, setIsOpen, closeMenu, openMenu, toggleMenu }),
    [isOpen, setIsOpen, closeMenu, openMenu, toggleMenu]
  );

  return (
    <MenuContext.Provider value={contextValue}>
      <div className="relative inline-block text-left">{children}</div>
    </MenuContext.Provider>
  );
}

// --- Menu Trigger ---

export const MenuTrigger = React.forwardRef<
  HTMLButtonElement,
  MenuTriggerProps
>(({ className, onClick, children, asChild = false, ...props }, ref) => {
  const { isOpen, toggleMenu, closeMenu } = useMenu();
  const Comp = asChild ? Slot : "button";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    toggleMenu();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  };

  return (
    <Comp
      ref={ref}
      type={asChild ? undefined : "button"}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </Comp>
  );
});
MenuTrigger.displayName = "MenuTrigger";

// --- Menu Content ---

export const MenuContent = React.forwardRef<HTMLDivElement, MenuContentProps>(
  (
    {
      className,
      children,
      align = "start",
      side = "bottom",
      sideOffset = 4,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const { isOpen, closeMenu } = useMenu();
    const contentRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          closeMenu();
        }
      };

      if (isOpen) {
        // Use a timeout to avoid immediate close if the trigger click bubbles up
        // (Though standard React event propagation usually handles this, sometimes native listener needs delay)
        // Actually, standard capture check is usually fine.
        // But checking if target is the trigger is hard here without context.
        // Relying on trigger's stopPropagation or checking containment.
        // Let's rely on standard document listener, but wait a tick if needed. No, standard is usually fine.
        // However, if the trigger is clicked, we toggle. If menu is open, and we click trigger, toggle closes it.
        // But outside click listener will also fire and close it.
        // Double close is fine. But if menu is closed, and we click trigger, toggle opens it.
        // Outside click listener won't fire because it's only attached when isOpen.
        setTimeout(
          () => document.addEventListener("mousedown", handleClickOutside),
          0
        );
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, closeMenu]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeMenu();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown);
      }
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, closeMenu]);

    // Focus first item on open
    React.useEffect(() => {
      if (isOpen && contentRef.current) {
        // Small timeout to allow render
        requestAnimationFrame(() => {
          const firstItem = contentRef.current?.querySelector(
            '[role="menuitem"]:not([data-disabled])'
          ) as HTMLElement;
          firstItem?.focus();
        });
      }
    }, [isOpen]);

    const [effectiveSide, setEffectiveSide] = React.useState(side);
    const [effectiveAlign, setEffectiveAlign] = React.useState(align);

    // Reset effective positions when closed or props change
    React.useEffect(() => {
      if (!isOpen) {
        // Reset to defaults when closed so next open starts fresh
        setEffectiveSide(side);
        setEffectiveAlign(align);
      }
    }, [isOpen, side, align]);

    React.useLayoutEffect(() => {
      if (isOpen && contentRef.current) {
        const menuRect = contentRef.current.getBoundingClientRect();
        const triggerRect =
          contentRef.current.parentElement?.getBoundingClientRect();

        if (!triggerRect) return;

        // Use shared positioning utility
        const result = calculateOptimalPosition({
          referenceRect: triggerRect,
          floatingRect: menuRect,
          side,
          align,
          sideOffset,
        });

        if (result.side !== effectiveSide || result.align !== effectiveAlign) {
          setEffectiveSide(result.side);
          setEffectiveAlign(result.align);
        }
      }
    }, [isOpen, side, align, sideOffset, effectiveSide, effectiveAlign]);

    // Focus Management
    const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      const items = Array.from(
        contentRef.current?.querySelectorAll(
          '[role="menuitem"]:not([data-disabled])'
        ) || []
      ) as HTMLElement[];

      if (items.length === 0) return;

      const activeElement = document.activeElement as HTMLElement;
      const currentIndex = items.indexOf(activeElement);

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (e.key === "ArrowRight") {
        // Open submenu if current item has one, or focus into it if already open
        e.preventDefault();
        // Check if the focused element itself is a submenu trigger
        if (activeElement.hasAttribute("data-submenu-trigger")) {
          // Check if submenu is already open
          const submenu = activeElement.querySelector('[role="menu"]');
          if (submenu) {
            // Submenu is already open, just focus first item
            const firstSubmenuItem = submenu.querySelector(
              '[role="menuitem"]:not([data-disabled])'
            ) as HTMLElement;
            firstSubmenuItem?.focus();
          } else {
            // Submenu is closed, open it
            activeElement.click();
            // Focus first item in submenu after a brief delay
            setTimeout(() => {
              const submenu = activeElement.querySelector('[role="menu"]');
              const firstSubmenuItem = submenu?.querySelector(
                '[role="menuitem"]:not([data-disabled])'
              ) as HTMLElement;
              firstSubmenuItem?.focus();
            }, 50);
          }
        }
      } else if (e.key === "ArrowLeft") {
        // Close submenu if we're in one
        e.preventDefault();
        const parentMenu = activeElement.closest("[data-submenu-content]");
        if (parentMenu) {
          const trigger = parentMenu.parentElement?.querySelector(
            "[data-submenu-trigger]"
          ) as HTMLElement;
          trigger?.focus();
          trigger?.click(); // Close submenu
        }
      }

      props.onKeyDown?.(e);
    };

    if (!isOpen) return null;

    const positions: Record<
      NonNullable<MenuContentProps["side"]>,
      React.CSSProperties
    > = {
      bottom: { top: "100%", marginTop: sideOffset },
      top: { bottom: "100%", marginBottom: sideOffset },
      left: { right: "100%", marginRight: sideOffset },
      right: { left: "100%", marginLeft: sideOffset },
    };

    const alignments: Record<
      NonNullable<MenuContentProps["align"]>,
      React.CSSProperties
    > = {
      start:
        effectiveSide === "left" || effectiveSide === "right"
          ? { top: 0 }
          : { left: 0 },
      end:
        effectiveSide === "left" || effectiveSide === "right"
          ? { bottom: 0 }
          : { right: 0 },
      center:
        effectiveSide === "left" || effectiveSide === "right"
          ? { top: "50%", transform: "translateY(-50%)" }
          : { left: "50%", transform: "translateX(-50%)" },
    };

    const style = {
      ...positions[effectiveSide as keyof typeof positions],
      ...alignments[effectiveAlign as keyof typeof alignments],
    };

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={(node) => {
          contentRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
        }}
        className={cn(menuContentVariants({ className }))}
        style={style}
        role="menu"
        onKeyDown={handleContentKeyDown}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
MenuContent.displayName = "MenuContent";

// --- Menu Groups & Items ---

export const MenuGroup = React.forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} className={cn("px-1 py-1", className)} {...props} />;
  }
);
MenuGroup.displayName = "MenuGroup";

export const MenuLabel = React.forwardRef<HTMLDivElement, MenuLabelProps>(
  ({ className, inset, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(
          "px-2 py-1.5 text-sm font-semibold text-aer-foreground",
          inset && "pl-8",
          className
        )}
        {...props}
      />
    );
  }
);
MenuLabel.displayName = "MenuLabel";

export const MenuItem = React.forwardRef<HTMLDivElement, MenuItemProps>(
  (
    { className, inset, variant, disabled, onClick, asChild = false, ...props },
    ref
  ) => {
    const { closeMenu } = useMenu();
    const Comp = asChild ? Slot : "div";
    const innerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    // Accessibility: Enter/Space to click
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.currentTarget.click();
      }
      props.onKeyDown?.(e);
    };

    return (
      <Comp
        ref={innerRef}
        role="menuitem"
        className={cn(menuItemVariants({ inset, variant, className }))}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          // Don't close menu if this is a submenu trigger
          const isSubmenuTrigger = innerRef.current?.hasAttribute(
            "data-submenu-trigger"
          );
          if (!isSubmenuTrigger) {
            closeMenu();
          }
        }}
        onKeyDown={handleKeyDown}
        data-disabled={disabled ? "" : undefined}
        tabIndex={disabled ? -1 : 0}
        {...props}
      />
    );
  }
);
MenuItem.displayName = "MenuItem";

export const MenuSeparator = React.forwardRef<
  HTMLDivElement,
  MenuSeparatorProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-aer-border", className)}
      {...props}
    />
  );
});
MenuSeparator.displayName = "MenuSeparator";

// --- Sub Menu ---

export const SubMenu = React.forwardRef<HTMLDivElement, SubMenuProps>(
  ({ className, trigger, children, disabled, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const timeoutRef = React.useRef<number | null>(null);

    const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, 100);
    };

    const innerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    const subContentRef = React.useRef<HTMLDivElement>(null);
    const [positionStyle, setPositionStyle] =
      React.useState<React.CSSProperties>({
        left: "100%",
        top: 0,
      });

    React.useLayoutEffect(() => {
      if (isOpen && subContentRef.current) {
        const rect = subContentRef.current.getBoundingClientRect();
        const { innerWidth, innerHeight } = window;

        const newStyle: React.CSSProperties = { top: 0 };

        // Match width to parent trigger if not specified in className
        // We use minWidth so it can grow if content is wider
        if (innerRef.current) {
          (newStyle as any)[
            "--aer-submenu-parent-width"
          ] = `${innerRef.current.offsetWidth}px`;
        }

        // Horizontal: Right by default (left: 100%)
        // If right edge > viewport width, flip to left (right: 100%)
        if (rect.right > innerWidth) {
          newStyle.left = "auto";
          newStyle.right = "100%";
          newStyle.marginRight = "4px"; // Match the ml-1 gap/overlap logic roughly or use -mr-1
        } else {
          newStyle.left = "100%";
        }

        // Vertical: If bottom goes off screen, shift up
        if (rect.bottom > innerHeight) {
          // Simple shift: bottom aligned with trigger bottom?
          // Or just translate Y?
          // Let's try to align bottom to parent bottom if it overflows
          // But we don't have parent rect easily here without ref to trigger parent
          // But we can check how much it overflows and translate up
          const overflowY = rect.bottom - innerHeight + 10; // +10 padding
          if (overflowY > 0) {
            newStyle.top = `-${overflowY}px`;
          }
        }

        setPositionStyle(newStyle);
      }
    }, [isOpen]);

    return (
      <div
        ref={innerRef}
        className={cn("relative group w-full", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <MenuItem
          className="flex items-center justify-between w-full"
          aria-haspopup="true"
          aria-expanded={isOpen}
          disabled={disabled}
          data-submenu-trigger=""
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {trigger}
          <ChevronRight className="ml-auto h-4 w-4" />
        </MenuItem>

        {isOpen && !disabled && (
          <div
            ref={subContentRef}
            className={cn(
              "absolute whitespace-nowrap rounded-md border border-aer-border bg-aer-background p-1 text-aer-foreground shadow-md animate-in fade-in-0 zoom-in-95 z-[100]",
              // Default width behavior:
              // 1. Minimum 8rem
              // 2. Matches parent width if larger than 8rem
              // 3. Can be overridden by user using `w-` or `min-w-` classes cause tailwind-merge handles the conflict
              "min-w-[max(8rem,var(--aer-submenu-parent-width,0px))]",
              "-ml-1"
            )}
            style={positionStyle}
            role="menu"
            data-submenu-content=""
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);
SubMenu.displayName = "SubMenu";
