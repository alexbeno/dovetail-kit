export type PageItem = number | "gap";

/** Page numbers to show around `page`, with "gap" for the elided runs. */
export function getPageItems(
  page: number,
  pageCount: number,
  siblingCount = 1,
): PageItem[] {
  const visible = siblingCount * 2 + 5;
  if (pageCount <= visible) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const start = Math.max(2, page - siblingCount);
  const end = Math.min(pageCount - 1, page + siblingCount);
  const items: PageItem[] = [1];
  if (start > 2) {
    items.push("gap");
  }
  for (let current = start; current <= end; current += 1) {
    items.push(current);
  }
  if (end < pageCount - 1) {
    items.push("gap");
  }
  items.push(pageCount);
  return items;
}
