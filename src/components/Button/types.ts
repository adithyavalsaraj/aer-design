import * as React from "react";
import { type ButtonVariantProps } from "./variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  isLoading?: boolean;
}
