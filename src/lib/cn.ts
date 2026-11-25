import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge has to know Dovetail's own theme keys, otherwise it reads
 * `text-label` (a font size) as a colour and drops it next to `text-grey`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      font: ["display"],
      text: ["label", "display"],
      tracking: ["display", "heading", "label", "button", "stamp"],
      shadow: ["lift", "float", "press"],
      ease: ["draft", "snap"],
      breakpoint: ["sheet"],
    },
  },
});

/** Joins class names and resolves Tailwind conflicts: the last one wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
