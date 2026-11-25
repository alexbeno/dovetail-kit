import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { spinner } from "@/lib/recipes";

interface SpinnerProps extends ComponentProps<"span"> {
  /** Accessible name. */
  label?: string;
}

function Spinner({ className, label = "Loading", ...props }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      data-slot="spinner"
      className={cn(spinner.base, className)}
      {...props}
    />
  );
}

export { Spinner };
export type { SpinnerProps };
