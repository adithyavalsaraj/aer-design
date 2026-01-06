import React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";
import { useDialogContext } from "./DialogContext";
import type { DialogFooterProps } from "./types";

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className, align = "right", defaultActions }, ref) => {
    // Try to get context for onClose
    let context;
    try {
      context = useDialogContext();
    } catch {
      context = null;
    }

    const alignClasses = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
      "space-between": "justify-between",
    };

    const renderDefaultActions = () => {
      if (!defaultActions) return null;

      const {
        showCancel = true,
        showConfirm = true,
        cancelText = "Cancel",
        confirmText = "Confirm",
        onCancel,
        onConfirm,
        confirmVariant = "primary",
        confirmLoading = false,
        cancelDisabled = false,
        confirmDisabled = false,
      } = defaultActions;

      // Use context onClose if onCancel is not provided
      const handleCancel = onCancel ?? context?.onClose;

      return (
        <>
          {showCancel && (
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={cancelDisabled}
            >
              {cancelText}
            </Button>
          )}
          {showConfirm && (
            <Button
              variant={
                confirmVariant === "primary" ? "default" : confirmVariant
              }
              onClick={onConfirm}
              isLoading={confirmLoading}
              disabled={confirmDisabled}
            >
              {confirmText}
            </Button>
          )}
        </>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-6 py-4 border-t border-aer-border",
          alignClasses[align],
          className
        )}
      >
        {children || renderDefaultActions()}
      </div>
    );
  }
);

DialogFooter.displayName = "DialogFooter";
