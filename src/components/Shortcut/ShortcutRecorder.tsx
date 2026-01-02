import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import * as React from "react";
import { useShortcutContext } from "./ShortcutContext";
import { formatShortcut, MODIFIER_KEYS, normalizeKey } from "./utils";

export interface ShortcutRecorderProps {
  actionId: string;
  className?: string;
  placeholder?: string;
}

export const ShortcutRecorder: React.FC<ShortcutRecorderProps> = ({
  actionId,
  className,
  placeholder = "Click to record shortcut",
}) => {
  const { shortcuts, updateShortcut, resetShortcut } = useShortcutContext();
  const [isRecording, setIsRecording] = React.useState(false);
  const [currentKeys, setCurrentKeys] = React.useState<string[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const effectiveKeys = shortcuts[actionId] || [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isRecording) return;

    e.preventDefault();
    e.stopPropagation();

    const key = normalizeKey(e.nativeEvent);

    // Cancel on Escape
    if (e.key === "Escape") {
      setIsRecording(false);
      setCurrentKeys([]);
      buttonRef.current?.blur();
      return;
    }

    // Clear on Backspace/Delete (if strictly pressed alone or with shift?)
    // Usually Backspace clears the binding.
    if (e.key === "Backspace" || e.key === "Delete") {
      updateShortcut(actionId, []);
      setIsRecording(false);
      setCurrentKeys([]);
      buttonRef.current?.blur();
      return;
    }

    // Build combination
    const nextKeys = new Set(currentKeys);

    // Always add active modifiers
    if (e.ctrlKey) nextKeys.add("Control");
    if (e.metaKey) nextKeys.add("Meta");
    if (e.altKey) nextKeys.add("Alt");
    if (e.shiftKey) nextKeys.add("Shift");

    // Add current key if it's not a modifier
    if (key && !MODIFIER_KEYS.includes(key)) {
      nextKeys.add(key);

      // If we have a non-modifier key, we consider the shortcut complete
      const finalKeys = Array.from(nextKeys);

      // Save
      updateShortcut(actionId, finalKeys);
      setIsRecording(false);
      setCurrentKeys([]);
      buttonRef.current?.blur();
      return;
    }

    setCurrentKeys(Array.from(nextKeys));
  };

  const startRecording = () => {
    setIsRecording(true);
    setCurrentKeys([]);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setCurrentKeys([]);
  };

  // Display value: Either what's being recorded OR the saved shortcut
  const displayValue = isRecording
    ? formatShortcut(currentKeys) || "Press keys..."
    : formatShortcut(effectiveKeys);

  const hasShortcut = effectiveKeys.length > 0;

  return (
    <div className={cn("relative inline-flex items-center group", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={startRecording}
        onBlur={stopRecording}
        onKeyDown={handleKeyDown}
        className={cn(
          "h-9 px-3 min-w-[120px] rounded-md border text-sm font-medium transition-all outline-none",
          isRecording
            ? "border-aer-primary ring-2 ring-aer-primary/20 text-aer-primary bg-aer-primary/5"
            : "border-aer-border bg-aer-background hover:bg-aer-muted text-aer-foreground",
          !hasShortcut && !isRecording && "text-aer-muted-foreground italic"
        )}
      >
        {displayValue || placeholder}
      </button>

      {/* Clear Button (only if not recording and has shortcut) */}
      {!isRecording && hasShortcut && (
        <button
          onClick={() => resetShortcut(actionId)}
          className="absolute right-2 p-0.5 rounded-full text-aer-muted-foreground hover:bg-aer-muted hover:text-aer-foreground opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Reset shortcut"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
