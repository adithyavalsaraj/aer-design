import { useState } from "react";
import { cn } from "../../lib/utils";
import { useTabs } from "./TabsContext";
import type { TabContentProps } from "./types";

export const TabContent = ({
  className,
  value,
  children,
  forceMount,
  lazy,
  ...props
}: TabContentProps) => {
  const { value: activeValue, headless, variant } = useTabs();
  const isActive = activeValue === value;
  const [hasBeenActive, setHasBeenActive] = useState(false);

  if (isActive && !hasBeenActive) {
    setHasBeenActive(true);
  }

  const shouldRender = forceMount || isActive || (lazy && hasBeenActive);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      data-state={isActive ? "active" : "inactive"}
      hidden={!isActive}
      className={cn(
        "mt-2 ring-offset-aer-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aer-ring focus-visible:ring-offset-2",
        !headless &&
          variant === "aer" &&
          "bg-white/5 backdrop-blur-md rounded-aer-xl p-6 border border-white/10 shadow-xl text-aer-foreground mt-4",
        !headless &&
          isActive &&
          "animate-in fade-in slide-in-from-bottom-2 duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
