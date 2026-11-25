import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  caption,
  itemNumber,
  notes,
  parts,
  revisions,
  table,
} from "@/lib/recipes";

/*
 * The lists found on a drawing: the parts list, the revision block and the
 * general notes.
 */

const notesVariants = cva(notes.base, {
  variants: notes.variants,
  defaultVariants: notes.defaultVariants,
});

interface Part {
  /** Item number shown in the balloon. */
  item: ReactNode;
  name: ReactNode;
  /** Mono line under the name: material, reference. */
  meta?: ReactNode;
  description?: ReactNode;
}

interface PartsListProps extends Omit<ComponentProps<"table">, "children"> {
  items: Part[];
  /** Column heads. */
  headings?: [ReactNode, ReactNode, ReactNode];
}

/** Items of an assembly: balloon, name in Archivo, description. */
function PartsList({
  className,
  items,
  headings = ["Item", "Part", "Description"],
  ...props
}: PartsListProps) {
  return (
    <div className={table.slots.container}>
      <table
        data-slot="parts-list"
        className={cn(table.base, parts.base, className)}
        {...props}
      >
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th key={index} scope="col">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((part, index) => (
            <tr key={index}>
              <td>
                <span
                  className={cn(
                    itemNumber.base,
                    itemNumber.variants.variant.outlined,
                  )}
                >
                  {part.item}
                </span>
              </td>
              <td>
                <span className={parts.slots.name}>{part.name}</span>
                {part.meta == null ? null : (
                  <span className={parts.slots.meta}>{part.meta}</span>
                )}
              </td>
              <td>{part.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface Revision {
  rev: ReactNode;
  name: ReactNode;
  /** Mono line under the name. */
  detail?: ReactNode;
  date: ReactNode;
  /** The revision in force. */
  current?: boolean;
}

interface RevisionListProps extends Omit<
  ComponentProps<"div">,
  "children" | "title"
> {
  items: Revision[];
  title?: ReactNode;
  footer?: ReactNode;
}

/** Revisions: a compact history, newest at the bottom. */
function RevisionList({
  className,
  items,
  title = "Revisions",
  footer,
  ...props
}: RevisionListProps) {
  return (
    <div
      data-slot="revision-list"
      className={cn(revisions.base, className)}
      {...props}
    >
      <div
        className={cn(
          caption.base,
          caption.variants.tone.grey,
          revisions.slots.title,
        )}
      >
        {title}
      </div>
      <div className={revisions.slots.head}>
        <span>Rev</span>
        <span>Change</span>
        <span>Date</span>
      </div>
      <div>
        {items.map((revision, index) => (
          <div
            key={index}
            data-current={revision.current === true}
            className={revisions.slots.row}
          >
            <span>{revision.rev}</span>
            <span>
              {revision.name}
              {revision.detail == null ? null : (
                <span className={revisions.slots.detail}>
                  {revision.detail}
                </span>
              )}
            </span>
            <span>{revision.date}</span>
          </div>
        ))}
      </div>
      {footer == null ? null : (
        <div className={revisions.slots.footer}>{footer}</div>
      )}
    </div>
  );
}

interface NoteListProps
  extends ComponentProps<"ol">, VariantProps<typeof notesVariants> {}

/** General notes: numbered, mono, pencil grey. Children are <li>. */
function NoteList({ className, tone, ...props }: NoteListProps) {
  return (
    <ol
      data-slot="note-list"
      className={cn(notesVariants({ tone }), className)}
      {...props}
    />
  );
}

export { NoteList, PartsList, RevisionList };
export type {
  NoteListProps,
  Part,
  PartsListProps,
  Revision,
  RevisionListProps,
};
