import { cn } from "@/lib/utils";
import * as React from "react";
import { AccordionContext } from "./AccordionContext";
import { AccordionTab } from "./AccordionTab";
import type { AccordionProps, AccordionRefAPI } from "./types";
import { accordionVariants } from "./variants";

export const Accordion = React.forwardRef<AccordionRefAPI, AccordionProps>(
  (
    {
      variant = "default",
      size = "md",
      multiple = false,
      defaultActiveIndex,
      activeIndex,
      onTabChange,
      disabled = false,
      collapsible = true,
      items,
      headless = false,
      iconPosition = "end",
      expandOn = "header",
      expandIcon,
      collapseIcon,
      rotateIcon,
      lazy = false,
      unmountOnCollapse = false,
      onExpand,
      onCollapse,
      classNames,
      styles,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Warn about mixed controlled/uncontrolled usage
    React.useEffect(() => {
      if (import.meta.env.DEV) {
        if (activeIndex !== undefined && defaultActiveIndex !== undefined) {
          console.warn(
            "Accordion: Both 'activeIndex' and 'defaultActiveIndex' are provided. " +
              "The component will be controlled. Remove 'defaultActiveIndex' to avoid confusion."
          );
        }
      }
    }, []);

    // Initialize internal state
    const [internalActiveIndices, setInternalActiveIndices] = React.useState<
      number[]
    >(() => {
      // Determine initial state
      const initial =
        activeIndex !== undefined ? activeIndex : defaultActiveIndex;

      if (initial === null || initial === undefined) {
        return [];
      }

      if (Array.isArray(initial)) {
        return initial;
      }

      return [initial];
    });

    // Determine if controlled
    const isControlled = activeIndex !== undefined;

    // Get current active indices
    const currentActiveIndices = React.useMemo(() => {
      if (isControlled) {
        if (activeIndex === null || activeIndex === undefined) {
          return [];
        }
        return Array.isArray(activeIndex) ? activeIndex : [activeIndex];
      }
      return internalActiveIndices;
    }, [isControlled, activeIndex, internalActiveIndices]);

    // Tab registration for keyboard navigation
    const tabRefsMap = React.useRef<Map<number, HTMLButtonElement | null>>(
      new Map()
    );

    const registerTab = React.useCallback((index: number) => {
      if (!tabRefsMap.current.has(index)) {
        tabRefsMap.current.set(index, null);
      }
    }, []);

    const unregisterTab = React.useCallback((index: number) => {
      tabRefsMap.current.delete(index);
    }, []);

    const focusTab = React.useCallback((index: number) => {
      const tabElement = tabRefsMap.current.get(index);
      if (tabElement) {
        tabElement.focus();
      }
    }, []);

    // Toggle tab handler
    const toggleTab = React.useCallback(
      (index: number) => {
        const isActive = currentActiveIndices.includes(index);

        let newActiveIndices: number[];

        if (multiple) {
          // Multiple mode: toggle the index in the array
          if (isActive) {
            newActiveIndices = currentActiveIndices.filter((i) => i !== index);
          } else {
            newActiveIndices = [...currentActiveIndices, index];
          }
        } else {
          // Single mode: only one can be active
          if (isActive && collapsible) {
            newActiveIndices = [];
          } else if (isActive && !collapsible) {
            // Don't allow closing if collapsible is false
            return;
          } else {
            newActiveIndices = [index];
          }
        }

        // Update internal state if uncontrolled
        if (!isControlled) {
          setInternalActiveIndices(newActiveIndices);
        }

        // Call callbacks
        if (isActive) {
          onCollapse?.(index);
        } else {
          onExpand?.(index);
        }

        // Call onTabChange with appropriate format
        if (onTabChange) {
          if (multiple) {
            onTabChange(newActiveIndices);
          } else {
            onTabChange(
              newActiveIndices.length > 0 ? newActiveIndices[0] : null
            );
          }
        }
      },
      [
        currentActiveIndices,
        multiple,
        collapsible,
        isControlled,
        onTabChange,
        onExpand,
        onCollapse,
      ]
    );

    // Imperative ref API
    React.useImperativeHandle(
      ref,
      () => ({
        expand: (index: number) => {
          if (!currentActiveIndices.includes(index)) {
            toggleTab(index);
          }
        },
        collapse: (index: number) => {
          if (currentActiveIndices.includes(index)) {
            toggleTab(index);
          }
        },
        toggle: (index: number) => {
          toggleTab(index);
        },
        expandAll: () => {
          if (!multiple) {
            console.warn("expandAll() only works in multiple mode");
            return;
          }
          // Get all tab indices
          const allIndices = Array.from(tabRefsMap.current.keys());
          if (!isControlled) {
            setInternalActiveIndices(allIndices);
          }
          if (onTabChange) {
            onTabChange(allIndices);
          }
        },
        collapseAll: () => {
          if (!isControlled) {
            setInternalActiveIndices([]);
          }
          if (onTabChange) {
            onTabChange(multiple ? [] : null);
          }
        },
        getActiveIndices: () => {
          if (multiple) {
            return currentActiveIndices;
          }
          return currentActiveIndices.length > 0
            ? currentActiveIndices[0]
            : null;
        },
      }),
      [currentActiveIndices, multiple, isControlled, onTabChange, toggleTab]
    );

    // Context value
    const contextValue = React.useMemo(
      () => ({
        activeIndices: currentActiveIndices,
        multiple,
        variant,
        size,
        disabled,
        headless,
        iconPosition,
        expandOn,
        expandIcon,
        collapseIcon,
        lazy,
        unmountOnCollapse,
        collapsible,
        toggleTab,
        onExpand,
        onCollapse,
        classNames,
        styles,
        registerTab,
        unregisterTab,
        focusTab,
        tabRefs: tabRefsMap.current,
      }),
      [
        currentActiveIndices,
        multiple,
        variant,
        disabled,
        headless,
        iconPosition,
        expandOn,
        expandIcon,
        collapseIcon,
        rotateIcon,
        lazy,
        unmountOnCollapse,
        collapsible,
        toggleTab,
        onExpand,
        onCollapse,
        classNames,
        styles,
        registerTab,
        unregisterTab,
        focusTab,
      ]
    );

    // Render items if provided
    const renderItems = () => {
      if (!items || items.length === 0) return null;

      return items.map((item, index) => (
        <AccordionTab
          key={item.id || index}
          index={index}
          header={item.header}
          disabled={item.disabled}
          icon={item.icon}
        >
          {item.content}
        </AccordionTab>
      ));
    };

    // Clone children with index prop
    const renderChildren = () => {
      if (!children) return null;

      let childIndex = 0;
      return React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        const currentIndex = childIndex++;
        return React.cloneElement(child as React.ReactElement<any>, {
          index: currentIndex,
        });
      });
    };

    return (
      <AccordionContext.Provider value={contextValue}>
        <div
          className={cn(
            !headless && accordionVariants({ variant }),
            classNames?.root,
            className
          )}
          style={{ ...styles?.root }}
          {...props}
        >
          {items ? renderItems() : renderChildren()}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";
