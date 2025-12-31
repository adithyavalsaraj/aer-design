import { useTheme } from "@/components/ThemeProvider";
import { Monitor, Moon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 p-1 border border-aer-border rounded-aer-md bg-aer-muted/50">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-sm transition-all ${
          theme === "light"
            ? "bg-aer-background text-aer-foreground shadow-sm"
            : "text-aer-muted-foreground hover:text-aer-foreground"
        }`}
        title="Light Mode"
      >
        <Sun className="size-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-sm transition-all ${
          theme === "dark"
            ? "bg-aer-background text-aer-foreground shadow-sm"
            : "text-aer-muted-foreground hover:text-aer-foreground"
        }`}
        title="Dark Mode"
      >
        <Moon className="size-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-sm transition-all ${
          theme === "system"
            ? "bg-aer-background text-aer-foreground shadow-sm"
            : "text-aer-muted-foreground hover:text-aer-foreground"
        }`}
        title="System"
      >
        <Monitor className="size-4" />
      </button>
    </div>
  );
}
