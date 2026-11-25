import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { table } from "@/lib/recipes";

const tableVariants = cva(table.base, { variants: table.variants });

interface TableProps
  extends ComponentProps<"table">, VariantProps<typeof tableVariants> {}

/** The table styles its own rows and cells: the parts below only carry slots and overrides. */
function Table({ className, compact, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className={table.slots.container}>
      <table
        data-slot="table"
        className={cn(tableVariants({ compact }), className)}
        {...props}
      />
    </div>
  );
}

function TableHeader(props: ComponentProps<"thead">) {
  return <thead data-slot="table-header" {...props} />;
}

function TableBody(props: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" {...props} />;
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-ink font-medium", className)}
      {...props}
    />
  );
}

function TableRow(props: ComponentProps<"tr">) {
  return <tr data-slot="table-row" {...props} />;
}

function TableHead(props: ComponentProps<"th">) {
  return <th data-slot="table-head" scope="col" {...props} />;
}

interface TableCellProps extends ComponentProps<"td"> {
  /** Right-aligned mono figures. */
  numeric?: boolean;
}

function TableCell({ className, numeric = false, ...props }: TableCellProps) {
  return (
    <td
      data-slot="table-cell"
      className={cn(numeric ? table.slots.num : null, className)}
      {...props}
    />
  );
}

function TableCaption(props: ComponentProps<"caption">) {
  return <caption data-slot="table-caption" {...props} />;
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
export type { TableCellProps, TableProps };
