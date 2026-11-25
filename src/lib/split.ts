/** Keeps a pane size (in %) inside its limits. */
export function clampSize(size: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, size));
}

interface KeyContext {
  current: number;
  min: number;
  max: number;
  /** Stacked panes: the handle moves with the up and down arrows. */
  isVertical: boolean;
  /** Shift held: 10% steps instead of 2%. */
  isLargeStep: boolean;
}

/** New size of the first pane after a key press on the handle, or null if the key does nothing. */
export function sizeFromKey(key: string, context: KeyContext): number | null {
  const step = context.isLargeStep ? 10 : 2;
  const decrease = context.isVertical ? "ArrowUp" : "ArrowLeft";
  const increase = context.isVertical ? "ArrowDown" : "ArrowRight";
  if (key === decrease) {
    return context.current - step;
  }
  if (key === increase) {
    return context.current + step;
  }
  if (key === "Home") {
    return context.min;
  }
  if (key === "End") {
    return context.max;
  }
  return null;
}
