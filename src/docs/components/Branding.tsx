import { cn } from "@/lib/utils";
import { Command } from "lucide-react";

interface BrandingProps {
  className?: string; // Container class
  iconClassName?: string;
  textClassName?: string;
  hideText?: boolean;
  showBadge?: boolean;
}

export function Branding({
  className,
  iconClassName,
  textClassName,
  hideText = false,
  showBadge = false,
}: BrandingProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex aspect-square size-9 items-center justify-center rounded-aer-xl bg-aer-primary text-aer-primary-foreground shadow-xl shadow-aer-primary/30 ring-4 ring-aer-primary/10 transition-all",
          iconClassName
        )}
      >
        <Command className="size-5" />
      </div>
      {!hideText && (
        <div className="flex flex-col gap-0.5 animate-in fade-in slide-in-from-left-2 duration-300">
          <span
            className={cn("text-sm font-bold tracking-tight", textClassName)}
          >
            Aer Design
          </span>
          {showBadge && (
            <span className="text-[10px] text-aer-muted-foreground font-medium uppercase tracking-[0.2em]">
              Alpha v0.1
            </span>
          )}
        </div>
      )}
    </div>
  );
}
