import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
}

export function RightTableOfContents({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const isManualScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0% -80% 0%", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    setActiveId(id);
    isManualScrolling.current = true;

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

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
