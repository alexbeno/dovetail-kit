import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { alert } from "@/lib/recipes";

const alertVariants = cva(alert.base, {
  variants: alert.variants,
  defaultVariants: alert.defaultVariants,
});

interface AlertProps
  extends ComponentProps<"div">, VariantProps<typeof alertVariants> {}

function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(alert.slots.title, className)}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(alert.slots.description, className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
export type { AlertProps };
