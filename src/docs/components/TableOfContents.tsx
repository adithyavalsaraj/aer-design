import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "../context/RouterContext";

interface TOCItem {
  id: string;
  title: string;
}

export function RightTableOfContents({ items }: { items: TOCItem[] }) {
  const { activePage, setActivePage } = useRouter();
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");
  const isManualScrolling = useRef(false);

  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setActiveId(items[0]?.id || "");
    // eslint-disable-next-line react-hooks/refs
    isManualScrolling.current = false;
  }

  // Effect to sync current section with scroll position (Scroll Spy for UI)
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

      const scrollPosition = window.scrollY;
      const headerOffset = 100;

      let currentActiveId = items[0]?.id;

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

          if (top - headerOffset <= scrollPosition) {
            currentActiveId = heading.id;
          }
        }
      }

      setActiveId((prev: string) =>
        prev !== currentActiveId ? currentActiveId : prev
      );
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    setActiveId(id);
    isManualScrolling.current = true;

    // Update the URL and trigger global navigation scroll
    setActivePage(`${activePage}/${id}`);

    // Re-enable observer after smooth scroll completes (handled by the router)
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);
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
