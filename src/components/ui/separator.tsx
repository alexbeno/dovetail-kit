"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Separator as SeparatorPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { separator } from "@/lib/recipes";

const separatorVariants = cva(separator.base, {
  variants: separator.variants,
  defaultVariants: separator.defaultVariants,
});

interface SeparatorProps
  extends
    ComponentProps<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  variant,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Separator };
export type { SeparatorProps };
