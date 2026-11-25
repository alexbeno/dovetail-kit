"use client";

import type { ComponentProps } from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { toggleGroup } from "@/lib/recipes";

function ToggleGroup({
  className,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Root>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      className={cn(toggleGroup.base, className)}
      {...props}
    />
  );
}

function ToggleGroupItem({
  className,
  ...props
}: ComponentProps<typeof ToggleGroupPrimitive.Item>) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleGroup.slots.item, className)}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem };
