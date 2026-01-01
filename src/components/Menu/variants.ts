import { cva } from "class-variance-authority";

export const menuContentVariants = cva(
  "absolute z-[100] min-w-[8rem] whitespace-nowrap rounded-md border border-aer-border bg-aer-background p-1 text-aer-foreground shadow-md animate-in fade-in-0 zoom-in-95",
  {
    variants: {
      // Add variants here if needed later (e.g. size, flavor)
    },
    defaultVariants: {},
  }
);

export const menuItemVariants = cva(
  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-aer-muted hover:text-aer-accent-foreground focus-visible:bg-aer-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      inset: {
        true: "pl-8",
        false: "",
      },
      variant: {
        default: "",
        destructive:
          "text-red-500 hover:text-red-600 focus:text-red-600 focus:bg-red-100 dark:focus:bg-red-900/20",
      },
    },
    defaultVariants: {
      inset: false,
      variant: "default",
    },
  }
);
