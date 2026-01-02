import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { type tooltipVariants } from "./variants.ts";

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Preferred side of the trigger to display the tooltip */
  side?: "top" | "bottom" | "left" | "right";
  /** Alignment relative to the trigger */
  align?: "start" | "center" | "end";
  /** Distance in pixels from the trigger */
  sideOffset?: number;
  /** Delay in ms before showing the tooltip */
  showDelay?: number;
  /** Delay in ms before hiding the tooltip */
  hideDelay?: number;
  /** How the tooltip is triggered */
  trigger?: "hover" | "click";
  /** Whether to show an arrow pointing to the trigger */
  arrow?: boolean;
  /** Disable the tooltip */
  disabled?: boolean;
}
