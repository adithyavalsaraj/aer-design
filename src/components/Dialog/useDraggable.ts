import { useCallback, useEffect, useRef, useState } from "react";

interface UseDraggableOptions {
  enabled: boolean;
  onDragStart?: () => void;
  onDragEnd?: (position: { x: number; y: number }) => void;
  initialPosition?: { x: number; y: number };
}

interface UseDraggableReturn {
  position: { x: number; y: number };
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  resetPosition: () => void;
  setPosition: (pos: { x: number; y: number }) => void;
}

export const useDraggable = ({
  enabled,
  onDragStart,
  onDragEnd,
  initialPosition = { x: 0, y: 0 },
}: UseDraggableOptions): UseDraggableReturn => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const elementStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;

      // Prevent text selection while dragging and stop event propagation
      e.preventDefault();
      e.stopPropagation();

      // Get the actual current position of the dialog element
      const target = e.currentTarget as HTMLElement;
      const dialog = target.closest('[role="dialog"]') as HTMLElement;

      if (dialog) {
        const rect = dialog.getBoundingClientRect();
        // If this is the first drag (position is still 0,0), use the actual DOM position
        if (position.x === 0 && position.y === 0) {
          elementStartPos.current = { x: rect.left, y: rect.top };
        } else {
          elementStartPos.current = position;
        }
      } else {
        elementStartPos.current = position;
      }

      setIsDragging(true);
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      onDragStart?.();
    },
    [enabled, position, onDragStart]
  );

  useEffect(() => {
    if (!isDragging || !enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const newX = elementStartPos.current.x + deltaX;
      const newY = elementStartPos.current.y + deltaY;

      // Constrain to viewport
      const maxX = window.innerWidth - 100; // Leave at least 100px visible
      const maxY = window.innerHeight - 100;

      const constrainedX = Math.max(0, Math.min(newX, maxX));
      const constrainedY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onDragEnd?.(position);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, enabled, position, onDragEnd]);

  const resetPosition = useCallback(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return {
    position,
    isDragging,
    handleMouseDown,
    resetPosition,
    setPosition,
  };
};
