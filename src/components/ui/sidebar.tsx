import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";
import { sidebar } from "@/lib/recipes";

interface SidebarProps extends ComponentProps<"aside"> {
  /** Folded to a 60px rail: items show their icon only. */
  collapsed?: boolean;
  /** Expanded width, any CSS length. Default 248px. */
  width?: string;
}

/** App navigation column: sections of mono items, the current one marked in orange. */
function Sidebar({
  className,
  style,
  collapsed = false,
  width,
  ...props
}: SidebarProps) {
  const vars = { "--sidebar-width": width } as CSSProperties;
  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed}
      style={{ ...vars, ...style }}
      className={cn(sidebar.base, className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(sidebar.slots.header, className)}
      {...props}
    />
  );
}

function SidebarBody({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar-body"
      className={cn(sidebar.slots.body, className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(sidebar.slots.footer, className)}
      {...props}
    />
  );
}

interface SidebarSectionProps extends ComponentProps<"div"> {
  /** Mono caption above the items. */
  label?: ReactNode;
}

function SidebarSection({
  className,
  label,
  children,
  ...props
}: SidebarSectionProps) {
  return (
    <div
      data-slot="sidebar-section"
      className={cn(sidebar.slots.section, className)}
      {...props}
    >
      {label == null ? null : (
        <div className={sidebar.slots.label}>{label}</div>
      )}
      {children}
    </div>
  );
}

interface SidebarItemProps extends ComponentProps<"a"> {
  icon?: ReactNode;
  /** Count badge, kbd… pushed to the far edge. */
  trailing?: ReactNode;
  /** The current page. */
  active?: boolean;
  /**
   * Render your router's link (or a button) as the item. Its own children are
   * kept as they are: `icon` and `trailing` are ignored.
   */
  asChild?: boolean;
}

function SidebarItem({
  className,
  icon,
  trailing,
  active = false,
  asChild = false,
  children,
  ...props
}: SidebarItemProps) {
  const shared = {
    "data-slot": "sidebar-item",
    "aria-current": active ? ("page" as const) : undefined,
    className: cn(sidebar.slots.item, className),
  };
  if (asChild) {
    return (
      <Slot.Root {...shared} {...props}>
        {children}
      </Slot.Root>
    );
  }
  return (
    <a {...shared} {...props}>
      {icon == null ? null : (
        <span aria-hidden className={sidebar.slots.itemIcon}>
          {icon}
        </span>
      )}
      <span className={sidebar.slots.itemText}>{children}</span>
      {trailing == null ? null : (
        <span className={sidebar.slots.itemTrailing}>{trailing}</span>
      )}
    </a>
  );
}

export {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarSection,
};
export type { SidebarItemProps, SidebarProps, SidebarSectionProps };
