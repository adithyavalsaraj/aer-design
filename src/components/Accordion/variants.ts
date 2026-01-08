import { cva, type VariantProps } from "class-variance-authority";

export const accordionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "",
      aer: "",
      bordered: "border border-aer-border rounded-lg overflow-hidden",
      filled: "bg-aer-surface rounded-lg overflow-hidden",
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export const accordionTabVariants = cva(
  "border-b border-aer-border last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        aer: "border-aer-border/30",
        bordered: "",
        filled: "",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const accordionHeaderVariants = cva(
  [
    "w-full flex items-center justify-between gap-3",
    "text-left font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-aer-muted/50",
        aer: [
          "bg-aer-surface/30 backdrop-blur-md border border-aer-border/30",
          "hover:bg-aer-surface/40 hover:border-aer-border/50",
        ],
        bordered: "hover:bg-aer-muted/30",
        filled: "bg-aer-muted hover:bg-aer-muted/80",
        ghost: "hover:bg-aer-muted/20",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed hover:bg-transparent",
        false: "cursor-pointer",
      },
      expanded: {
        true: "",
        false: "",
      },
      size: {
        sm: "px-3 py-2 text-sm gap-2",
        md: "px-4 py-3 text-base gap-3",
        lg: "px-5 py-4 text-lg gap-4",
      },
    },
    compoundVariants: [
      {
        variant: "aer",
        expanded: true,
        className: "bg-aer-surface/50 border-aer-border/60",
      },
      {
        variant: "filled",
        expanded: true,
        className: "bg-aer-muted",
      },
      {
        variant: "default",
        expanded: true,
        className: "bg-aer-muted/30",
      },
    ],
    defaultVariants: {
      variant: "default",
      disabled: false,
      expanded: false,
      size: "md",
    },
  }
);

export const accordionContentVariants = cva(
  ["overflow-hidden transition-all duration-300 ease-in-out"],
  {
    variants: {
      variant: {
        default: "bg-aer-background",
        aer: "bg-aer-surface/10 backdrop-blur-sm",
        bordered: "bg-aer-background",
        filled: "bg-aer-muted/30",
        ghost: "bg-transparent",
      },
      expanded: {
        true: "animate-accordion-down",
        false: "animate-accordion-up",
      },
    },
    defaultVariants: {
      variant: "default",
      expanded: false,
    },
  }
);

export const accordionIconVariants = cva(
  "transition-transform duration-300 ease-in-out shrink-0",
  {
    variants: {
      expanded: {
        true: "rotate-180",
        false: "rotate-0",
      },
      position: {
        start: "order-first",
        end: "order-last",
      },
    },
    defaultVariants: {
      expanded: false,
      position: "end",
    },
  }
);

export type AccordionVariantsProps = VariantProps<typeof accordionVariants>;
export type AccordionTabVariantsProps = VariantProps<
  typeof accordionTabVariants
>;
export type AccordionHeaderVariantsProps = VariantProps<
  typeof accordionHeaderVariants
>;
export type AccordionContentVariantsProps = VariantProps<
  typeof accordionContentVariants
>;
export type AccordionIconVariantsProps = VariantProps<
  typeof accordionIconVariants
>;
