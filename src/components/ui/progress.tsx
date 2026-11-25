"use client";

import type { ComponentProps } from "react";
import { Progress as ProgressPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { progress } from "@/lib/recipes";

/** Omit `value` (or pass null) for an indeterminate bar. */
function Progress({
  className,
  value,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) {
  const width = value == null ? undefined : `${value}%`;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(progress.base, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={progress.slots.indicator}
        style={{ width }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
