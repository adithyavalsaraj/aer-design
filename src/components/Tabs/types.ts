import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type TabVariant = "default" | "aer" | "pills" | "underline" | "cards";
export type TabOrientation = "horizontal" | "vertical";

export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** The default active tab value (uncontrolled) */
  defaultValue?: string;
  /** The currently active tab value (controlled) */
  value?: string;
  /** Callback when tab changes */
  onValueChange?: (value: string) => void;
  /** Orientation of the tabs */
  orientation?: TabOrientation;
  /** Visual style variant */
  variant?: TabVariant;
  /** Pass items array for data-driven rendering */
  items?: TabItem[];
  /** If true, unstyled */
  headless?: boolean;
  /** If true, all tab contents are mounted initially */
  forceMount?: boolean;
  /** If true, tab contents are only mounted when first activated */
  lazy?: boolean;
}

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** If true, content stays mounted when inactive (display: none) instead of unmounting */
  forceMount?: boolean;
  /** If true, content is only rendered when it becomes active for the first time */
  lazy?: boolean;
}
