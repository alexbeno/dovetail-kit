"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Dialog as DialogPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { dialog } from "@/lib/recipes";

const dialogVariants = cva(dialog.base, {
  variants: dialog.variants,
  defaultVariants: dialog.defaultVariants,
});

function Dialog(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogClose(props: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

interface DialogContentProps
  extends
    ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogVariants> {
  /** Hide the × in the corner, for dialogs that must be answered. */
  hideClose?: boolean;
}

function DialogContent({
  className,
  children,
  size,
  hideClose = false,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={dialog.slots.overlay}
      />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(dialogVariants({ size }), className)}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <DialogPrimitive.Close
            aria-label="Close"
            className={dialog.slots.close}
          >
            ×
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(dialog.slots.header, className)}
      {...props}
    />
  );
}

function DialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-body"
      className={cn(dialog.slots.body, className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(dialog.slots.footer, className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(dialog.slots.title, className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialog.slots.description, className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
export type { DialogContentProps };
