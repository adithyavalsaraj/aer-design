import { useAerConfig } from "@/components/AerConfigProvider";
import { Badge } from "@/components/Badge";
import { AlignLeft, AlignRight, Check, TriangleAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { ThemePicker } from "./ThemePicker";

interface SettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsSheet({ isOpen, onClose }: SettingsSheetProps) {
  const {
    direction,
    setDirection,
    size,
    setSize,
    autoContrast,
    toggleAutoContrast,
  } = useAerConfig();
  const [isVisible, setIsVisible] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex justify-end isolate">
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
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-aer-muted-foreground uppercase tracking-wider">
              Appearance
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Mode</span>
              <ModeToggle />
            </div>
            <div className="space-y-2 pt-2">
              <span className="text-sm font-medium">Theme</span>
              <ThemePicker />
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

          {/* Size Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-aer-muted-foreground uppercase tracking-wider">
              Dimensions
            </h3>
            <div className="space-y-2">
              <span className="text-sm font-medium block">Global Size</span>
              <div className="grid grid-cols-3 gap-1 p-1 bg-aer-muted/50 rounded-aer-md border border-aer-border/50">
                {(["sm", "default", "lg"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex items-center justify-center py-1.5 text-xs font-medium rounded-sm transition-all capitalize ${
                      size === s
                        ? "bg-aer-background text-aer-foreground shadow-sm"
                        : "text-aer-muted-foreground hover:text-aer-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-aer-muted-foreground">
                Sets default size for all inputs
              </p>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-aer-muted-foreground uppercase tracking-wider flex items-center justify-between">
              Accessibility
              <Badge variant="soft" status="primary" size="sm" rounded="full">
                Beta
              </Badge>
            </h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-sm font-medium block">Auto Contrast</span>
                <p className="text-xs text-aer-muted-foreground">
                  Automatic WCAG-compliant text colors
                </p>
              </div>
              <button
                onClick={toggleAutoContrast}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  autoContrast ? "bg-aer-primary" : "bg-aer-muted"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform flex items-center justify-center ${
                    autoContrast ? "translate-x-[22px]" : "translate-x-0.5"
                  }`}
                >
                  {autoContrast && (
                    <Check className="size-3 text-aer-primary" />
                  )}
                </div>
              </button>
            </div>
            <div className="p-3 bg-red-500 dark:bg-red-600 border-2 border-red-600 dark:border-red-500 rounded-aer-md">
              <div className="flex gap-3 items-start">
                <TriangleAlert className="size-5 text-white shrink-0 mt-0.5" />
                <p className="text-[11px] text-white leading-relaxed font-semibold">
                  <strong className="font-bold">EXPERIMENTAL:</strong>{" "}
                  Auto-contrast only applies when you set{" "}
                  <code className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    style={`{{ backgroundColor }}`}
                  </code>{" "}
                  on a component. It does NOT override color tokens. May produce
                  incorrect results with gradients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
