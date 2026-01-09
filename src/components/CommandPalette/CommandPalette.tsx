import { useScrollToActive } from "@/hooks/useScrollToActive";
import { cn } from "@/lib/utils";
import { Command, Search, X } from "lucide-react";
import * as React from "react";
import { Dialog } from "../Dialog";
import type { CommandItem, CommandPaletteProps } from "./types";

export function CommandPalette({
  items,
  isOpen,
  onClose,
  placeholder = "Search...",
  renderItem,
  variant = "aer",
  showCategories = true,
  onSelect,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Group and Filter Logic
  const filteredItems = React.useMemo(() => {
    if (!query) return items;

    const lowerQuery = query.toLowerCase();
    return items
      .filter((item) => {
        const inTitle = item.title.toLowerCase().includes(lowerQuery);
        const inDesc = item.description?.toLowerCase().includes(lowerQuery);
        const inKeywords = item.keywords?.some((k) =>
          k.toLowerCase().includes(lowerQuery)
        );
        return inTitle || inDesc || inKeywords;
      })
      .sort((a, b) => {
        // Basic relevance scoring
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aExact = aTitle === lowerQuery;
        const bExact = bTitle === lowerQuery;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        const aStarts = aTitle.startsWith(lowerQuery);
        const bStarts = bTitle.startsWith(lowerQuery);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return 0;
      });
  }, [items, query]);

  // Reset active index when query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[activeIndex]) {
        handleSelect(filteredItems[activeIndex]);
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const handleSelect = (item: CommandItem) => {
    if (item.onSelect) {
      item.onSelect(item);
    } else if (onSelect) {
      onSelect(item);
    } else if (item.url) {
      window.location.hash = item.url;
    }
    onClose();
    setQuery("");
  };

  // Auto-scroll active item into view
  useScrollToActive({
    containerRef: scrollContainerRef as React.RefObject<HTMLElement>,
    activeIndex,
    enabled: filteredItems.length > 0,
  });

  return (
    <Dialog isOpen={isOpen} onClose={onClose} headless={true}>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 sm:pt-32 px-4 pointer-events-none">
        <div
          className={cn(
            "flex flex-col w-full max-w-2xl overflow-hidden pointer-events-auto",
            "animate-in zoom-in-95 fade-in duration-200",
            variant === "aer"
              ? "bg-aer-background/70 backdrop-blur-2xl border border-aer-border rounded-aer-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]"
              : "bg-white border rounded-xl shadow-2xl"
          )}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-aer-border">
            <Search
              className={cn(
                "size-6",
                variant === "aer" ? "text-aer-primary" : "text-gray-400"
              )}
            />
            <input
              autoFocus
              className="flex-1 bg-transparent border-none outline-none text-xl text-aer-foreground placeholder:text-aer-muted-foreground/40 h-10"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border border-aer-border bg-aer-muted/50 px-2 font-mono text-[10px] font-medium text-aer-muted-foreground uppercase">
                Esc
              </kbd>
              <button
                onClick={onClose}
                className="p-2 hover:bg-aer-muted rounded-aer-xl text-aer-muted-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div
            ref={scrollContainerRef}
            className="max-h-[450px] overflow-y-auto p-2 doc-scrollbar relative"
          >
            {filteredItems.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="size-12 rounded-aer-xl bg-aer-primary/10 text-aer-primary flex items-center justify-center mx-auto mb-4">
                  <Command className="size-6" />
                </div>
                <h3 className="text-sm font-bold text-aer-foreground mb-1">
                  No results found
                </h3>
                <p className="text-xs text-aer-muted-foreground">
                  Try searching for something else
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredItems.map((item, index) => {
                  const isActive = index === activeIndex;

                  if (renderItem) {
                    return (
                      <div
                        key={item.id}
                        data-active-index={index}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        {renderItem(item, isActive)}
                      </div>
                    );
                  }

                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      data-active-index={index}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={cn(
                        "flex items-center w-full gap-3 px-3 py-3 rounded-aer-xl text-left transition-all duration-200 group",
                        isActive
                          ? "bg-aer-primary text-white shadow-lg shadow-aer-primary/20 scale-[1.01]"
                          : "hover:bg-aer-muted text-aer-foreground"
                      )}
                    >
                      <div
                        className={cn(
                          "size-10 rounded-aer-lg flex items-center justify-center shrink-0 transition-colors border",
                          isActive
                            ? "bg-white/20 border-white/10"
                            : "bg-aer-muted border-aer-border"
                        )}
                      >
                        {Icon &&
                          (React.isValidElement(Icon)
                            ? Icon
                            : React.createElement(Icon as any, {
                                className: "size-5",
                              }))}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold truncate">
                            {item.title}
                          </span>
                          {showCategories && item.category && (
                            <span
                              className={cn(
                                "text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-aer-primary/10 text-aer-primary"
                              )}
                            >
                              {item.category}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <div
                            className={cn(
                              "text-xs truncate",
                              isActive
                                ? "text-white/80"
                                : "text-aer-muted-foreground"
                            )}
                          >
                            {item.description}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-6 px-4 py-3 border-t border-aer-border bg-aer-muted/30 text-[10px] text-aer-muted-foreground">
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border border-aer-border bg-aer-background px-1.5 py-0.5 font-sans uppercase">
                Enter
              </kbd>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="rounded border border-aer-border bg-aer-background px-1.5 py-0.5 font-sans">
                ↑↓
              </kbd>
              <span>to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
