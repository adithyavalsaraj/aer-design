import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { menuContentVariants, menuItemVariants } from "./variants.ts";

export interface MenuContextValue {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeMenu: () => void;
  openMenu: () => void;
  toggleMenu: () => void;
  variant: "default" | "aer";
  triggerRef: React.RefObject<HTMLElement | null>;
  scrollBehavior?: "close" | "reposition";
}

export interface MenuProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "aer";
  scrollBehavior?: "close" | "reposition";
}

export interface MenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface MenuContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuContentVariants> {
  align?: "start" | "end" | "center";
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  asChild?: boolean;
  /** Behavior when the page or parent container scrolls. @default "reposition" */
  scrollBehavior?: "close" | "reposition";
}

export interface MenuItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuItemVariants> {
  asChild?: boolean;
  inset?: boolean;
  disabled?: boolean;
}

export interface MenuGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface MenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  inset?: boolean;
  asChild?: boolean;
}

export interface MenuSeparatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export interface SubMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
  scrollBehavior?: "close" | "reposition";
}
