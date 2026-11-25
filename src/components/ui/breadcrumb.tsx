import type { ComponentProps } from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/cn";
import { breadcrumb } from "@/lib/recipes";

function Breadcrumb(props: ComponentProps<"nav">) {
  return <nav aria-label="Breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(breadcrumb.base, className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn(breadcrumb.slots.item, className)}
      {...props}
    />
  );
}

interface BreadcrumbLinkProps extends ComponentProps<"a"> {
  asChild?: boolean;
}

function BreadcrumbLink({
  className,
  asChild = false,
  ...props
}: BreadcrumbLinkProps) {
  const Comp = asChild ? Slot.Root : "a";
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(breadcrumb.slots.link, className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn(breadcrumb.slots.page, className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  className,
  children,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      aria-hidden
      role="presentation"
      data-slot="breadcrumb-separator"
      className={cn(breadcrumb.slots.separator, className)}
      {...props}
    >
      {children ?? "/"}
    </li>
  );
}

export {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
