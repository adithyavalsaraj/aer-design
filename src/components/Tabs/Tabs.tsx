import { useState } from "react";
import { cn } from "../../lib/utils";
import { TabContent } from "./TabContent";
import { TabList } from "./TabList";
import { TabsContext } from "./TabsContext";
import { TabTrigger } from "./TabTrigger";
import type { TabsProps } from "./types";

export const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  orientation = "horizontal",
  variant = "default",
  items,
  headless = false,
  forceMount,
  lazy,
  className,
  children,
  ...props
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue || (items && items.length > 0 ? items[0].value : "") || ""
  );

  const isControlled = value !== undefined;
  const activeValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  // If items are provided, render them automatically
  const renderItems = () => {
    if (!items || items.length === 0) return null;

    return (
      <>
        <TabList>
          {items.map((item) => (
            <TabTrigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              icon={item.icon}
            >
              {item.label}
            </TabTrigger>
          ))}
        </TabList>
        {items.map((item) => (
          <TabContent
            key={item.value}
            value={item.value}
            forceMount={forceMount}
            lazy={lazy}
          >
            {item.content}
          </TabContent>
        ))}
      </>
    );
  };

  return (
    <TabsContext.Provider
      value={{
        value: activeValue || "",
        onValueChange: handleValueChange,
        orientation,
        variant,
        headless,
      }}
    >
      <div
        className={cn(
          "w-full",
          orientation === "vertical" && "flex gap-4",
          className
        )}
        data-orientation={orientation}
        {...props}
      >
        {items ? renderItems() : children}
      </div>
    </TabsContext.Provider>
  );
};
