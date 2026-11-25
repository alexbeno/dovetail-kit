import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  caption,
  cell,
  cells,
  desk,
  dimension,
  drawingSheet,
  emptyState,
  headerStrip,
  itemNumber,
  sectionLine,
  separator,
  stamp,
  status,
  value,
} from "@/lib/recipes";

/*
 * The parts that make a screen a drawing: the desk, the sheet, the title-block
 * grid and the marks a draughtsman leaves on it.
 */

const drawingSheetVariants = cva(drawingSheet.base, {
  variants: drawingSheet.variants,
});
const cellsVariants = cva(cells.base, { variants: cells.variants });
const cellVariants = cva(cell.base, { variants: cell.variants });
const valueVariants = cva(value.base, {
  variants: value.variants,
  defaultVariants: value.defaultVariants,
});
const statusVariants = cva(status.base, {
  variants: status.variants,
  defaultVariants: status.defaultVariants,
});
const stampVariants = cva(stamp.base, {
  variants: stamp.variants,
  defaultVariants: stamp.defaultVariants,
});
const itemNumberVariants = cva(itemNumber.base, {
  variants: itemNumber.variants,
  defaultVariants: itemNumber.defaultVariants,
});

/** The desk under the sheet: the page background of a Dovetail screen. */
function Desk({ className, ...props }: ComponentProps<"div">) {
  return (
    <div data-slot="desk" className={cn(desk.base, className)} {...props} />
  );
}

const ZONES = {
  top: ["8", "7", "6", "5", "4", "3", "2", "1"],
  bottom: ["8", "7", "6", "5", "4", "3", "2", "1"],
  left: ["A", "B", "C", "D"],
  right: ["A", "B", "C", "D"],
} as const;

function ZoneMarkers() {
  return Object.entries(ZONES).map(([side, labels]) => (
    <div
      key={side}
      aria-hidden
      data-side={side}
      className={drawingSheet.slots.zones}
    >
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  ));
}

interface DrawingSheetProps
  extends ComponentProps<"div">, VariantProps<typeof drawingSheetVariants> {
  /** Inner frame plus zone markers (1–8, A–D) in the margin, as on a real sheet. */
  zoned?: boolean;
}

/** The drawing sheet: a 2px ink frame on paper. One per screen. */
function DrawingSheet({
  className,
  ruled,
  framed,
  zoned = false,
  children,
  ...props
}: DrawingSheetProps) {
  return (
    <div
      data-slot="drawing-sheet"
      className={cn(
        drawingSheetVariants({ ruled, framed: zoned ? true : framed }),
        className,
      )}
      {...props}
    >
      {zoned ? <ZoneMarkers /> : null}
      {children}
    </div>
  );
}

/** Sticky strip at the top of the sheet. Each child becomes a cell. */
function HeaderStrip({ className, ...props }: ComponentProps<"header">) {
  return (
    <header
      data-slot="header-strip"
      className={cn(headerStrip.base, className)}
      {...props}
    />
  );
}

interface HeaderStripCellProps extends ComponentProps<"div"> {
  /** Push the content to the end: for actions. */
  end?: boolean;
}

function HeaderStripCell({
  className,
  end = false,
  ...props
}: HeaderStripCellProps) {
  return (
    <div
      data-slot="header-strip-cell"
      className={cn(end ? headerStrip.slots.end : null, className)}
      {...props}
    />
  );
}

function HeaderStripNav({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      data-slot="header-strip-nav"
      className={cn(headerStrip.slots.nav, className)}
      {...props}
    />
  );
}

interface CellsProps
  extends ComponentProps<"div">, VariantProps<typeof cellsVariants> {
  /** Columns from 901px up. */
  columns?: number;
  /** Columns below 901px. */
  columnsSm?: number;
}

/** The title-block grid: cells separated by exactly one ink hairline. */
function Cells({
  className,
  style,
  columns = 4,
  columnsSm = 2,
  flush,
  ...props
}: CellsProps) {
  const vars = { "--cells": columns, "--cells-sm": columnsSm } as CSSProperties;
  return (
    <div
      data-slot="cells"
      style={{ ...vars, ...style }}
      className={cn(cellsVariants({ flush }), className)}
      {...props}
    />
  );
}

interface CellProps
  extends
    Omit<ComponentProps<"div">, "label">,
    VariantProps<typeof cellVariants> {
  /** Mono caption above the content. */
  label?: ReactNode;
  /** Columns spanned from 901px up. */
  span?: number;
  /** Columns spanned below 901px. Defaults to `span`, capped to the grid. */
  spanSm?: number;
}

function Cell({
  className,
  style,
  label,
  span,
  spanSm,
  interactive,
  accent,
  flush,
  children,
  ...props
}: CellProps) {
  const vars = { "--span": span, "--span-sm": spanSm } as CSSProperties;
  return (
    <div
      data-slot="cell"
      style={{ ...vars, ...style }}
      className={cn(cellVariants({ interactive, accent, flush }), className)}
      {...props}
    >
      {label == null ? null : (
        <span className={cn(caption.base, caption.variants.tone.grey, "mb-1")}>
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

interface ValueProps
  extends ComponentProps<"span">, VariantProps<typeof valueVariants> {}

/** A value under its caption. `variant="lg"` for the big figure of a cell. */
function Value({ className, variant, ...props }: ValueProps) {
  return (
    <span
      data-slot="value"
      className={cn(valueVariants({ variant }), className)}
      {...props}
    />
  );
}

interface StatusProps
  extends ComponentProps<"span">, VariantProps<typeof statusVariants> {}

/** A dot and a word. `pulse` for something live. */
function Status({ className, tone, pulse, ...props }: StatusProps) {
  return (
    <span
      data-slot="status"
      className={cn(statusVariants({ tone, pulse }), className)}
      {...props}
    />
  );
}

interface StampProps
  extends ComponentProps<"span">, VariantProps<typeof stampVariants> {}

/** Rubber-stamped approval. */
function Stamp({ className, tone, animate, ...props }: StampProps) {
  return (
    <span
      data-slot="stamp"
      className={cn(stampVariants({ tone, animate }), className)}
      {...props}
    />
  );
}

interface ItemNumberProps
  extends ComponentProps<"span">, VariantProps<typeof itemNumberVariants> {}

/** Item number: a balloon on the drawing. */
function ItemNumber({ className, variant, ...props }: ItemNumberProps) {
  return (
    <span
      data-slot="item-number"
      className={cn(itemNumberVariants({ variant }), className)}
      {...props}
    />
  );
}

/** Dimension line: ticks at both ends, the measurement in the gap. */
function Dimension({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="dimension"
      className={cn(dimension.base, className)}
      {...props}
    />
  );
}

interface SectionLineProps extends Omit<ComponentProps<"div">, "children"> {
  /** The letter at both ends: "A" draws "A — A". */
  letter?: string;
}

/** Cutting-plane line between two parts of a sheet. */
function SectionLine({ className, letter = "A", ...props }: SectionLineProps) {
  return (
    <div
      aria-hidden
      data-slot="section-line"
      className={cn(sectionLine.base, className)}
      {...props}
    >
      <span>{letter}</span>
      <hr className={cn(separator.base, separator.variants.variant.cut)} />
      <span>{letter}</span>
    </div>
  );
}

function EmptyState({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(emptyState.base, className)}
      {...props}
    />
  );
}

export {
  Cell,
  Cells,
  Desk,
  Dimension,
  DrawingSheet,
  EmptyState,
  HeaderStrip,
  HeaderStripCell,
  HeaderStripNav,
  ItemNumber,
  SectionLine,
  Stamp,
  Status,
  Value,
};
export type {
  CellProps,
  CellsProps,
  DrawingSheetProps,
  HeaderStripCellProps,
  ItemNumberProps,
  SectionLineProps,
  StampProps,
  StatusProps,
  ValueProps,
};
