import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useAccordionContext } from "./AccordionContext";
import type { AccordionTabProps } from "./types";
import {
  accordionContentVariants,
  accordionHeaderVariants,
  accordionIconVariants,
  accordionTabVariants,
} from "./variants";

// Counter for generating unique IDs
let accordionTabCounter = 0;

export const AccordionTab = React.forwardRef<HTMLDivElement, AccordionTabProps>(
  (
    {
      header,
      disabled: tabDisabled,
      icon: tabIcon,
      headerTemplate,
      contentTemplate,
      iconTemplate,
      headerClassName,
      contentClassName,
      iconClassName,
      headerStyle,
      contentStyle,
      iconStyle,
      lazy: tabLazy,
      unmountOnCollapse: tabUnmountOnCollapse,
      className,
      children,
      index: propIndex,
      ...props
    },
    ref
  ) => {
    const context = useAccordionContext();
    const {
      activeIndices,
      variant,
      size,
      disabled: globalDisabled,
      headless,
      iconPosition,
      expandOn,
      expandIcon: globalExpandIcon,
      collapseIcon: globalCollapseIcon,
      rotateIcon: globalRotateIcon,
      lazy: globalLazy,
      unmountOnCollapse: globalUnmountOnCollapse,
      toggleTab,
      classNames,
      styles,
      registerTab,
      unregisterTab,
      focusTab,
      tabRefs,
    } = context;

    // Use prop index if provided, otherwise fallback to counter (for backwards compatibility)
    const [tabIndex] = React.useState(() => {
      if (propIndex !== undefined) {
        return propIndex;
      }
      // Fallback to counter for backwards compatibility
      return accordionTabCounter++;
    });

    // Generate unique IDs for accessibility
    const [headerId] = React.useState(
      () =>
        `accordion-header-${tabIndex}-${Math.random()
          .toString(36)
          .substr(2, 9)}`
    );
    const [contentId] = React.useState(
      () =>
        `accordion-content-${tabIndex}-${Math.random()
          .toString(36)
          .substr(2, 9)}`
    );

    // Register/unregister tab
    React.useEffect(() => {
      registerTab(tabIndex);
      return () => {
        unregisterTab(tabIndex);
      };
    }, [tabIndex, registerTab, unregisterTab]);

    // Header button ref
    const headerRef = React.useRef<HTMLButtonElement>(null);

    // Store ref in map for keyboard navigation
    React.useEffect(() => {
      if (headerRef.current) {
        tabRefs.set(tabIndex, headerRef.current);
      }
    }, [tabIndex, tabRefs]);

    // Determine if this tab is active
    const isActive = activeIndices.includes(tabIndex);

    // Determine if this tab is disabled
    const isDisabled = globalDisabled || tabDisabled || false;

    // Determine lazy and unmount behavior
    const shouldLazy = tabLazy !== undefined ? tabLazy : globalLazy;
    const shouldUnmount =
      tabUnmountOnCollapse !== undefined
        ? tabUnmountOnCollapse
        : globalUnmountOnCollapse;

    // Track if content has ever been mounted (for lazy rendering)
    const [hasBeenMounted, setHasBeenMounted] = React.useState(!shouldLazy);

    React.useEffect(() => {
      if (isActive && !hasBeenMounted) {
        setHasBeenMounted(true);
      }
    }, [isActive, hasBeenMounted]);

    // Handle click
    const handleClick = () => {
      if (isDisabled) return;
      if (expandOn === "manual") return;
      if (expandOn === "header") {
        toggleTab(tabIndex);
      }
    };

    // Handle icon click
    const handleIconClick = (e: React.MouseEvent) => {
      if (isDisabled) return;
      if (expandOn === "icon") {
        e.stopPropagation();
        toggleTab(tabIndex);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      const allIndices = Array.from(tabRefs.keys()).sort((a, b) => a - b);
      const currentIndex = allIndices.indexOf(tabIndex);

      switch (e.key) {
        case "Enter":
        case " ": // Space
          e.preventDefault();
          if (expandOn !== "manual") {
            toggleTab(tabIndex);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          // Focus next tab
          if (currentIndex < allIndices.length - 1) {
            focusTab(allIndices[currentIndex + 1]);
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          // Focus previous tab
          if (currentIndex > 0) {
            focusTab(allIndices[currentIndex - 1]);
          }
          break;

        case "Home":
          e.preventDefault();
          // Focus first tab
          if (allIndices.length > 0) {
            focusTab(allIndices[0]);
          }
          break;

        case "End":
          e.preventDefault();
          // Focus last tab
          if (allIndices.length > 0) {
            focusTab(allIndices[allIndices.length - 1]);
          }
          break;
      }
    };

    // Template props for render functions
    const templateProps = {
      index: tabIndex,
      isActive,
      isDisabled,
      toggle: () => toggleTab(tabIndex),
      props: {
        header,
        disabled: tabDisabled,
        icon: tabIcon,
        headerClassName,
        contentClassName,
        iconClassName,
        headerStyle,
        contentStyle,
        iconStyle,
        lazy: tabLazy,
        unmountOnCollapse: tabUnmountOnCollapse,
        children,
      } as AccordionTabProps,
    };

    // Render icon
    const renderIcon = () => {
      if (iconTemplate) {
        return iconTemplate(templateProps);
      }

      // Check if we're using a custom icon (tab icon or global custom icons)
      const hasCustomIcon = tabIcon || globalExpandIcon || globalCollapseIcon;

      // Determine if icon should rotate
      // Smart default: rotate default chevron, don't rotate custom icons unless explicitly set
      const shouldRotate =
        globalRotateIcon !== undefined ? globalRotateIcon : !hasCustomIcon;

      const iconToRender = tabIcon ||
        (isActive ? globalCollapseIcon : globalExpandIcon) || (
          <ChevronDown className="h-4 w-4" />
        );

      return (
        <span
          className={cn(
            !headless &&
              accordionIconVariants({
                expanded: shouldRotate ? isActive : false,
                position: iconPosition,
              }),
            classNames?.icon,
            iconClassName
          )}
          style={{ ...styles?.icon, ...iconStyle }}
          onClick={handleIconClick}
          aria-hidden="true"
        >
          {iconToRender}
        </span>
      );
    };

    // Render header
    const renderHeader = () => {
      if (headerTemplate) {
        return headerTemplate(templateProps);
      }

      return (
        <button
          ref={headerRef}
          type="button"
          id={headerId}
          aria-expanded={isActive}
          aria-controls={contentId}
          aria-disabled={isDisabled}
          disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          className={cn(
            !headless &&
              accordionHeaderVariants({
                variant,
                size,
                disabled: isDisabled,
                expanded: isActive,
              }),
            classNames?.header,
            headerClassName
          )}
          style={{ ...styles?.header, ...headerStyle }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span className="flex-1">{header}</span>
          {renderIcon()}
        </button>
      );
    };

    // Render content
    const renderContent = () => {
      // Don't render if lazy and never mounted
      if (shouldLazy && !hasBeenMounted) {
        return null;
      }

      // Don't render if should unmount and not active
      if (shouldUnmount && !isActive) {
        return null;
      }

      const content = contentTemplate
        ? contentTemplate(templateProps)
        : children;

      return (
        <div
          id={contentId}
          role="region"
          aria-labelledby={headerId}
          className={cn(
            !headless &&
              accordionContentVariants({
                variant,
                expanded: isActive,
              }),
            classNames?.content,
            contentClassName
          )}
          style={{
            ...styles?.content,
            ...contentStyle,
            display: isActive ? "block" : "none",
          }}
        >
          <div className="px-4 py-3">{content}</div>
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          !headless && accordionTabVariants({ variant }),
          classNames?.tab,
          className
        )}
        style={{ ...styles?.tab }}
        {...props}
      >
        {renderHeader()}
        {renderContent()}
      </div>
    );
  }
);

AccordionTab.displayName = "AccordionTab";
