import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";
import { button } from "@/lib/recipes";

const buttonVariants = cva(button.base, {
  variants: button.variants,
  defaultVariants: button.defaultVariants,
});

interface ButtonProps
  extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  /** Render the child element (a link, for instance) with the button's look. */
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
