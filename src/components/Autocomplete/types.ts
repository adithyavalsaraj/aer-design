import * as React from "react";
import type { DropdownOption, DropdownOptionItem } from "../Dropdown/Dropdown";

/**
 * Data source mode for autocomplete filtering
 */
export type DataSourceMode = "local" | "remote" | "mixed";

/**
 * Selection mode for autocomplete
 */
export type SelectionMode = "single" | "multiple" | "tags";

/**
 * Autocomplete option (extends DropdownOptionItem for compatibility)
 */
export type AutocompleteOption = DropdownOptionItem;

/**
 * Props passed to custom option renderer
 */
export interface RenderOptionProps {
  /** The option being rendered */
  option: AutocompleteOption;
  /** Whether this option is currently selected */
  selected: boolean;
  /** Whether this option is the active/focused option */
  active: boolean;
  /** Whether this option is disabled */
  disabled: boolean;
  /** The current search query for highlighting */
  query: string;
  /** Click handler for selection */
  onClick: (e: React.MouseEvent) => void;
}

/**
 * Props passed to custom group label renderer
 */
export interface RenderGroupLabelProps {
  /** The group label text */
  label: string;
  /** Number of items in this group */
  itemCount: number;
}

/**
 * Props passed to custom selected value renderer
 */
export interface RenderSelectedValueProps {
  /** Selected value(s) */
  value: string | number | (string | number)[];
  /** Selected option(s) */
  options: AutocompleteOption[];
  /** Selection mode */
  mode: SelectionMode;
}

/**
 * Autocomplete component props
 */
export interface AutocompleteProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "prefix" | "size"
  > {
  // --- Data & Options ---
  /** List of options to display */
  options: DropdownOption[];
  /** Data source mode: local filtering, remote fetching, or mixed */
  dataSource?: DataSourceMode;
  /** Custom filter function for local filtering */
  filterOption?: (query: string, option: AutocompleteOption) => boolean;

  // --- Value & Selection ---
  /** Controlled value */
  value?: string | number | (string | number)[];
  /** Default value for uncontrolled mode */
  defaultValue?: string | number | (string | number)[];
  /** Callback when selection changes */
  onChange?: (value: string | number | (string | number)[]) => void;
  /** Selection mode */
  mode?: SelectionMode;
  /** Maximum number of selections (for multiple/tags mode) */
  maxSelections?: number;

  // --- Input Control ---
  /** Controlled input value (search query) */
  inputValue?: string;
  /** Default input value */
  defaultInputValue?: string;
  /** Callback when input value changes */
  onInputChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;

  // --- Search & Filtering ---
  /** Callback for remote search (receives debounced query) */
  onSearch?: (query: string) => void;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Minimum characters before triggering search */
  minChars?: number;

  // --- UI & Behavior ---
  /** Whether to close dropdown on selection */
  closeOnSelect?: boolean;
  /** Whether the input can be cleared */
  clearable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state (shows value but cannot be changed) */
  readOnly?: boolean;
  /** Error state or message */
  error?: boolean | string;

  // --- Styling & Variants ---
  /** Visual variant */
  variant?: "outline" | "filled" | "underlined" | "aer";
  /** Size */
  size?: "sm" | "default" | "lg";

  // --- Label & Help ---
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: "top" | "left";
  /** Label alignment when position is left */
  labelAlign?: "start" | "center" | "end";
  /** Fixed width for label when position is left */
  labelWidth?: string;
  /** Whether field is required */
  required?: boolean;
  /** Helper text */
  helperText?: string;
  /** Helper text class name */
  helperTextClassName?: string;

  // --- Icons & Addons ---
  /** Icon at the start of input */
  startIcon?: React.ReactNode;
  /** Icon at the end of input (before chevron) */
  endIcon?: React.ReactNode;
  /** Prefix content inside input */
  prefix?: React.ReactNode;
  /** Suffix content inside input */
  suffix?: React.ReactNode;
  /** Content before the input field */
  addonBefore?: React.ReactNode;
  /** Content after the input field */
  addonAfter?: React.ReactNode;

  // --- Custom Rendering ---
  /** Custom option renderer */
  renderOption?: (props: RenderOptionProps) => React.ReactNode;
  /** Custom group label renderer */
  renderGroupLabel?: (props: RenderGroupLabelProps) => React.ReactNode;
  /** Custom selected value renderer (for trigger display) */
  renderSelectedValue?: (props: RenderSelectedValueProps) => React.ReactNode;
  /** Custom empty state renderer */
  renderEmpty?: (query: string) => React.ReactNode;
  /** Custom loading state renderer */
  renderLoading?: () => React.ReactNode;
  /** Custom error state renderer */
  renderError?: (error: any) => React.ReactNode;

  // --- Advanced ---
  /** Virtualization support */
  virtualized?: boolean;
  /** Item height for virtualization */
  itemHeight?: number;
  /** Callback to load more items (infinite scroll) */
  onLoadMore?: () => void;
  /** Whether there are more items to load */
  hasMore?: boolean;
  /** Scroll behavior when page scrolls */
  scrollBehavior?: "close" | "reposition";
  /** Whether to match the width of the dropdown to the input trigger width */
  matchTriggerWidth?: boolean;
  /** Allow creating custom values in tags mode */
  allowCustomValues?: boolean;

  // --- Class Names ---
  /** Root container class name */
  className?: string;
  /** Container class name (deprecated, use className) */
  containerClassName?: string;
  /** Input wrapper class name */
  inputClassName?: string;
  /** Trigger class name */
  triggerClassName?: string;
  /** Label class name */
  labelClassName?: string;
  /** Dropdown menu class name */
  menuClassName?: string;
  /** Individual item class name */
  itemClassName?: string;
  /** Icon class name */
  iconClassName?: string;
  /** Addon class name */
  addonClassName?: string;
  /** Error message class name */
  errorClassName?: string;
}
