import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { dialogStackingManager } from "./dialogStackingManager";

export const DialogTaskbar = () => {
  const [minimizedIds, setMinimizedIds] = React.useState<string[]>([]);
  const [mode, setMode] = React.useState<"wrap" | "scroll">("wrap");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(false);

  React.useEffect(() => {
    const handleUpdate = () => {
      setMinimizedIds(dialogStackingManager.getMinimizedIds());
      setMode(dialogStackingManager.getStackingMode());
    };

    const unsubscribe = dialogStackingManager.subscribe(handleUpdate);
    handleUpdate();

    return unsubscribe;
  }, []);

  const checkScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [minimizedIds, mode, checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 300);
  };

  if (mode !== "scroll" || minimizedIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-9999 flex items-center gap-1 p-1.5 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-xl border border-aer-border/50 dark:border-white/10 shadow-2xl max-w-[90vw] animate-in fade-in slide-in-from-bottom-4 duration-500">
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="p-1 hover:bg-aer-muted/10 dark:hover:bg-white/10 rounded-lg transition-colors text-aer-muted-foreground dark:text-white/70"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-1 overflow-x-auto scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {minimizedIds.map((id) => {
          const meta = dialogStackingManager.getMetadata(id);
          if (!meta) return null;

          return (
            <button
              key={id}
              onClick={() => meta.onRestore?.()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-aer-muted/5 dark:bg-white/5 hover:bg-aer-muted/10 dark:hover:bg-white/15 border border-aer-border/30 dark:border-white/5 transition-all text-aer-foreground dark:text-white/90 whitespace-nowrap snap-start group outline-none focus-visible:ring-2 focus-visible:ring-aer-primary/50"
            >
              {meta.icon && (
                <span className="w-4 h-4 flex items-center justify-center text-aer-muted-foreground dark:text-white/60 group-hover:text-aer-primary transition-colors">
                  {meta.icon}
                </span>
              )}
              <span className="text-sm font-medium">
                {meta.title || "Untitled Window"}
              </span>
            </button>
          );
        })}
      </div>

      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="p-1 hover:bg-aer-muted/10 dark:hover:bg-white/10 rounded-lg transition-colors text-aer-muted-foreground dark:text-white/70"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
