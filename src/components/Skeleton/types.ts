import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The shape of the skeleton.
   * @default "text"
   */
  variant?: SkeletonVariant;

  /**
   * The animation effect.
   * @default "pulse"
   */
  animation?: SkeletonAnimation;

  /**
   * Width of the skeleton.
   * If not provided, it will grow to fill the container.
   */
  width?: string | number;

  /**
   * Height of the skeleton.
   * If not provided, it will default based on the variant.
   */
  height?: string | number;

  /**
   * Custom border radius.
   * @default "4px" for rounded, "0" for rectangular, "50%" for circular
   */
  borderRadius?: string | number;
}
