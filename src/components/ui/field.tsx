import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { choice, field } from "@/lib/recipes";

/** Label + control + hint or error, stacked. */
function Field({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="field" className={cn(field.base, className)} {...props} />
  );
}

function FieldHint({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-hint"
      className={cn(field.slots.hint, className)}
      {...props}
    />
  );
}

function FieldError({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      role="alert"
      data-slot="field-error"
      className={cn(field.slots.error, className)}
      {...props}
    />
  );
}

/** A checkbox, radio or switch next to its text. */
function Choice({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      data-slot="choice"
      className={cn(choice.base, className)}
      {...props}
    />
  );
}

export { Choice, Field, FieldError, FieldHint };
