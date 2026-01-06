import * as React from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarVariant = "filled" | "outline" | "soft" | "ghost" | "aer";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt?: string;
  /** Custom fallback initials or text */
  initials?: string;
  /** Size of the avatar */
  size?: AvatarSize;
  /** Visual variant */
  variant?: AvatarVariant;
  /** Current user status */
  status?: AvatarStatus;
  /** Border radius style */
  rounded?: "sm" | "md" | "lg" | "full";
  /** Custom icon to show if image fails and no initials provided */
  fallbackIcon?: React.ReactNode;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of avatars in the group */
  size?: AvatarSize;
  /** Variant of avatars in the group */
  variant?: AvatarVariant;
  /** Maximum number of avatars to show before truncation */
  maxCount?: number;
  /** Spacing between avatars (negative for overlap) */
  spacing?: number;
  /** Border radius for avatars in the group */
  rounded?: "sm" | "md" | "lg" | "full";
}
