import { cva } from "class-variance-authority";

export const popoverContentVariants = cva(
  "rounded-lg border shadow-lg z-50 outline-none",
  {
    variants: {
      variant: {
        default: "bg-aer-background border-aer-border text-aer-foreground",
        dark: "bg-gray-900 border-gray-800 text-white",
        light: "bg-white border-gray-200 text-gray-900",
        aer: "bg-aer-background/80 backdrop-blur-xl border-aer-border shadow-aer text-aer-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const popoverArrowVariants = cva("absolute w-2 h-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-aer-background border-aer-border",
      dark: "bg-gray-900 border-gray-800",
      light: "bg-white border-gray-200",
      aer: "bg-aer-background/80 border-aer-border",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
