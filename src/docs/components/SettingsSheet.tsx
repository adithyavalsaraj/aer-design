import { useDirection } from "@/components/DirectionProvider";
import { AlignLeft, AlignRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsSheet({ isOpen, onClose }: SettingsSheetProps) {
  const { direction, setDirection } = useDirection();
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end isolate">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sheet Content */}
      <div
        className={`relative h-full w-80 bg-aer-background border-l border-aer-border shadow-2xl transition-transform duration-300 ease-out transform ${
          isOpen
            ? "translate-x-0"
            : direction === "ltr"
            ? "translate-x-full" // Slide out to right for LTR
            : "-translate-x-full" // Slide out to left for RTL (if sheet was on left, but here it's always right side settings? usually settings is right side)
          // Actually for RTL, if we want the sheet on the "start" side it would be different, but usually "Settings" panels are on the right or user-specified side.
          // Let's keep it simple: It's a right-side panel for now.
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-aer-border">
          <h2 className="font-bold text-lg">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-aer-muted rounded-aer-md text-aer-muted-foreground hover:text-aer-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-aer-muted-foreground uppercase tracking-wider">
              Appearance
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ModeToggle />
            </div>
          </div>

          {/* Direction Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-aer-muted-foreground uppercase tracking-wider">
              Regional
            </h3>
            <div className="space-y-2">
              <span className="text-sm font-medium block">Direction</span>
              <div className="flex p-1 bg-aer-muted/50 rounded-aer-md border border-aer-border/50">
                <button
                  onClick={() => setDirection("ltr")}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-sm transition-all ${
                    direction === "ltr"
                      ? "bg-aer-background text-aer-foreground shadow-sm"
                      : "text-aer-muted-foreground hover:text-aer-foreground"
                  }`}
                >
                  <AlignLeft className="size-3.5" />
                  LTR
                </button>
                <button
                  onClick={() => setDirection("rtl")}
                  className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-sm transition-all ${
                    direction === "rtl"
                      ? "bg-aer-background text-aer-foreground shadow-sm"
                      : "text-aer-muted-foreground hover:text-aer-foreground"
                  }`}
                >
                  <AlignRight className="size-3.5" />
                  RTL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
