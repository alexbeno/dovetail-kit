"use client";

import {
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { split } from "@/lib/recipes";
import { clampSize, sizeFromKey } from "@/lib/split";

interface SplitProps extends Omit<ComponentProps<"div">, "children"> {
  /** The two panes. */
  first: ReactNode;
  second: ReactNode;
  /** horizontal = side by side; vertical = stacked. */
  direction?: "horizontal" | "vertical";
  /** Initial size of the first pane, in % of the container. */
  defaultSize?: number;
  /** Controlled size in %. */
  size?: number;
  onSizeChange?: (size: number) => void;
  /** Limits in %. */
  min?: number;
  max?: number;
  /** Accessible name of the handle. */
  handleLabel?: string;
}

/**
 * Two panes with a draggable ink rule between them (list + detail, transcript
 * + diff). Drag, or focus the handle and use the arrow keys.
 */
function Split({
  className,
  first,
  second,
  direction = "horizontal",
  defaultSize = 40,
  size,
  onSizeChange,
  min = 15,
  max = 85,
  handleLabel = "Resize panes",
  ...props
}: SplitProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [uncontrolled, setUncontrolled] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const current = size ?? uncontrolled;
  const isVertical = direction === "vertical";

  function update(next: number) {
    const clamped = clampSize(next, min, max);
    if (size === undefined) {
      setUncontrolled(clamped);
    }
    onSizeChange?.(clamped);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isDragging || rootRef.current === null) {
      return;
    }
    const rect = rootRef.current.getBoundingClientRect();
    const ratio = isVertical
      ? (event.clientY - rect.top) / rect.height
      : (event.clientX - rect.left) / rect.width;
    update(ratio * 100);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const next = sizeFromKey(event.key, {
      current,
      min,
      max,
      isVertical,
      isLargeStep: event.shiftKey,
    });
    if (next === null) {
      return;
    }
    update(next);
    event.preventDefault();
  }

  return (
    <div
      ref={rootRef}
      data-slot="split"
      data-direction={direction}
      className={cn(split.base, className)}
      {...props}
    >
      <div className={split.slots.pane} style={{ flex: `0 0 ${current}%` }}>
        {first}
      </div>
      <div
        role="separator"
        aria-label={handleLabel}
        aria-orientation={isVertical ? "horizontal" : "vertical"}
        aria-valuenow={Math.round(current)}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        data-dragging={isDragging ? "" : undefined}
        className={split.slots.handle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        onKeyDown={handleKeyDown}
      />
      <div className={split.slots.pane}>{second}</div>
    </div>
  );
}

export { Split };
export type { SplitProps };
