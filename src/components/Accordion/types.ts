import type { HTMLAttributes, ReactNode } from "react";

export type AccordionVariant =
  | "default"
  | "aer"
  | "bordered"
  | "filled"
  | "ghost";
export type AccordionSize = "sm" | "md" | "lg";
export type ExpandOn = "header" | "icon" | "button" | "manual";
export type IconPosition = "start" | "end";

/**
 * Template props passed to render functions
 */
export interface AccordionTemplateProps {
  index: number;
  isActive: boolean;
  isDisabled: boolean;
  toggle: () => void;
  props: AccordionTabProps;
}

/**
 * Individual accordion item for data-driven rendering
 */
export interface AccordionItem {
  id: string;
  header: ReactNode;
  content: ReactNode;
  disabled?: boolean;
  icon?: ReactNode;
}

/**
 * Ref API for imperative control
 */
export interface AccordionRefAPI {
  /** Expand a specific tab by index */
  expand: (index: number) => void;
  /** Collapse a specific tab by index */
  collapse: (index: number) => void;
  /** Toggle a specific tab by index */
  toggle: (index: number) => void;
  /** Expand all tabs (only works in multiple mode) */
  expandAll: () => void;
  /** Collapse all tabs */
  collapseAll: () => void;
  /** Get currently active indices */
  getActiveIndices: () => number | number[] | null;
}

/**
 * Main Accordion component props
 */
export interface AccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Visual variant */
  variant?: AccordionVariant;
  /** Size variant */
  size?: AccordionSize;
  /** Allow multiple tabs to be open simultaneously */
  multiple?: boolean;
  /** Default active index (uncontrolled) - number for single mode, number[] for multiple mode */
  defaultActiveIndex?: number | number[] | null;
  /** Active index (controlled) - number for single mode, number[] for multiple mode */
  activeIndex?: number | number[] | null;
  /** Callback when active tab changes */
  onTabChange?: (activeIndex: number | number[] | null) => void;
  /** Disable all tabs */
  disabled?: boolean;
  /** Allow closing the last open tab (only in single mode) */
  collapsible?: boolean;
  /** Items for data-driven rendering */
  items?: AccordionItem[];
  /** Headless mode - no default styling */
  headless?: boolean;
  /** Icon position */
  iconPosition?: IconPosition;
  /** Interaction mode */
  expandOn?: ExpandOn;
  /** Custom expand icon */
  expandIcon?: ReactNode;
  /** Custom collapse icon */
  collapseIcon?: ReactNode;
  /** Rotate icon when expanded (default: true for default icon, false for custom icons) */
  rotateIcon?: boolean;
  /** Lazy render content (mount only when first expanded) */
  lazy?: boolean;
  /** Unmount content when collapsed */
  unmountOnCollapse?: boolean;
  /** Callback when a tab expands */
  onExpand?: (index: number) => void;
  /** Callback when a tab collapses */
  onCollapse?: (index: number) => void;
  /** Granular styling for root */
  classNames?: {
    root?: string;
    tab?: string;
    header?: string;
    content?: string;
    icon?: string;
  };
  /** Granular inline styles */
  styles?: {
    root?: React.CSSProperties;
    tab?: React.CSSProperties;
    header?: React.CSSProperties;
    content?: React.CSSProperties;
    icon?: React.CSSProperties;
  };
}

/**
 * Individual AccordionTab component props
 */
export interface AccordionTabProps extends HTMLAttributes<HTMLDivElement> {
  /** Unique identifier for this tab */
  value?: string;
  /** Header content */
  header?: ReactNode;
  /** Disable this specific tab */
  disabled?: boolean;
  /** Custom icon for this tab */
  icon?: ReactNode;
  /** Header template render function */
  headerTemplate?: (props: AccordionTemplateProps) => ReactNode;
  /** Content template render function */
  contentTemplate?: (props: AccordionTemplateProps) => ReactNode;
  /** Icon template render function */
  iconTemplate?: (props: AccordionTemplateProps) => ReactNode;
  /** Granular className for header */
  headerClassName?: string;
  /** Granular className for content */
  contentClassName?: string;
  /** Granular className for icon */
  iconClassName?: string;
  /** Granular inline style for header */
  headerStyle?: React.CSSProperties;
  /** Granular inline style for content */
  contentStyle?: React.CSSProperties;
  /** Granular inline style for icon */
  iconStyle?: React.CSSProperties;
  /** Lazy render (override parent) */
  lazy?: boolean;
  /** Unmount on collapse (override parent) */
  unmountOnCollapse?: boolean;
  /** Rotate icon when expanded (override parent) */
  rotateIcon?: boolean;
  /** Internal: Index within parent accordion (set by parent) */
  index?: number;
}

/**
 * Internal context type
 */
export interface AccordionContextType {
  activeIndices: number[];
  multiple: boolean;
  variant: AccordionVariant;
  size: AccordionSize;
  disabled: boolean;
  headless: boolean;
  iconPosition: IconPosition;
  expandOn: ExpandOn;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  rotateIcon?: boolean;
  lazy: boolean;
  unmountOnCollapse: boolean;
  collapsible: boolean;
  toggleTab: (index: number) => void;
  onExpand?: (index: number) => void;
  onCollapse?: (index: number) => void;
  classNames?: AccordionProps["classNames"];
  styles?: AccordionProps["styles"];
  registerTab: (index: number) => void;
  unregisterTab: (index: number) => void;
  focusTab: (index: number) => void;
  tabRefs: Map<number, HTMLButtonElement | null>;
}
