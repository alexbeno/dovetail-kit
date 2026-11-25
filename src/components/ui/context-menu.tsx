"use client";

import type { ComponentProps } from "react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { menu } from "@/lib/recipes";

/** The menu of a right click (or a long press). Same look as DropdownMenu. */
function ContextMenu(props: ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger(
  props: ComponentProps<typeof ContextMenuPrimitive.Trigger>,
) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuContent({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Content>) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        data-slot="context-menu-content"
        className={cn(menu.base, className)}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  );
}

interface ContextMenuItemProps extends ComponentProps<
  typeof ContextMenuPrimitive.Item
> {
  variant?: "default" | "destructive";
}

function ContextMenuItem({
  className,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  const tone = variant === "destructive" ? menu.slots.itemDestructive : null;
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-variant={variant}
      className={cn(menu.slots.item, tone, className)}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      className={cn(menu.slots.item, menu.slots.itemInset, className)}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className={menu.slots.indicator}>
        ×
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuLabel({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Label>) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="context-menu-label"
      className={cn(menu.slots.label, className)}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof ContextMenuPrimitive.Separator>) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      className={cn(menu.slots.separator, className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(menu.slots.shortcut, className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
};
export type { ContextMenuItemProps };
