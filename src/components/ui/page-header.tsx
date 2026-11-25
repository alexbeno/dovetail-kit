import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { pageHeader } from "@/lib/recipes";

/** Top of a page: trail or caption, title, one-line description, actions. */
function PageHeader({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="page-header"
      className={cn(pageHeader.base, className)}
      {...props}
    />
  );
}

/** Full-width first row: a Breadcrumb or a Caption. */
function PageHeaderTop({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-top"
      className={cn(pageHeader.slots.top, className)}
      {...props}
    />
  );
}

/** The Heading and its description. */
function PageHeaderText({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-text"
      className={cn(pageHeader.slots.text, className)}
      {...props}
    />
  );
}

/** Buttons on the right: put the one accent action last. */
function PageHeaderActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn(pageHeader.slots.actions, className)}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderActions, PageHeaderText, PageHeaderTop };
