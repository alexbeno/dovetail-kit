"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { button, dialog } from "@/lib/recipes";

const alertDialogVariants = cva(dialog.base, {
  variants: dialog.variants,
  defaultVariants: dialog.defaultVariants,
});
const buttonVariants = cva(button.base, {
  variants: button.variants,
  defaultVariants: button.defaultVariants,
});

/** A dialog that must be answered: no ×, no dismiss on outside click. */
function AlertDialog(props: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(
  props: ComponentProps<typeof AlertDialogPrimitive.Trigger>,
) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

interface AlertDialogContentProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Content>,
    VariantProps<typeof alertDialogVariants> {}

function AlertDialogContent({
  className,
  size,
  danger,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        data-slot="alert-dialog-overlay"
        className={dialog.slots.overlay}
      />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(alertDialogVariants({ size, danger }), className)}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(dialog.slots.header, "pr-5", className)}
      {...props}
    />
  );
}

function AlertDialogBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-body"
      className={cn(dialog.slots.body, className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(dialog.slots.footer, className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(dialog.slots.title, className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(dialog.slots.description, className)}
      {...props}
    />
  );
}

interface AlertDialogActionProps
  extends
    ComponentProps<typeof AlertDialogPrimitive.Action>,
    VariantProps<typeof buttonVariants> {}

/** The confirming button. `variant="destructive"` for a deletion. */
function AlertDialogAction({
  className,
  variant = "accent",
  size,
  ...props
}: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: "ghost" }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
export type { AlertDialogActionProps, AlertDialogContentProps };
