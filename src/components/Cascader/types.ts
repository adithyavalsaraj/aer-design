import * as React from "react";

export interface CascaderOption {
  /**
   * Label to display for the option.
   */
  label: string;
  /**
   * Unique value for the option.
   */
  value: string | number;
  /**
   * Nested options.
   */
  children?: CascaderOption[];
  /**
   * Whether the option is disabled.
   */
  disabled?: boolean;
  /**
   * Optional icon to display.
   */
  icon?: React.ReactNode;
  /**
   * explicit leaf option (useful for dynamic loading)
   */
  isLeaf?: boolean;
}

export interface CascaderProps {
  /**
   * Hierarchical data options.
   */
  options: CascaderOption[];
  /**
   * Selected value (leaf node value).
   */
  value?: string | number;
  /**
   * Callback when a leaf option is selected.
   */
  onChange?: (value: string | number) => void;
  /**
   * Placeholder text when no value is selected.
   */
  placeholder?: string;
  /**
   * Custom function to render the display text in the trigger.
   * Receives the path labels (e.g. ['North America', 'USA']).
   */
  displayRender?: (labels: string[]) => React.ReactNode;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Additional class names for the trigger.
   */
  className?: string;
  /**
   * CSS classes for the trigger element.
   */
  triggerClassName?: string;
  /**
   * CSS classes for the menu container.
   */
  menuClassName?: string;
  /**
   * CSS classes for individual menu items.
   */
  itemClassName?: string;
  /**
   * CSS classes for icons.
   */
  iconClassName?: string;
  /**
   * CSS classes for the label element.
   */
  labelClassName?: string;
  /**
   * CSS classes for the error message.
   */
  errorClassName?: string;
  /**
   * Visual variant.
   */
  variant?: "outline" | "filled" | "underlined";
  /**
   * Size of the trigger.
   */
  size?: "sm" | "default" | "lg";
  /**
   * Error state.
   */
  error?: boolean | string;
  /**
   * Label text to display.
   */
  label?: string;
  /**
   * Position of the label relative to the input.
   * @default "top"
   */
  labelPosition?: "top" | "left";
  /**
   * Vertical alignment of label when position is "left".
   * @default "center"
   */
  labelAlign?: "start" | "center" | "end";
  /**
   * Fixed width for label when position is "left".
   */
  labelWidth?: string;
  /**
   * Whether the field is required (shows asterisk).
   */
  required?: boolean;
  /**
   * Helper text to display below the input.
   */
  helperText?: string;
  /**
   * CSS classes for the helper text.
   */
  helperTextClassName?: string;
  /**
   * Whether the selection can be cleared.
   */
  clearable?: boolean;
  /**
   * Whether the component is in a loading state.
   */
  loading?: boolean;
  /**
   * Callback to load data lazily for a specific option.
   */
  loadData?: (option: CascaderOption) => Promise<void> | void;
  /**
   * Icon to display at the start of the trigger.
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the trigger (before chevron).
   */
  endIcon?: React.ReactNode;
  /**
   * Content to display before the input (within the trigger).
   */
  prefix?: React.ReactNode;
  /**
   * Content to display after the input (within the trigger).
   */
  suffix?: React.ReactNode;
  /**
   * Content to display before the trigger (outside).
   */
  addonBefore?: React.ReactNode;
  /**
   * Content to display after the trigger (outside).
   */
  addonAfter?: React.ReactNode;
  /**
   * Whether to enable virtualization for large lists.
   */
  virtualized?: boolean;
  /**
   * Height of each item in pixels (required for virtualization).
   * @default 32
   */
  itemHeight?: number;
}
