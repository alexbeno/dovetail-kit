"use client";

import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { getPageItems } from "@/lib/pagination";
import { pagination } from "@/lib/recipes";

const paginationVariants = cva(pagination.base, {
  variants: pagination.variants,
  defaultVariants: pagination.defaultVariants,
});

interface PaginationProps
  extends
    Omit<ComponentProps<"nav">, "onChange">,
    VariantProps<typeof paginationVariants> {
  /** 1-based current page. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Pages shown on each side of the current one. */
  siblingCount?: number;
}

function Pagination({
  className,
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  size,
  ...props
}: PaginationProps) {
  function goTo(next: number) {
    onPageChange(Math.min(pageCount, Math.max(1, next)));
  }

  return (
    <nav aria-label="Pagination" data-slot="pagination" {...props}>
      <div className={cn(paginationVariants({ size }), className)}>
        <button
          type="button"
          className={pagination.slots.item}
          disabled={page <= 1}
          aria-label="Previous page"
          onClick={() => goTo(page - 1)}
        >
          ←
        </button>
        {getPageItems(page, pageCount, siblingCount).map((item, index) =>
          item === "gap" ? (
            <span
              key={`gap-${index}`}
              aria-hidden
              className={pagination.slots.gap}
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              className={pagination.slots.item}
              aria-current={item === page ? "page" : undefined}
              aria-label={`Page ${item}`}
              onClick={() => goTo(item)}
            >
              {String(item).padStart(2, "0")}
            </button>
          ),
        )}
        <button
          type="button"
          className={pagination.slots.item}
          disabled={page >= pageCount}
          aria-label="Next page"
          onClick={() => goTo(page + 1)}
        >
          →
        </button>
      </div>
    </nav>
  );
}

export { Pagination };
export type { PaginationProps };
