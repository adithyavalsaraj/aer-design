import { Menu, Search, Settings2 } from "lucide-react";
import { useState } from "react";
import { Branding } from "./Branding";
import { SettingsSheet } from "./SettingsSheet";

interface TopbarProps {
  onMenuClick?: () => void;
  onBrandingClick?: () => void;
}

export function Topbar({ onMenuClick, onBrandingClick }: TopbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("aer-search-open"));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-aer-border bg-aer-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center px-4 md:px-6 gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-aer-muted rounded-aer-md -ml-2 text-aer-muted-foreground hover:text-aer-foreground"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex items-center gap-2 mr-auto">
            <Branding
              iconClassName="size-8 rounded-lg ring-0 shadow-none"
              textClassName="text-lg"
              onClick={onBrandingClick}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 bg-aer-muted/30 border border-aer-border rounded-aer-lg text-aer-muted-foreground hover:bg-aer-muted hover:text-aer-foreground transition-all duration-200 group"
            >
              <Search className="size-4" />
              <span className="text-sm hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-aer-border bg-aer-background px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">
                  {typeof window !== "undefined" &&
                  /Mac|iPod|iPhone|iPad/.test(window.navigator.platform)
                    ? "⌘"
                    : "Ctrl"}
                </span>
                K
              </kbd>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 hover:bg-aer-muted rounded-aer-md text-aer-muted-foreground hover:text-aer-foreground transition-colors"
              title="Settings"
            >
              <Settings2 className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <SettingsSheet
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
