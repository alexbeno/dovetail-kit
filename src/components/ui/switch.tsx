"use client";

import type { ComponentProps } from "react";
import { Switch as SwitchPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { switchControl } from "@/lib/recipes";

function Switch({
  className,
  ...props
}: ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchControl.base, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchControl.slots.thumb}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
