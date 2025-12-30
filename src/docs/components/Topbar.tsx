import { Menu, Settings2 } from "lucide-react";
import { useState } from "react";
import { Branding } from "./Branding";
import { SettingsSheet } from "./SettingsSheet";

interface TopbarProps {
  onMenuClick?: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
            />
          </div>

          <div className="flex items-center gap-2">
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
