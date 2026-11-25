import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { input } from "@/lib/recipes";

function Input({ className, type, ...props }: ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(input.base, className)}
      {...props}
    />
  );
}

export { Input };
