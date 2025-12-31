import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export function RightTableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const isManualScrolling = useRef(false);

  useEffect(() => {
    setActiveId(items[0]?.id || "");
    isManualScrolling.current = false;
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrolling.current) return;

      const headings = items
        .map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }))
        .filter((h) => h.element);

      if (headings.length === 0) return;

      // Logic: Find the heading that is closest to the top of the viewport
      // but not too far down (e.g., has crossed a threshold).
      const scrollPosition = window.scrollY;
      const headerOffset = 100; // Trigger point 100px from top

      // Find the last heading that is above the threshold
      // Or if we are at the bottom of the page, highlight the last one
      let currentActiveId = items[0]?.id;

      // check if we are at the bottom of the page
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        currentActiveId = items[items.length - 1]?.id;
      } else {
        for (const heading of headings) {
          if (!heading.element) continue;
          const top =
            heading.element.getBoundingClientRect().top + window.scrollY;

          // If the heading is above the threshold (current scroll position + offset)
          if (top - headerOffset <= scrollPosition) {
            currentActiveId = heading.id;
          }
        }
      }

      setActiveId((prev) =>
        prev !== currentActiveId ? currentActiveId : prev
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state correctly
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    setActiveId(id);
    isManualScrolling.current = true;

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Topbar height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Re-enable observer after smooth scroll completes (approx 800ms)
      setTimeout(() => {
        isManualScrolling.current = false;
      }, 800);
    }
  };

  return (
    <aside className="w-64 hidden xl:block sticky top-0 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto pr-8">
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-aer-muted-foreground">
          On this page
        </h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={cn(
                "w-full text-left block py-1.5 text-sm border-l-2 pl-4 transition-all hover:bg-aer-muted/50",
                activeId === item.id
                  ? "border-aer-primary text-aer-primary font-medium bg-aer-primary/5"
                  : "border-transparent text-aer-muted-foreground hover:border-aer-muted hover:text-aer-foreground"
              )}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
