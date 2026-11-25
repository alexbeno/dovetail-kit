import type { PropsWithChildren, ReactNode } from "react";
import { Cell, Cells } from "@/components/ui/drafting";
import { Caption, Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

interface SectionProps extends PropsWithChildren {
  id: string;
  /** Two-digit number shown before the caption: "03". */
  number: string;
  label: string;
  title: string;
  lead: ReactNode;
  /** Columns of the specimen grid from 901px up. */
  columns?: number;
}

/** One chapter of the showcase: a title cell, then a grid of specimens. */
export function Section({
  id,
  number,
  label,
  title,
  lead,
  columns = 4,
  children,
}: SectionProps) {
  return (
    <section id={id} className="border-t-[1.5px] border-ink">
      <div className="grid gap-2 px-5 py-10 sheet:px-11 sheet:py-14">
        <Caption tone="accent">
          {number} · {label}
        </Caption>
        <Heading level={1}>{title}</Heading>
        <Text tone="grey" className="max-w-2xl">
          {lead}
        </Text>
      </div>
      <Cells flush columns={columns} className="border-t-[1.5px]">
        {children}
      </Cells>
    </section>
  );
}

interface SpecimenProps extends PropsWithChildren {
  label: string;
  span?: number;
  spanSm?: number;
  className?: string;
}

/** One labelled example in a section's grid. */
export function Specimen({
  label,
  span = 2,
  spanSm = 2,
  className,
  children,
}: SpecimenProps) {
  return (
    <Cell label={label} span={span} spanSm={spanSm} className="py-5 sheet:px-6">
      <div className={cn("mt-4", className)}>{children}</div>
    </Cell>
  );
}
