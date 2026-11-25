"use client";

import type { ComponentProps } from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { cn } from "@/lib/cn";
import { accordion } from "@/lib/recipes";

function Accordion({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(accordion.base, className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordion.slots.item, className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(accordion.slots.trigger, className)}
        {...props}
      >
        <span aria-hidden className={accordion.slots.sign} />
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={accordion.slots.content}
      {...props}
    >
      <div className={cn(accordion.slots.body, className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
