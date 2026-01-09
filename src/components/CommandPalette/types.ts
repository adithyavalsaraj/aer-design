import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface CommandItem {
  id: string;
  title: string;
  category?: string;
  icon?: LucideIcon | ReactNode;
  description?: string;
  keywords?: string[];
  /**
   * Optional callback when item is selected.
   * If provided, prevents default action like internal navigation.
   */
  onSelect?: (item: CommandItem) => void;
  /**
   * Optional URL to navigate to when selected.
   */
  url?: string;
  /**
   * Additional metadata for custom logic
   */
  metadata?: Record<string, any>;
}

export interface CommandGroup {
  name: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /**
   * List of items to search through
   */
  items: CommandItem[];
  /**
   * Whether the palette is visible
   */
  isOpen: boolean;
  /**
   * Called when the palette should close
   */
  onClose: () => void;
  /**
   * Placeholder for the search input
   */
  placeholder?: string;
  /**
   * Custom renderer for individual items
   */
  renderItem?: (item: CommandItem, isActive: boolean) => ReactNode;
  /**
   * Visual variant
   */
  variant?: "default" | "aer";
  /**
   * Whether to show categories as headers
   */
  showCategories?: boolean;
  /**
   * Callback when an item is selected
   */
  onSelect?: (item: CommandItem) => void;
}
