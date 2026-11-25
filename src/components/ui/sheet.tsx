"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Dialog as SheetPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { sheet } from "@/lib/recipes";

/**
 * shadcn's Sheet: a panel sliding from an edge. Not to be confused with the
 * drawing sheet of a Dovetail screen, which is `DrawingSheet` in drafting.tsx.
 */
const sheetVariants = cva(sheet.base, {
  variants: sheet.variants,
  defaultVariants: sheet.defaultVariants,
});

function Sheet(props: ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

interface SheetContentProps
  extends
    ComponentProps<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

function SheetContent({
  className,
  children,
  side,
  ...props
}: SheetContentProps) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay
        data-slot="sheet-overlay"
        className={sheet.slots.overlay}
      />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close aria-label="Close" className={sheet.slots.close}>
          ×
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

function SheetHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(sheet.slots.header, className)}
      {...props}
    />
  );
}

function SheetBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn(sheet.slots.body, className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn(sheet.slots.footer, className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn(sheet.slots.title, className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn(sheet.slots.description, className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
export type { SheetContentProps };
