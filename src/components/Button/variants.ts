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
          "border border-aer-input bg-aer-background shadow-sm hover:bg-aer-accent hover:text-aer-accent-foreground active:bg-aer-accent/10",
        secondary:
          "bg-aer-secondary text-aer-secondary-foreground shadow-sm hover:bg-aer-secondary/80",
        ghost: "hover:bg-aer-accent hover:text-aer-accent-foreground",
        link: "text-aer-primary underline-offset-4 hover:underline",
        aer: "relative bg-white/10 backdrop-blur-md border border-white/20 text-aer-foreground shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:bg-white/20 hover:border-white/30 transition-shadow duration-300",
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
