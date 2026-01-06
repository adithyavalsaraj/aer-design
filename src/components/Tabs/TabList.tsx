import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useTabs } from "./TabsContext";
import type { TabListProps } from "./types";

export const TabList = ({ className, children }: TabListProps) => {
  const { orientation, variant, headless } = useTabs();
  const listRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const isHorizontal = orientation === "horizontal";
  const isAer = variant === "aer";

  const checkScroll = () => {
    if (!listRef.current) return;
    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
      scrollTop,
      scrollHeight,
      clientHeight,
    } = listRef.current;

    if (isHorizontal) {
      setShowPrev(scrollLeft > 0);
      setShowNext(scrollLeft < scrollWidth - clientWidth - 1); // -1 for sub-pixel differences
    } else {
      setShowPrev(scrollTop > 0);
      setShowNext(scrollTop < scrollHeight - clientHeight - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [children, orientation]);

  const scroll = (direction: "prev" | "next") => {
    if (!listRef.current) return;
    const scrollAmount = 200;

    if (isHorizontal) {
      listRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    } else {
      listRef.current.scrollBy({
        top: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
    // Re-check after scroll animation (timeout is a simple way, though not perfect)
    setTimeout(checkScroll, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (headless) return;

    const triggers = Array.from(
      listRef.current?.querySelectorAll('[role="tab"]') || []
    ) as HTMLButtonElement[];
    if (triggers.length === 0) return;

    const activeIndex = triggers.findIndex(
      (t) => t.getAttribute("data-state") === "active"
    );

    let nextIndex = -1;

    switch (e.key) {
      case "ArrowLeft":
        if (isHorizontal)
          nextIndex = (activeIndex - 1 + triggers.length) % triggers.length;
        break;
      case "ArrowRight":
        if (isHorizontal) nextIndex = (activeIndex + 1) % triggers.length;
        break;
      case "ArrowUp":
        if (!isHorizontal)
          nextIndex = (activeIndex - 1 + triggers.length) % triggers.length;
        break;
      case "ArrowDown":
        if (!isHorizontal) nextIndex = (activeIndex + 1) % triggers.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = triggers.length - 1;
        break;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      triggers[nextIndex].focus();
      triggers[nextIndex].click();
    }
  };

  const handleScroll = () => {
    checkScroll();
  };

  // Base styles for the list container
  const baseStyles = headless
    ? ""
    : cn(
        "relative flex",
        isHorizontal ? "items-center w-full" : "flex-col h-full",
        variant === "default" && isHorizontal && "border-b border-aer-border",
        variant === "underline" && isHorizontal && "border-b border-aer-border",
        variant === "pills" && "gap-2",
        variant === "cards" && "gap-1 bg-aer-muted/50 p-1 rounded-aer-md",
        isAer &&
          "bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg"
      );

  // Styles for the scrollable area
  const scrollAreaStyles = headless
    ? ""
    : cn(
        "flex flex-1 gap-1 overflow-auto scrollbar-none snap-mandatory p-1 -m-1",
        isHorizontal ? "flex-row snap-x items-center" : "flex-col snap-y",
        // Hide scrollbar but keep functionality
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      );

  const arrowButtonClass = cn(
    "flex items-center justify-center rounded-md z-10 text-aer-muted-foreground transition-all shrink-0 hover:bg-aer-muted/80",
    isHorizontal ? "h-9 w-8 mx-0.5" : "w-full h-8 my-0.5",
    isAer && "text-white/70 hover:bg-white/10 rounded-full"
  );

  return (
    <div
      className={cn(baseStyles, className)}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
    >
      {/* Previous Button */}
      {!headless && showPrev && (
        <button
          onClick={() => scroll("prev")}
          className={cn(arrowButtonClass, "order-first")}
          aria-label="Scroll previous"
        >
          {isHorizontal ? (
            <ChevronLeft className="size-4" />
          ) : (
            <ChevronUp className="size-4" />
          )}
        </button>
      )}

      {/* Scrollable List */}
      <div ref={listRef} className={scrollAreaStyles} onScroll={handleScroll}>
        {children}
      </div>

      {/* Next Button */}
      {!headless && showNext && (
        <button
          onClick={() => scroll("next")}
          className={cn(arrowButtonClass, "order-last")}
          aria-label="Scroll next"
        >
          {isHorizontal ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </button>
      )}
    </div>
  );
};
