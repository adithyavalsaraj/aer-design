import type { HTMLAttributes } from "react";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerLabelPlacement = "start" | "center" | "end";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The orientation of the divider.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;

  /**
   * The visual style of the divider line.
   * @default "solid"
   */
  variant?: DividerVariant;

  /**
   * The thickness of the divider line.
   * Can be any valid CSS value (e.g., "1px", "2px", "0.5rem").
   * @default "1px"
   */
  thickness?: string;

  /**
   * The color of the divider.
   * Defaults to the theme's border color.
   */
  color?: string;

  /**
   * Where to place the label (children) relative to the line.
   * Only applicable when children are provided and orientation is "horizontal".
   * @default "center"
   */
  labelPlacement?: DividerLabelPlacement;

  /**
   * Gap between the label and the divider lines.
   * @default "1rem"
   */
  labelGap?: string;
}
