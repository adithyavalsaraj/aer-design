import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-aer-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-aer-primary text-aer-primary-foreground shadow-sm hover:brightness-110 active:brightness-90",
        destructive:
          "bg-aer-destructive text-aer-destructive-foreground shadow-sm hover:bg-aer-destructive/90",
        outline:
          "border border-aer-primary text-aer-primary bg-aer-background shadow-sm hover:bg-aer-primary hover:text-aer-primary-foreground",
        secondary:
          "bg-aer-secondary text-aer-secondary-foreground shadow-sm hover:bg-aer-secondary/80",
        ghost: "hover:bg-aer-accent hover:text-aer-accent-foreground",
        link: "text-aer-primary underline-offset-4 hover:underline",
        aer: "relative bg-white/5 backdrop-blur-xl border border-white/10 text-white shadow-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 ring-1 ring-white/5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-aer-sm px-3",
        lg: "h-11 rounded-aer-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
