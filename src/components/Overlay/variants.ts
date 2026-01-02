import { cva } from "class-variance-authority";

export const overlayVariants = cva(
  "z-50 rounded-lg border border-aer-border bg-aer-popover text-aer-popover-foreground shadow-lg outline-none animate-in fade-in-0 zoom-in-95 max-w-[calc(100vw-2rem)]",
  {
    variants: {
      strategy: {
        fixed: "fixed",
        absolute: "absolute",
      },
    },
    defaultVariants: {
      strategy: "fixed",
    },
  }
);

export const backdropVariants = cva(
  "fixed inset-0 z-40 bg-black/50 animate-in fade-in-0",
  {
    variants: {},
    defaultVariants: {},
  }
);
