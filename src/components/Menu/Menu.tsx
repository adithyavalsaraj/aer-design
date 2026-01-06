import { useAutoPosition } from "@/hooks/useAutoPosition";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";
import * as React from "react";
import { createPortal } from "react-dom";
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
  variant,
  scrollBehavior = "reposition",
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

  const triggerRef = React.useRef<HTMLElement | null>(null);
  const contextValue = React.useMemo(
    () => ({
      isOpen,
      setIsOpen,
      closeMenu,
      openMenu,
      toggleMenu,
      variant: variant || "default",
      triggerRef,
      scrollBehavior,
    }),
    [
      isOpen,
      setIsOpen,
      closeMenu,
      openMenu,
      toggleMenu,
      variant,
      scrollBehavior,
    ]
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
  const { isOpen, toggleMenu, closeMenu, triggerRef } = useMenu();
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
      ref={(node: any) => {
        triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as any).current = node;
      }}
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
      scrollBehavior = "reposition",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const { isOpen, closeMenu, triggerRef } = useMenu();

    const { scrollBehavior: contextBehavior } = useMenu();
    const activeScrollBehavior =
      scrollBehavior || contextBehavior || "reposition";

    const {
      referenceRef,
      floatingRef,
      floatingStyles,
      elements: { floating: contentElement },
    } = useAutoPosition({
      isOpen,
      side,
      align,
      sideOffset,
      strategy: "fixed",
      scrollBehavior: activeScrollBehavior,
      onScroll: () => closeMenu(),
    });

    // Link triggerRef from context to referenceRef from hook
    React.useLayoutEffect(() => {
      if (triggerRef && triggerRef.current) {
        referenceRef(triggerRef.current);
      }
    }, [triggerRef, referenceRef]);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentElement && !contentElement.contains(event.target as Node)) {
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
    }, [isOpen, closeMenu, contentElement]);

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
    }, [isOpen, closeMenu, contentElement]);

    // Focus first item on open
    React.useEffect(() => {
      if (isOpen && contentElement) {
        // Small timeout to allow render
        requestAnimationFrame(() => {
          const firstItem = contentElement.querySelector(
            '[role="menuitem"]:not([data-disabled])'
          ) as HTMLElement;
          firstItem?.focus();
        });
      }
    }, [isOpen, contentElement]);

    // Auto-positioning and collision detection is handled by useAutoPosition hook

    // Focus Management
    const handleContentKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isOpen) return;

      const items = Array.from(
        contentElement?.querySelectorAll(
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

    const Comp = asChild ? Slot : "div";

    return createPortal(
      <Comp
        ref={(node: any) => {
          floatingRef(node);
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as any).current = node;
        }}
        className={cn(menuContentVariants({ className }))}
        style={{ ...floatingStyles, zIndex: 1000 }}
        role="menu"
        onKeyDown={handleContentKeyDown}
        {...props}
      >
        {children}
      </Comp>,
      document.body
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
  (
    { className, trigger, children, disabled, scrollBehavior, ...props },
    ref
  ) => {
    const { variant, scrollBehavior: contextBehavior } = useMenu();
    const activeScrollBehavior =
      scrollBehavior || contextBehavior || "reposition";
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
          <SubMenuContent
            parentRef={innerRef}
            variant={variant}
            scrollBehavior={activeScrollBehavior}
          >
            {children}
          </SubMenuContent>
        )}
      </div>
    );
  }
);
export function SubMenuContent({
  parentRef,
  variant,
  children,
  scrollBehavior: propBehavior,
}: {
  parentRef: React.RefObject<HTMLDivElement | null>;
  variant: any;
  children: React.ReactNode;
  scrollBehavior?: "close" | "reposition";
}) {
  const { scrollBehavior: contextBehavior, setIsOpen } = useMenu();
  const scrollBehavior = propBehavior || contextBehavior || "reposition";

  const { referenceRef, floatingRef, floatingStyles } = useAutoPosition({
    isOpen: true,
    side: "right",
    align: "start",
    sideOffset: -4, // Slight overlap
    strategy: "fixed",
    scrollBehavior,
    onScroll: () => setIsOpen(false),
  });

  React.useLayoutEffect(() => {
    if (parentRef.current) {
      referenceRef(parentRef.current);
    }
  }, [parentRef, referenceRef]);

  return createPortal(
    <div
      ref={floatingRef}
      role="menu"
      data-submenu-content=""
      className={cn(
        menuContentVariants({ variant }),
        "z-1001 min-w-[max(8rem,var(--aer-submenu-parent-width,0px))] animate-in fade-in zoom-in-95"
      )}
      style={{
        ...floatingStyles,
        // We can still pass the width variable if needed, but useAutoPosition should handle positioning
      }}
    >
      <div
        className="absolute inset-y-0 -left-2 w-2"
        onMouseEnter={() => {}} // Bridge gap for hover
      />
      {children}
    </div>,
    document.body
  );
}

SubMenu.displayName = "SubMenu";
