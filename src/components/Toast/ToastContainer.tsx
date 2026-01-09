import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils";
import { Toast } from "./Toast.tsx";
import type { ToastPosition, ToastProps } from "./types.ts";

interface ToastContainerProps {
  toasts: ToastProps[];
  onDismiss: (id: string) => void;
}

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
  "center-left",
  "center",
  "center-right",
];

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
}) => {
  if (typeof document === "undefined") return null;

  // Group toasts by position
  const groupedToasts = toasts.reduce((acc, toast) => {
    // If explicit x/y, treat as 'custom' (or render individually)
    if (toast.x !== undefined || toast.y !== undefined) {
      acc["custom"] = acc["custom"] || [];
      acc["custom"].push(toast);
      return acc;
    }

    const pos = toast.position || "top-right";
    acc[pos] = acc[pos] || [];
    acc[pos].push(toast);
    return acc;
  }, {} as Record<string, ToastProps[]>);

  return createPortal(
    <div className="fixed inset-0 z-9999 pointer-events-none overflow-hidden flex flex-col justify-between">
      {/* Render 9 Layout Areas */}
      {POSITIONS.map((pos) => {
        const items = groupedToasts[pos] || [];
        if (items.length === 0) return null;

        return (
          <div
            key={pos}
            className={cn(
              "absolute flex max-h-screen w-full flex-col p-4 md:max-w-[420px]",
              getPositionStyles(pos)
            )}
          >
            {/* 
              Stacking Logic:
              - Top positions: Flex-col (Oldest at top index 0). Newest at bottom.
                BUT user wants "Old closer to defined position".
                So for TOP, Oldest should be at TOP. Newest pushed DOWN.
                This is standard flex-col.
              - Bottom positions: Flex-col (Oldest at index 0). Newest at bottom.
                User wants Oldest at BOTTOM. Newest pushed UP.
                So we need flex-col-reverse.
            */}
            {items.map((toast) => (
              <div key={toast.id} className="py-2">
                <Toast
                  {...toast}
                  isRenderedByContainer={true}
                  // We override position here to ensure animation matches,
                  // but we DON'T want the fixed positioning logic from the component itself
                  // since the wrapper handles layout.
                  // By passing 'x: undefined, y: undefined' we keep it simple,
                  // and we rely on the specific 'position' variance in the Toast component
                  // for animation direction.
                  // BUT we must ensure Toast.tsx doesn't apply 'fixed' class if we are rendering here.
                  // In Toast.tsx, I added `standaloneClasses` logic which checks if x/y undefined AND position is set.
                  // Ah, issue: if I pass 'position' prop to Toast, it MIGHT trigger standalone fixed classes?
                  // Let's check Toast.tsx logic...
                  // `const isFixed = !!position || ...`
                  // `const standaloneClasses = isFixed ... ? getFixedPositionClass(position) : ""`
                  // Yes, it will try to be fixed.
                  // Fix: We need to tell Toast "I am in a container".
                  // OR simpler: Toast.tsx should only be fixed if we explicitly ask.
                  // But standalone users want `<Toast position="top-right" />` to work.
                  // So, in Container, we should maybe strip the 'position' prop and pass it as valid 'variant'?
                  // Or pass a 'relative' prop/class?
                  // Let's pass `className="relative pointer-events-auto"` which overrides `fixed`?
                  // Tailwind 'relative' beats 'fixed'? No, order matters.
                  // Best way: Don't pass 'position' prop to Toast inside container for positioning,
                  // pass it for 'variant' (animation).
                  // In cva, 'position' controls animation direction.
                  // So we MUST pass it.
                  // I will edit Toast.tsx to not force fixed if `static` or `relative` is passed in style/class?
                  // Or better: Add a prop `disableFixed={true}`.
                  // Or rely on `className="static"`?
                  // Let's assume I passing `className="static transform-none"` works.
                  // Actually, let's update Toast.tsx to accept `standalone={false}`.
                  // Or just use the `custom` group approach.

                  // New approach: I will not modify Toast.tsx now (to avoid tool thrashing).
                  // I'll wrap it in a div that forces position relative?
                  // Fixed inside Fixed is weird.
                  // Let's modify Toast.tsx implementation in next step if needed.
                  // For now, I'll pass `x={undefined} y={undefined}` and hope `position` doesn't screw up.
                  // Wait, Toast.tsx line 108: `isFixed && ... getFixedPositionClass`.
                  // It WILL apply `fixed`.
                  // I should patch Toast.tsx to avoid this conflict.

                  onOpenChange={(open) => {
                    if (!open) onDismiss(toast.id!);
                    toast.onOpenChange?.(open);
                  }}
                  className={cn(
                    "pointer-events-auto relative transform-none",
                    toast.className
                  )}
                  // ^ 'relative' here should override 'fixed' in class string if tailwind-merge handles it (cn).
                  // 'cn' uses tailwind-merge. 'relative' conflicts with 'fixed'. It should win if last.
                />
              </div>
            ))}
          </div>
        );
      })}

      {/* Custom Coordinate Toasts */}
      {groupedToasts["custom"]?.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onOpenChange={(open) => {
            if (!open) onDismiss(toast.id!);
            toast.onOpenChange?.(open);
          }}
          isRenderedByContainer={true}
        />
      ))}
    </div>,
    document.body
  );
};

function getPositionStyles(pos: ToastPosition) {
  switch (pos) {
    case "top-left":
      return "top-0 left-0 items-start";
    case "top-center":
      return "top-0 left-1/2 -translate-x-1/2 items-center";
    case "top-right":
      return "top-0 right-0 items-end";
    case "bottom-left":
      return "bottom-0 left-0 flex-col-reverse items-start";
    case "bottom-center":
      return "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse items-center";
    case "bottom-right":
      return "bottom-0 right-0 flex-col-reverse items-end";
    case "center-left":
      return "top-1/2 left-0 -translate-y-1/2 items-start justify-center";
    case "center":
      return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center";
    case "center-right":
      return "top-1/2 right-0 -translate-y-1/2 items-end justify-center";
    default:
      return "top-0 right-0 items-end";
  }
}
