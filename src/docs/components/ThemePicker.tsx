import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import {
  type ThemeColor,
  THEMES,
} from "../../components/ThemeProvider/theme-utils";

export function ThemePicker() {
  const { themeColor, setThemeColor } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-2">
      {THEMES.map((theme) => {
        const isActive = themeColor === theme.name;

        return (
          <button
            key={theme.name}
            onClick={() => setThemeColor(theme.name as ThemeColor)}
            className={cn(
              "flex items-center justify-between rounded-lg border-2 p-1.5 hover:bg-aer-muted/50 transition-all",
              isActive
                ? "border-aer-primary bg-aer-primary/5"
                : "border-transparent hover:border-aer-muted"
            )}
            title={theme.label}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-5 w-5 rounded-full border shadow-sm",
                  theme.activeColor
                )}
              />
              <span className="text-xs font-medium text-aer-foreground">
                {theme.label}
              </span>
            </div>
            {isActive && <Check className="h-3.5 w-3.5 text-aer-primary" />}
          </button>
        );
      })}
    </div>
  );
}
