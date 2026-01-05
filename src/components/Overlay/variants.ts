import { cva } from "class-variance-authority";

export const overlayVariants = cva(
  "z-[999] rounded-lg shadow-lg outline-none animate-in fade-in-0 zoom-in-95 max-w-[calc(100vw-2rem)]",
  {
    variants: {
      strategy: {
        fixed: "fixed",
        absolute: "absolute",
      },
      variant: {
        default:
          "border border-aer-border bg-aer-popover text-aer-popover-foreground",
        aer: "border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl text-white ring-1 ring-white/10",
      },
    },
    defaultVariants: {
      strategy: "fixed",
      variant: "default",
    },
  }
);

export const backdropVariants = cva(
  "fixed inset-0 z-[998] bg-black/50 animate-in fade-in-0",
  {
    variants: {},
    defaultVariants: {},
  }
);
