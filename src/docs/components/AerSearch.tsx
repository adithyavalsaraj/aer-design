import { CommandPalette, type CommandItem } from "@/components/CommandPalette";
import { detectOS, useShortcut } from "@/components/Shortcut";
import { useHashRouter } from "@/docs/hooks/useHashRouter";
import { Hash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NAV_ITEMS } from "../data/docsNavigation";
import { staticTOC } from "../data/staticTOC";

export function AerSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const { setActivePage } = useHashRouter();

  // Generate flat index of searchable items
  const searchableItems = useMemo(() => {
    const items: CommandItem[] = [];

    NAV_ITEMS.forEach((nav) => {
      // Add the page itself
      items.push({
        id: nav.id,
        title: nav.label,
        category: nav.category,
        icon: nav.icon,
        url: nav.id,
        description: `Documentation for ${nav.label}`,
      });

      // Add sections from TOC
      const sections = staticTOC[nav.id] || [];
      sections.forEach((section) => {
        // Skip "Introduction" as it's often redundant with the page
        if (section.id === "introduction") return;

        items.push({
          id: `${nav.id}-${section.id}`,
          title: section.title,
          category: nav.label,
          icon: <Hash className="size-4" />,
          url: `${nav.id}/${section.id}`,
          description: `Section in ${nav.label}`,
        });
      });
    });

    return items;
  }, []);

  // Listen for global open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("aer-search-open", handleOpen);
    return () => window.removeEventListener("aer-search-open", handleOpen);
  }, []);

  // Register shortcut
  const isMac = detectOS() === "mac";
  useShortcut(
    "open-search",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(true);
    },
    {
      defaultKeys: isMac ? ["Meta", "k"] : ["Control", "k"],
      preventDefault: true,
      stopPropagation: true,
    }
  );

  return (
    <CommandPalette
      items={searchableItems}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placeholder="Search documentation..."
      variant="aer"
      showCategories={true}
      onSelect={(item: CommandItem) => {
        if (item.url) setActivePage(item.url);
      }}
    />
  );
}
