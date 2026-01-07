// Simple singleton to track order of minimized dialogs
// Singleton to track z-index stacking of all dialogs
class DialogStackingManager {
  private listeners: Set<() => void> = new Set();
  // Stack of all instanceIds. Last element = highest likelihood of being on top.
  private stack: string[] = [];
  // Minimized ids subset (for calculating horizontal offset)
  private minimizedIds: string[] = [];

  // Configuration
  private stackingMode: "wrap" | "scroll" = "wrap";

  // Metadata for taskbar display
  private metadata: Map<
    string,
    { title?: string; icon?: any; onRestore?: () => void }
  > = new Map();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((l) => l());
  }

  setStackingMode(mode: "wrap" | "scroll") {
    if (this.stackingMode !== mode) {
      this.stackingMode = mode;
      this.notify();
    }
  }

  getStackingMode() {
    return this.stackingMode;
  }

  updateMetadata(
    id: string,
    data: { title?: string; icon?: any; onRestore?: () => void }
  ) {
    this.metadata.set(id, { ...this.metadata.get(id), ...data });
    this.notify();
  }

  getMetadata(id: string) {
    return this.metadata.get(id);
  }

  // Register a new dialog instance or bring it to front
  bringToFront(id: string) {
    const currentIdx = this.stack.indexOf(id);
    if (currentIdx === this.stack.length - 1 && this.stack.length > 0) {
      return;
    }

    this.stack = this.stack.filter((i) => i !== id);
    this.stack.push(id);
    this.notify();
  }

  remove(id: string) {
    if (!this.stack.includes(id) && !this.minimizedIds.includes(id)) return;
    this.stack = this.stack.filter((i) => i !== id);
    this.minimizedIds = this.minimizedIds.filter((i) => i !== id);
    this.metadata.delete(id);
    this.notify();
  }

  // Get z-index base: 50 + stack index
  getZIndex(id: string) {
    const idx = this.stack.indexOf(id);
    return idx === -1 ? -1 : 50 + idx;
  }

  // Minimized specific logic
  addMinimized(id: string) {
    if (!this.minimizedIds.includes(id)) {
      this.minimizedIds.push(id);
      this.notify();
    }
  }

  removeMinimized(id: string) {
    if (this.minimizedIds.includes(id)) {
      this.minimizedIds = this.minimizedIds.filter((i) => i !== id);
      this.notify();
    }
  }

  getMinimizedIndex(id: string) {
    return this.minimizedIds.indexOf(id);
  }

  getMinimizedIds() {
    return [...this.minimizedIds];
  }
}

export const dialogStackingManager = new DialogStackingManager();
