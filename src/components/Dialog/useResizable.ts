import { useCallback, useEffect, useRef, useState } from "react";

interface UseResizableOptions {
  enabled: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onResizeStart?: () => void;
  onResizeEnd?: (size: { width: number; height: number }) => void;
  initialSize?: { width: number; height: number };
}

interface UseResizableReturn {
  size: { width: number; height: number } | null;
  isResizing: boolean;
  resizeHandleProps: {
    onMouseDown: (direction: ResizeDirection) => (e: React.MouseEvent) => void;
  };
  resetSize: () => void;
}

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export const useResizable = ({
  enabled,
  minWidth = 200,
  minHeight = 100,
  maxWidth = typeof window !== "undefined" ? window.innerWidth : 1000,
  maxHeight = typeof window !== "undefined" ? window.innerHeight : 800,
  onResizeStart,
  onResizeEnd,
  initialSize,
  ref,
}: UseResizableOptions & {
  ref?: React.RefObject<HTMLDivElement | null>;
}): UseResizableReturn => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    initialSize || null
  );
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const resizeDirection = useRef<ResizeDirection>("se");

  const handleMouseDown = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      if (!enabled) return;

      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      resizeStartPos.current = { x: e.clientX, y: e.clientY };

      // Calculate starting size accurately
      if (size) {
        resizeStartSize.current = size;
      } else if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        resizeStartSize.current = { width: rect.width, height: rect.height };
      } else {
        resizeStartSize.current = { width: 0, height: 0 };
      }

      resizeDirection.current = direction;
      onResizeStart?.();
    },
    [enabled, size, onResizeStart, ref]
  );

  useEffect(() => {
    if (!isResizing || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartPos.current.x;
      const deltaY = e.clientY - resizeStartPos.current.y;

      let newWidth = resizeStartSize.current.width;
      let newHeight = resizeStartSize.current.height;

      const dir = resizeDirection.current;

      // Calculate new dimensions based on resize direction
      if (dir.includes("e")) {
        newWidth = resizeStartSize.current.width + deltaX;
      }
      if (dir.includes("w")) {
        newWidth = resizeStartSize.current.width - deltaX;
      }
      if (dir.includes("s")) {
        newHeight = resizeStartSize.current.height + deltaY;
      }
      if (dir.includes("n")) {
        newHeight = resizeStartSize.current.height - deltaY;
      }

      // Apply constraints
      newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

      setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      if (size) {
        onResizeEnd?.(size);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isResizing,
    enabled,
    size,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    onResizeEnd,
  ]);

  const resetSize = useCallback(() => {
    setSize(initialSize || null);
  }, [initialSize]);

  return {
    size,
    isResizing,
    resizeHandleProps: {
      onMouseDown: handleMouseDown,
    },
    resetSize,
  };
};
