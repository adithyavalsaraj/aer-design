import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { useTabs } from "./TabsContext";
import type { TabTriggerProps } from "./types";

export const TabTrigger = ({
  className,
  value,
  disabled,
  icon,
  children,
  ...props
}: TabTriggerProps) => {
  const { value: activeValue, onValueChange, variant, headless } = useTabs();
  const isActive = activeValue === value;
  const ref = useRef<HTMLButtonElement>(null);

  const prevActiveValue = useRef(activeValue);

  useEffect(() => {
    if (isActive && activeValue !== prevActiveValue.current && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
    prevActiveValue.current = activeValue;
  }, [isActive, activeValue]);

  const handleClick = () => {
    if (!disabled) {
      onValueChange(value);
    }
  };

  // Variant Styles
  const getVariantStyles = () => {
    if (headless) return "";

    const base =
      "group inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring disabled:pointer-events-none disabled:opacity-50 snap-start";

    switch (variant) {
      case "default":
        return cn(
          base,
          "border-b-2 border-transparent hover:text-aer-foreground/80",
          isActive
            ? "border-aer-primary text-aer-primary"
            : "text-aer-muted-foreground"
        );
      case "underline":
        return cn(
          base,
          "relative",
          isActive
            ? "text-aer-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-aer-primary after:content-['']"
            : "text-aer-muted-foreground hover:text-aer-foreground"
        );
      case "pills":
        return cn(
          base,
          "rounded-full",
          isActive
            ? "bg-aer-primary text-aer-primary-foreground shadow-sm"
            : "bg-transparent text-aer-muted-foreground hover:bg-aer-muted hover:text-aer-foreground"
        );
      case "cards":
        return cn(
          base,
          "rounded-sm",
          isActive
            ? "bg-aer-background text-aer-foreground shadow-sm"
            : "text-aer-muted-foreground hover:text-aer-foreground"
        );
      case "aer":
        return cn(
          base,
          "rounded-full px-5",
          isActive
            ? "bg-white/20 text-white shadow-inner font-semibold"
            : "text-white/70 hover:text-white hover:bg-white/10"
        );
      default:
        return base;
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      data-state={isActive ? "active" : "inactive"}
      className={cn(getVariantStyles(), className)}
      onClick={handleClick}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "mr-2",
            isActive && variant === "aer" ? "animate-pulse" : ""
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </button>
  );
};
