import { cn } from "@/lib/utils";
import { Command } from "lucide-react";

interface BrandingProps {
  className?: string; // Container class
  iconClassName?: string;
  textClassName?: string;
  hideText?: boolean;
  showBadge?: boolean;
  onClick?: () => void;
}

export function Branding({
  className,
  iconClassName,
  textClassName,
  hideText = false,
  showBadge = false,
  onClick,
}: BrandingProps) {
  const content = (
    <>
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
            className={cn(
              "text-sm font-bold tracking-tight text-left",
              textClassName
            )}
          >
            Aer Design
          </span>
          {showBadge && (
            <span className="text-[10px] text-aer-muted-foreground font-medium uppercase tracking-[0.2em] text-left">
              v{__APP_VERSION__}
            </span>
          )}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 transition-opacity hover:opacity-80 active:scale-95 outline-none",
          className
        )}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>{content}</div>
  );
}
