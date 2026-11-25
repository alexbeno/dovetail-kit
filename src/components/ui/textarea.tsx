import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { textarea } from "@/lib/recipes";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textarea.base, className)}
      {...props}
    />
  );
}

export { Textarea };
