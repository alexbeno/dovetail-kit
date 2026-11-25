import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { skeleton } from "@/lib/recipes";

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      data-slot="skeleton"
      className={cn(skeleton.base, className)}
      {...props}
    />
  );
}

export { Skeleton };
