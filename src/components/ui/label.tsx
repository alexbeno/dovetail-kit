"use client";

import type { ComponentProps } from "react";
import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { label } from "@/lib/recipes";

function Label({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(label.base, className)}
      {...props}
    />
  );
}

export { Label };
