import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { nativeSelect } from "@/lib/recipes";

/** A native <select>: the lightest option, and the one the HTML build uses. */
function NativeSelect({ className, ...props }: ComponentProps<"select">) {
  return (
    <select
      data-slot="native-select"
      className={cn(nativeSelect.base, className)}
      {...props}
    />
  );
}

export { NativeSelect };
