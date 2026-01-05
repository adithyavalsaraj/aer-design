import { useAerConfig } from "@/components/AerConfigProvider";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

// --- Variants ---

const navbarVariants = cva(
  "flex bg-aer-background border-aer-border z-40 transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-aer-background border-aer-border",
        aer: "bg-white/5 backdrop-blur-xl border-white/10 text-white shadow-lg",
      },
      position: {
        top: "border-b inset-x-0 top-0",
        bottom: "border-t inset-x-0 bottom-0",
      },
      mode: {
        fixed: "fixed",
        sticky: "sticky top-0",
        static: "static",
        absolute: "absolute",
        floating:
          "fixed m-4 rounded-aer-xl border shadow-xl w-[calc(100%-2rem)]",
      },
      size: {
        default: "h-16 px-4",
        sm: "h-14 px-3",
        lg: "h-20 px-6",
        auto: "h-auto p-4", // Useful for multiline mobile navs
      },
    },
    compoundVariants: [
      {
        mode: "floating",
        position: "top",
        className: "top-0",
      },
      {
        mode: "floating",
        position: "bottom",
        className: "bottom-0",
      },
    ],
    defaultVariants: {
      position: "top",
      mode: "sticky",
      size: "default",
      variant: "default",
    },
  }
);

// --- Context ---
interface NavbarContextValue {
  variant?: "default" | "aer";
}
const NavbarContext = React.createContext<NavbarContextValue>({
  variant: "default",
});

// --- Types ---

export interface NavbarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {
  align?: "start" | "center" | "end";
}

// --- Main Component ---

const Navbar = React.forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      className,
      position,
      mode,
      size: sizeProp,
      align = "center",
      children,
      ...props
    },
    ref
  ) => {
    const { size: globalSize } = useAerConfig();
    const size = sizeProp || globalSize;

    return (
      <NavbarContext.Provider value={{ variant: props.variant || "default" }}>
        <header
          ref={ref}
          className={cn(
            navbarVariants({ position, mode, size, variant: props.variant }),
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "flex w-full items-center gap-2 mx-auto max-w-7xl",
              align === "center" && "justify-center",
              align === "start" && "justify-start",
              align === "end" && "justify-end"
            )}
          >
            {children}
          </div>
        </header>
      </NavbarContext.Provider>
    );
  }
);
Navbar.displayName = "Navbar";

// --- Sub-components ---

// NavbarItem - specifically designed for horizontal layouts
interface NavbarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
}

const NavbarItem = React.forwardRef<HTMLButtonElement, NavbarItemProps>(
  ({ className, icon, active, children, ...props }, ref) => {
    const { variant } = React.useContext(NavbarContext);

    return (
      <button
        ref={ref}
        className={cn(
          "group flex items-center gap-2 rounded-aer-md text-sm font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-aer-ring px-3 py-2",
          active
            ? variant === "aer"
              ? "bg-white/20 text-white shadow-md border border-white/10"
              : "bg-aer-primary/10 text-aer-primary"
            : variant === "aer"
            ? "text-white/70 hover:bg-white/10 hover:text-white"
            : "text-aer-muted-foreground hover:bg-aer-muted hover:text-aer-foreground",
          className
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              "flex items-center justify-center shrink-0 size-4 transition-transform duration-200",
              !active && "group-hover:scale-110"
            )}
          >
            {icon}
          </span>
        )}
        {children && <span>{children}</span>}
      </button>
    );
  }
);
NavbarItem.displayName = "NavbarItem";

const NavbarSection = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

// Spacer to push content apart (e.g., logo left, nav right)
const NavbarSpacer = () => <div className="flex-1" />;

export { Navbar, NavbarItem, NavbarSection, NavbarSpacer };
