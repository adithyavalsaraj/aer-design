import { cva } from "class-variance-authority";

export const tooltipVariants = cva(
  "absolute z-50 px-3 py-1.5 text-sm rounded-md shadow-lg animate-in fade-in-0 zoom-in-95 pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-aer-popover text-aer-popover-foreground border border-aer-border",
        dark: "bg-gray-900 text-white border border-gray-800",
        light: "bg-white text-gray-900 border border-gray-200 shadow-xl",
        aer: "bg-white/10 backdrop-blur-md border border-white/10 text-white shadow-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const tooltipArrowVariants = cva("absolute w-3 h-3 rotate-45 z-0", {
  variants: {
    variant: {
      default: "bg-aer-popover border border-aer-border",
      dark: "bg-gray-900 border border-gray-800",
      light: "bg-white border border-gray-200",
      aer: "bg-white/10 backdrop-blur-md border border-white/10",
    },
    side: {
      top: "bottom-[-6px] border-b-0 border-r-0",
      bottom: "top-[-6px] border-t-0 border-l-0",
      left: "right-[-6px] border-r-0 border-t-0",
      right: "left-[-6px] border-l-0 border-b-0",
    },
  },
  defaultVariants: {
    variant: "default",
    side: "top",
  },
});
