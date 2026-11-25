/**
 * Dovetail recipes: every component's Tailwind classes, in one place.
 *
 * This file is the single source of styles for both outputs:
 *   - React: `src/ui/*.tsx` feed these strings to `cva()` / `cn()`.
 *   - HTML:  `html/build.mjs` turns each recipe into a plain class
 *            (`.btn`, `.btn-accent`, `.card-header`...) compiled into
 *            `dist/dovetail.css`, usable without React or a build step.
 *
 * Rules for a recipe string: only utilities that work under `@apply`
 * (no `group`/`peer` markers), tokens only, square corners, ink rules
 * instead of shadows.
 */

export interface Recipe {
  /** Class name in the HTML build: `btn` gives `.btn`, `.btn-<variant value>`, `.btn-<slot>`. */
  name: string;
  /** Classes of the root element. */
  base: string;
  /** cva-style variants. In HTML each value becomes `.name-value`. */
  variants?: Record<string, Record<string, string>>;
  defaultVariants?: Record<string, string>;
  /** Named parts. In HTML each becomes `.name-slot` (camelCase turns into kebab-case). */
  slots?: Record<string, string>;
  /** Extra root classes for the HTML build only, where a native element replaces a Radix part. */
  html?: string;
}

const FIELD =
  "w-full min-w-0 appearance-none border-[1.5px] border-input bg-paper px-3 text-base text-ink transition-[border-color,box-shadow] duration-150 placeholder:text-grey/80 hover:border-pen focus-visible:border-pen focus-visible:ring-1 focus-visible:ring-pen focus-visible:outline-none aria-invalid:border-danger disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-input";

const CAPTION = "font-mono text-label tracking-label uppercase";

const FLOATING =
  "z-50 border-[1.5px] border-ink bg-popover text-popover-foreground shadow-float outline-none animate-pop-in";

const MENU_ITEM =
  "relative flex min-h-[34px] w-full cursor-pointer items-center gap-3 px-4 py-1 text-left text-base outline-none select-none hover:bg-pen/10 hover:text-pen focus-visible:bg-pen/10 focus-visible:text-pen data-highlighted:bg-pen/10 data-highlighted:text-pen data-disabled:pointer-events-none data-disabled:opacity-40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0";

const OVERLAY_HEADER =
  "flex flex-col gap-1 border-b-[1.5px] border-ink py-4 pr-12 pl-5";
const OVERLAY_TITLE = "font-display text-xl font-semibold font-stretch-[88%]";
const OVERLAY_DESCRIPTION = "text-sm text-grey";
const OVERLAY_FOOTER =
  "flex flex-wrap justify-end gap-3 border-t border-ink px-5 py-4";
const OVERLAY_CLOSE =
  "absolute top-3 right-3 inline-grid size-8 cursor-pointer place-items-center font-mono text-xl leading-none transition-colors duration-150 hover:text-pen";

/* ─── Actions ────────────────────────────────────────────────────────────── */

export const button = {
  name: "btn",
  base: "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 border-[1.5px] font-mono font-medium tracking-button whitespace-nowrap uppercase no-underline transition-[scale,background-color,color,border-color] duration-150 select-none active:scale-[0.96] disabled:pointer-events-none disabled:opacity-40 aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      /** Solid ink. The safe default. */
      default: "border-ink bg-ink text-paper hover:bg-ink/85",
      /** The orange pen: the single primary action of a screen. */
      accent:
        "border-pen bg-pen text-paper hover:bg-[color-mix(in_srgb,var(--dt-color-pen)_88%,var(--dt-color-ink))]",
      outline: "border-ink bg-transparent text-ink hover:bg-ink/6",
      secondary: "border-transparent bg-secondary text-ink hover:bg-ink/10",
      ghost: "border-transparent bg-transparent text-ink hover:text-pen",
      destructive:
        "border-danger bg-transparent text-danger hover:bg-danger hover:text-paper",
      link: "border-transparent bg-transparent text-pen underline-offset-4 hover:underline",
    },
    size: {
      default: "h-11 px-4 text-xs",
      sm: "h-8 px-3 text-label",
      lg: "h-12 px-6 text-sm",
      icon: "size-11 text-xs",
      "icon-sm": "size-8 text-label",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
} as const satisfies Recipe;

export const link = {
  name: "link",
  base: "cursor-pointer text-inherit transition-colors duration-150 hover:text-pen",
  variants: {
    variant: {
      default: "",
      /** Underline that draws in on hover. */
      draw: "bg-[linear-gradient(var(--dt-color-pen),var(--dt-color-pen))] bg-[length:0_1.5px] bg-[position:0_100%] bg-no-repeat transition-[background-size,color] duration-300 hover:bg-[length:100%_1.5px]",
      underline: "underline decoration-1 underline-offset-[0.18em]",
      accent: "text-pen underline-offset-[0.18em] hover:underline",
    },
  },
  defaultVariants: { variant: "default" },
} as const satisfies Recipe;

export const toggleGroup = {
  name: "toggle-group",
  base: "inline-flex border-[1.5px] border-ink",
  slots: {
    item: "inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 px-3 font-mono text-xs tracking-button text-grey uppercase transition-colors duration-150 not-first:border-l not-first:border-ink hover:bg-accent hover:text-ink focus-visible:-outline-offset-2 disabled:pointer-events-none disabled:opacity-40 aria-pressed:bg-ink aria-pressed:text-paper data-[state=on]:bg-ink data-[state=on]:text-paper",
  },
} as const satisfies Recipe;

/* ─── Type ───────────────────────────────────────────────────────────────── */

/** The small mono caption above every value on the drawing. */
export const caption = {
  name: "caption",
  base: `block ${CAPTION}`,
  variants: {
    tone: {
      grey: "text-grey",
      ink: "text-ink",
      accent: "text-pen",
    },
  },
  defaultVariants: { tone: "grey" },
} as const satisfies Recipe;

/** The name on the sheet. At most one per screen. */
export const display = {
  name: "display",
  base: "min-w-0 font-display text-display font-black tracking-display uppercase font-stretch-[125%]",
} as const satisfies Recipe;

export const heading = {
  name: "heading",
  base: "text-inherit",
  variants: {
    level: {
      "1": "font-display text-3xl font-medium tracking-heading font-stretch-[88%]",
      "2": "font-display text-2xl font-semibold tracking-heading font-stretch-[88%]",
      "3": "font-display text-xl font-semibold font-stretch-[88%]",
      "4": "font-sans text-lg leading-[1.3] font-semibold",
    },
  },
  defaultVariants: { level: "2" },
} as const satisfies Recipe;

export const text = {
  name: "text",
  base: "",
  variants: {
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-lg",
    },
    tone: {
      ink: "",
      grey: "text-grey",
      accent: "text-pen",
      danger: "text-danger",
      success: "text-success",
    },
  },
  defaultVariants: { size: "default", tone: "ink" },
} as const satisfies Recipe;

/** Emphasis is hatching under the words, never italics or coloured text. */
export const mark = {
  name: "mark",
  base: "bg-transparent text-inherit hatch-mark",
} as const satisfies Recipe;

export const code = {
  name: "code",
  base: "border border-rule bg-ink/4 px-[0.35em] py-[0.05em] font-mono text-[0.9em]",
} as const satisfies Recipe;

export const codeBlock = {
  name: "code-block",
  base: "overflow-x-auto border-[1.5px] border-ink bg-paper p-4 font-mono text-sm leading-[1.6]",
} as const satisfies Recipe;

export const kbd = {
  name: "kbd",
  base: "inline-block min-w-[1.6em] border border-ink px-[0.4em] text-center font-mono text-xs leading-[1.6] shadow-[0_2px_0_var(--dt-color-ink)]",
} as const satisfies Recipe;

/** Rendered long-form text (markdown output). */
export const prose = {
  name: "prose",
  base: "max-w-[72ch] text-lg leading-[1.6] [&_:is(h1,h2,h3)]:mt-[1.6em] [&_:is(h1,h2,h3)]:mb-[0.4em] [&_:is(h1,h2,h3)]:font-display [&_:is(h1,h2,h3)]:leading-[1.12] [&_:is(h1,h2,h3)]:font-semibold [&_:is(h1,h2,h3)]:tracking-heading [&_:is(h1,h2,h3)]:font-stretch-[88%] [&_:is(p,ul,ol,blockquote,pre,table)]:mt-[0.9em] [&_:is(ul,ol)]:pl-[1.4em] [&_a]:underline [&_a]:decoration-pen [&_a]:underline-offset-[0.18em] [&_a:hover]:text-pen [&_blockquote]:border-l-[3px] [&_blockquote]:border-pen [&_blockquote]:py-1 [&_blockquote]:pl-4 [&_blockquote]:text-grey [&_code]:border [&_code]:border-rule [&_code]:px-[0.35em] [&_code]:font-mono [&_code]:text-[0.86em] [&_h1]:text-2xl [&_h2]:text-[24px] [&_h3]:text-xl [&_hr]:my-[2em] [&_hr]:h-px [&_hr]:border-0 [&_hr]:bg-ink [&_li+li]:mt-[0.3em] [&_li::marker]:font-mono [&_li::marker]:text-pen [&_ol]:list-decimal [&_pre]:overflow-x-auto [&_pre]:border-[1.5px] [&_pre]:border-ink [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre_code]:border-0 [&_pre_code]:p-0 [&_strong]:font-semibold [&_ul]:list-disc [&>:first-child]:mt-0",
} as const satisfies Recipe;

/* ─── Drafting: the sheet and its marks ──────────────────────────────────── */

/** The desk under the sheet: the page background of a Dovetail screen. */
export const desk = {
  name: "desk",
  base: "min-h-screen overflow-x-clip bg-desk p-[clamp(10px,2vw,28px)] text-ink",
} as const satisfies Recipe;

/** The drawing sheet: a 2px ink frame on paper. One per screen. */
export const drawingSheet = {
  name: "drawing-sheet",
  base: "relative mx-auto max-w-[1384px] border-2 border-ink bg-paper text-ink",
  variants: {
    /** Graph paper ruling behind the content. */
    ruled: { true: "grid-paper" },
    /** An inner frame, as on a zoned drawing. Disappears below 901px. */
    framed: {
      true: "sheet:p-[26px] sheet:[&>:not([data-side])]:border-[1.5px] sheet:[&>:not([data-side])]:border-ink",
    },
  },
  slots: {
    /** Zone markers along one edge of a framed sheet: set `data-side` to top, bottom, left or right. */
    zones:
      "pointer-events-none absolute hidden justify-around font-mono text-[9px] leading-none text-grey sheet:flex data-[side=bottom]:inset-x-[26px] data-[side=bottom]:bottom-2 data-[side=left]:inset-y-[26px] data-[side=left]:left-[9px] data-[side=left]:flex-col data-[side=right]:inset-y-[26px] data-[side=right]:right-[9px] data-[side=right]:flex-col data-[side=top]:inset-x-[26px] data-[side=top]:top-2",
  },
} as const satisfies Recipe;

/** Sticky strip at the top of the sheet. Each child is a cell separated by a hairline. */
export const headerStrip = {
  name: "header-strip",
  base: "sticky top-0 z-20 grid auto-cols-fr grid-flow-col border-b-[1.5px] border-ink bg-paper shadow-lift max-sheet:grid-flow-row [&>*]:flex [&>*]:min-w-0 [&>*]:items-center [&>*]:gap-3 [&>*]:px-5 [&>*]:py-3 [&>*+*]:border-l [&>*+*]:border-ink max-sheet:[&>*+*]:border-t max-sheet:[&>*+*]:border-l-0",
  slots: {
    /** A cell whose content is pushed to the end (actions). */
    end: "justify-end",
    nav: "flex items-center gap-6 font-mono text-sm uppercase",
  },
} as const satisfies Recipe;

/**
 * The title-block grid. The gap shows the ink behind, so cells are separated
 * by exactly one hairline whatever their span. Columns: `--cells` (default 4),
 * `--cells-sm` below 901px (default 2). A cell spans `--span` columns.
 */
export const cells = {
  name: "cells",
  base: "grid grid-cols-[repeat(var(--cells-sm,2),minmax(0,1fr))] gap-px border-[1.5px] border-ink bg-ink sheet:grid-cols-[repeat(var(--cells,4),minmax(0,1fr))]",
  variants: {
    flush: { true: "border-0" },
  },
} as const satisfies Recipe;

export const cell = {
  name: "cell",
  base: "min-w-0 bg-paper px-4 py-3 [grid-column:span_min(var(--span-sm,var(--span,1)),var(--cells-sm,2))] sheet:[grid-column:span_var(--span,1)]",
  variants: {
    interactive: { true: "transition-colors duration-250 hover:bg-accent" },
    accent: { true: "text-pen" },
    flush: { true: "p-0" },
  },
} as const satisfies Recipe;

/** A value under its caption. */
export const value = {
  name: "value",
  base: "block min-w-0 [overflow-wrap:anywhere]",
  variants: {
    variant: {
      default: "",
      mono: "font-mono",
      /** A big figure: Archivo condensed. */
      lg: "mt-2 font-display text-[clamp(24px,2.9vw,40px)] leading-none font-medium tracking-heading font-stretch-[88%]",
    },
  },
  defaultVariants: { variant: "default" },
} as const satisfies Recipe;

export const status = {
  name: "status",
  base: "inline-flex items-center gap-2 font-semibold text-[color:var(--tone)] before:size-2 before:shrink-0 before:rounded-full before:bg-current",
  variants: {
    tone: {
      accent: "[--tone:var(--dt-color-pen)]",
      ink: "[--tone:var(--dt-color-ink)]",
      grey: "[--tone:var(--dt-color-grey)]",
      success: "[--tone:var(--dt-color-success)]",
      danger: "[--tone:var(--dt-color-danger)]",
    },
    pulse: { true: "before:animate-pulse-dot" },
  },
  defaultVariants: { tone: "accent" },
} as const satisfies Recipe;

/** Rubber-stamped approval. */
export const stamp = {
  name: "stamp",
  base: "inline-block -rotate-[14deg] border-[3px] border-[color:var(--tone)] bg-paper px-3.5 py-2 font-mono text-[18px] leading-normal font-medium tracking-stamp text-[color:var(--tone)] uppercase",
  variants: {
    tone: {
      accent: "[--tone:var(--dt-color-pen)]",
      ink: "[--tone:var(--dt-color-ink)]",
      success: "[--tone:var(--dt-color-success)]",
      danger: "[--tone:var(--dt-color-danger)]",
    },
    animate: { true: "animate-stamp" },
  },
  defaultVariants: { tone: "accent" },
} as const satisfies Recipe;

/** Item number: a balloon on the drawing. */
export const itemNumber = {
  name: "item-number",
  base: "inline-flex size-7 shrink-0 items-center justify-center rounded-full border-[1.5px] font-mono text-sm transition-all duration-250",
  variants: {
    variant: {
      plain: "border-transparent text-pen",
      outlined: "border-pen text-pen",
      active: "scale-110 -rotate-12 border-pen bg-pen text-paper",
    },
  },
  defaultVariants: { variant: "outlined" },
} as const satisfies Recipe;

/** Dimension line: extension ticks at both ends, the label in the gap. */
export const dimension = {
  name: "dimension",
  base: `flex h-6 items-center gap-3 border-x border-current ${CAPTION} whitespace-nowrap text-ink before:h-px before:flex-1 before:bg-current after:h-px after:flex-1 after:bg-current`,
} as const satisfies Recipe;

/** Section line "A — A": letters at both ends of a cutting-plane line. */
export const sectionLine = {
  name: "section-line",
  base: "flex items-center gap-2.5 font-mono font-medium text-pen [&>hr]:flex-1",
} as const satisfies Recipe;

export const emptyState = {
  name: "empty-state",
  base: "grid justify-items-start gap-3 border border-dashed border-grey px-6 py-12",
} as const satisfies Recipe;

/* ─── Data ───────────────────────────────────────────────────────────────── */

export const card = {
  name: "card",
  base: "flex min-w-0 flex-col border-[1.5px] border-ink bg-card text-card-foreground",
  variants: {
    /** Lifts on hover with a hard ink shadow. For cards that are links or buttons. */
    interactive: {
      true: "cursor-pointer transition-[translate,box-shadow] duration-250 ease-snap hover:-translate-0.5 hover:shadow-press",
    },
  },
  slots: {
    header:
      "grid auto-rows-min grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-1 border-b border-ink px-5 py-4",
    title: "col-start-1 font-display text-xl font-semibold font-stretch-[88%]",
    description: "col-start-1 text-sm text-grey",
    action:
      "col-start-2 row-span-2 row-start-1 flex gap-2 self-start justify-self-end",
    content: "flex-1 p-5",
    footer: "flex items-center justify-end gap-3 border-t border-ink px-5 py-3",
  },
} as const satisfies Recipe;

export const badge = {
  name: "badge",
  base: `inline-flex w-fit shrink-0 items-center gap-1.5 border px-1.5 py-0.5 ${CAPTION} leading-normal whitespace-nowrap [&_svg]:size-3`,
  variants: {
    variant: {
      default: "border-ink bg-ink text-paper",
      outline: "border-ink text-ink",
      secondary: "border-rule bg-secondary text-ink",
      accent: "border-pen text-pen",
      success: "border-success text-success",
      destructive: "border-danger text-danger",
      muted: "border-grey text-grey",
    },
  },
  defaultVariants: { variant: "default" },
} as const satisfies Recipe;

/**
 * Styles its own th/td, so plain <table class="table"> markup is enough.
 * `:where(&)` keeps those rules at the lowest specificity: a class on a cell always wins.
 */
export const table = {
  name: "table",
  base: "w-full border-collapse text-lg [:where(&)_:is(th,td):first-child]:pl-4 [:where(&)_:is(th,td):last-child]:pr-5 [:where(&)_caption]:caption-bottom [:where(&)_caption]:pt-4 [:where(&)_caption]:text-left [:where(&)_caption]:font-mono [:where(&)_caption]:text-xs [:where(&)_caption]:text-grey [:where(&)_tbody_tr]:transition-colors [:where(&)_tbody_tr]:duration-250 [:where(&)_tbody_tr+tr]:border-t [:where(&)_tbody_tr+tr]:border-rule [:where(&)_tbody_tr:hover]:bg-pen/6 [:where(&)_td]:px-3 [:where(&)_td]:py-4 [:where(&)_td]:align-top [:where(&)_td]:leading-normal [:where(&)_th]:px-3 [:where(&)_th]:py-3 [:where(&)_th]:text-left [:where(&)_th]:font-mono [:where(&)_th]:text-label [:where(&)_th]:font-normal [:where(&)_th]:tracking-label [:where(&)_th]:text-grey [:where(&)_th]:uppercase [:where(&)_thead_tr]:border-b [:where(&)_thead_tr]:border-ink",
  variants: {
    compact: { true: "text-base [:where(&)_td]:py-2" },
  },
  slots: {
    container: "relative w-full overflow-x-auto bg-paper",
    /** A numeric cell. */
    num: "text-right font-mono",
  },
} as const satisfies Recipe;

export const avatar = {
  name: "avatar",
  base: "relative inline-grid size-8 shrink-0 place-items-center overflow-hidden border-[1.5px] border-ink bg-paper font-mono text-label font-medium text-ink uppercase",
  variants: {
    shape: {
      square: "",
      round: "rounded-full",
    },
  },
  defaultVariants: { shape: "square" },
  slots: {
    image: "size-full object-cover contrast-105 grayscale",
    fallback: "grid size-full place-items-center",
  },
} as const satisfies Recipe;

/** Drawn as a dimension line, filled in orange. */
export const progress = {
  name: "progress",
  base: "relative h-[9px] w-full border-x border-ink before:absolute before:inset-x-0 before:top-1 before:h-px before:bg-ink",
  slots: {
    indicator:
      "absolute top-[3px] left-0 h-[3px] bg-pen transition-[width] duration-300 ease-draft data-[state=indeterminate]:animate-indeterminate",
  },
} as const satisfies Recipe;

/** Pencil hatching that slides while content loads. */
export const skeleton = {
  name: "skeleton",
  base: "block h-[1em] w-full animate-hatch hatch-fill",
} as const satisfies Recipe;

export const alert = {
  name: "alert",
  base: "grid gap-x-3 gap-y-1 border-l-[3px] border-[color:var(--tone)] bg-[color-mix(in_srgb,var(--tone)_6%,var(--dt-color-paper))] px-4 py-3 text-ink has-[>svg]:grid-cols-[auto_minmax(0,1fr)] [&>svg]:row-span-2 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-[color:var(--tone)] [&>svg~*]:col-start-2",
  variants: {
    variant: {
      default: "[--tone:var(--dt-color-pen)]",
      ink: "[--tone:var(--dt-color-ink)]",
      success: "[--tone:var(--dt-color-success)]",
      destructive: "[--tone:var(--dt-color-danger)]",
    },
  },
  defaultVariants: { variant: "default" },
  slots: {
    title: `${CAPTION} text-[color:var(--tone)]`,
    description: "text-sm",
  },
} as const satisfies Recipe;

/* ─── Forms ──────────────────────────────────────────────────────────────── */

/** A form control's label. Ink, where a caption is grey. */
export const label = {
  name: "label",
  base: `block ${CAPTION} leading-[1.3] text-ink`,
} as const satisfies Recipe;

export const input = {
  name: "input",
  base: `${FIELD} h-11 file:mr-3 file:h-full file:border-0 file:bg-transparent file:font-mono file:text-xs file:text-ink file:uppercase`,
} as const satisfies Recipe;

export const textarea = {
  name: "textarea",
  base: `${FIELD} min-h-24 resize-y py-2.5 leading-normal`,
} as const satisfies Recipe;

/** A native <select>. */
export const nativeSelect = {
  name: "select",
  base: `${FIELD} h-11 cursor-pointer pr-9 select-arrow`,
} as const satisfies Recipe;

/** Label + control + hint or error, stacked. */
export const field = {
  name: "field",
  base: "grid min-w-0 gap-1.5",
  slots: {
    hint: "font-mono text-xs text-grey",
    error: "font-mono text-xs text-danger",
  },
} as const satisfies Recipe;

export const checkbox = {
  name: "checkbox",
  base: "inline-grid size-4.5 shrink-0 cursor-pointer place-content-center border-[1.5px] border-ink bg-paper text-paper transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-pen data-[state=checked]:bg-pen",
  html: "appearance-none after:h-[5px] after:w-[9px] after:-translate-y-px after:scale-0 after:-rotate-45 after:border-b-2 after:border-l-2 after:border-paper after:transition-[scale] after:duration-150 after:ease-snap checked:border-pen checked:bg-pen checked:after:scale-100",
} as const satisfies Recipe;

export const radio = {
  name: "radio",
  base: "inline-grid size-4.5 shrink-0 cursor-pointer place-content-center rounded-full border-[1.5px] border-ink bg-paper transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-pen data-[state=checked]:bg-pen",
  slots: {
    indicator: "block size-2 rounded-full bg-paper",
  },
  html: "appearance-none after:size-2 after:scale-0 after:rounded-full after:bg-paper after:transition-[scale] after:duration-150 after:ease-snap checked:border-pen checked:bg-pen checked:after:scale-100",
} as const satisfies Recipe;

export const switchControl = {
  name: "switch",
  base: "relative inline-flex h-[22px] w-[38px] shrink-0 cursor-pointer items-center border-[1.5px] border-ink bg-paper transition-colors duration-250 disabled:cursor-not-allowed disabled:opacity-40 data-[state=checked]:border-pen data-[state=checked]:bg-pen",
  slots: {
    thumb:
      "pointer-events-none block size-[15px] translate-x-0.5 bg-ink transition-[translate,background-color] duration-250 ease-snap data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-paper",
  },
  html: "appearance-none after:absolute after:top-0.5 after:left-0.5 after:size-[15px] after:bg-ink after:transition-[translate,background-color] after:duration-250 after:ease-snap checked:border-pen checked:bg-pen checked:after:translate-x-4 checked:after:bg-paper",
} as const satisfies Recipe;

/** A control next to its text: <label class="choice"><input class="checkbox"> Text</label>. */
export const choice = {
  name: "choice",
  base: "inline-flex cursor-pointer items-start gap-2.5 leading-[1.4] [&>:first-child]:mt-px",
} as const satisfies Recipe;

/** The Radix select: trigger + floating list. */
export const select = {
  name: "select-menu",
  base: `${FIELD} flex h-11 cursor-pointer items-center justify-between gap-2 text-left data-placeholder:text-grey [&>span]:truncate [&_svg]:size-4 [&_svg]:shrink-0`,
  slots: {
    content: `${FLOATING} max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-y-auto py-1`,
    item: `${MENU_ITEM} pr-10`,
    indicator: "absolute right-4 inline-grid place-items-center text-pen",
    label: `px-4 pt-2 pb-1 ${CAPTION} text-grey`,
    separator: "my-1 h-px bg-rule",
  },
} as const satisfies Recipe;

/* ─── Navigation and disclosure ──────────────────────────────────────────── */

export const tabs = {
  name: "tabs",
  base: "flex flex-col",
  slots: {
    list: "flex overflow-x-auto border-b-[1.5px] border-ink",
    trigger:
      "relative cursor-pointer px-5 py-3 font-mono text-xs tracking-button whitespace-nowrap text-grey uppercase transition-colors duration-150 not-first:border-l not-first:border-ink after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-pen after:opacity-0 hover:bg-accent hover:text-ink focus-visible:-outline-offset-2 disabled:pointer-events-none disabled:opacity-40 aria-selected:text-pen aria-selected:after:opacity-100 data-[state=active]:text-pen data-[state=active]:after:opacity-100",
    content: "pt-5 focus-visible:outline-none",
  },
} as const satisfies Recipe;

export const accordion = {
  name: "accordion",
  base: "border-t border-ink",
  slots: {
    item: "border-b border-ink",
    trigger:
      "flex w-full flex-1 cursor-pointer list-none items-center gap-3 py-3 text-left font-semibold transition-colors duration-150 hover:text-pen [&::-webkit-details-marker]:hidden",
    /** The +/− box. Flips when an ancestor is open (Radix `data-state` or a native <details open>). */
    sign: "inline-grid size-4.5 shrink-0 place-items-center border border-current font-mono text-[13px] leading-none before:content-['+'] in-data-[state=open]:before:content-['−'] in-open:before:content-['−']",
    content:
      "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    body: "pb-4 pl-[30px]",
  },
} as const satisfies Recipe;

export const breadcrumb = {
  name: "breadcrumb",
  base: `flex flex-wrap items-center gap-2 ${CAPTION} text-grey`,
  slots: {
    item: "inline-flex items-center gap-2",
    link: "transition-colors duration-150 hover:text-pen",
    page: "text-ink",
    separator: "text-rule select-none",
  },
} as const satisfies Recipe;

export const separator = {
  name: "separator",
  base: "h-[1.5px] w-full shrink-0 border-0 data-[orientation=vertical]:h-auto data-[orientation=vertical]:min-h-[1em] data-[orientation=vertical]:w-[1.5px] data-[orientation=vertical]:self-stretch",
  variants: {
    variant: {
      /** Structural ink rule. */
      ink: "bg-ink",
      /** Faint rule between rows. */
      rule: "bg-rule",
      dashed: "h-0 border-t border-dashed border-grey bg-transparent",
      /** Cutting-plane line in the orange pen. */
      cut: "bg-transparent cut-line",
    },
  },
  defaultVariants: { variant: "ink" },
} as const satisfies Recipe;

/* ─── Overlays ───────────────────────────────────────────────────────────── */

export const dialog = {
  name: "dialog",
  base: "fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100vh-4rem)] -translate-1/2 flex-col overflow-auto border-2 border-ink bg-paper text-ink open:animate-dialog-in data-[state=open]:animate-dialog-in",
  variants: {
    size: {
      default: "w-[min(560px,calc(100vw-2rem))]",
      lg: "w-[min(880px,calc(100vw-2rem))]",
    },
    /** A destructive confirmation. */
    danger: { true: "border-danger" },
  },
  defaultVariants: { size: "default" },
  slots: {
    overlay:
      "fixed inset-0 z-50 bg-backdrop backdrop-blur-[2px] data-[state=open]:animate-fade-in",
    header: OVERLAY_HEADER,
    title: OVERLAY_TITLE,
    description: OVERLAY_DESCRIPTION,
    body: "p-5",
    footer: OVERLAY_FOOTER,
    close: OVERLAY_CLOSE,
  },
  html: "right-auto bottom-auto m-0 max-w-none p-0 backdrop:bg-backdrop backdrop:backdrop-blur-[2px] [&:not([open])]:hidden",
} as const satisfies Recipe;

/** A panel sliding from an edge (shadcn's Sheet). `.drawer` in HTML, to keep "sheet" for the drawing. */
export const sheet = {
  name: "drawer",
  base: "fixed z-50 flex flex-col bg-paper text-ink",
  variants: {
    side: {
      right:
        "inset-y-0 right-0 left-auto h-full w-[min(440px,100vw)] border-l-2 border-ink open:animate-slide-in-right data-[state=open]:animate-slide-in-right",
      left: "inset-y-0 right-auto left-0 h-full w-[min(440px,100vw)] border-r-2 border-ink open:animate-slide-in-left data-[state=open]:animate-slide-in-left",
      bottom:
        "inset-x-0 top-auto bottom-0 h-[min(60vh,100vh)] w-full border-t-2 border-ink open:animate-slide-in-up data-[state=open]:animate-slide-in-up",
      top: "inset-x-0 top-0 bottom-auto h-[min(60vh,100vh)] w-full border-b-2 border-ink open:animate-slide-in-down data-[state=open]:animate-slide-in-down",
    },
  },
  defaultVariants: { side: "right" },
  slots: {
    overlay: "fixed inset-0 z-50 bg-backdrop data-[state=open]:animate-fade-in",
    header: OVERLAY_HEADER,
    title: OVERLAY_TITLE,
    description: OVERLAY_DESCRIPTION,
    body: "flex-1 overflow-auto p-5",
    footer: OVERLAY_FOOTER,
    close: OVERLAY_CLOSE,
  },
  html: "m-0 max-h-none max-w-none p-0 backdrop:bg-backdrop [&:not([open])]:hidden",
} as const satisfies Recipe;

export const menu = {
  name: "menu",
  base: `${FLOATING} min-w-[200px] py-1`,
  slots: {
    item: MENU_ITEM,
    itemDestructive:
      "text-danger hover:bg-danger hover:text-paper focus-visible:bg-danger focus-visible:text-paper data-highlighted:bg-danger data-highlighted:text-paper",
    /** An item with room on the left for a check or a dot. */
    itemInset: "pl-10",
    indicator:
      "absolute left-4 inline-grid w-4 place-items-center font-mono text-pen",
    label: `px-4 pt-2 pb-1 ${CAPTION} text-grey`,
    separator: "my-1 h-px bg-rule",
    shortcut: "ml-auto pl-5 font-mono text-label tracking-label text-grey",
  },
} as const satisfies Recipe;

export const popover = {
  name: "popover",
  base: `${FLOATING} w-72 max-w-[min(360px,calc(100vw-1.5rem))] p-4`,
} as const satisfies Recipe;

export const tooltip = {
  name: "tooltip",
  base: `z-60 max-w-[280px] animate-pop-in bg-ink px-2 py-1 ${CAPTION} leading-normal text-paper`,
} as const satisfies Recipe;

/* ─── App shell ──────────────────────────────────────────────────────────── */

/** Top of a page: trail or caption, title, one-line description, actions. */
export const pageHeader = {
  name: "page-header",
  base: "grid grid-cols-[minmax(0,1fr)] items-end gap-x-6 gap-y-3 border-b-[1.5px] border-ink px-[clamp(20px,3vw,44px)] py-[clamp(24px,3vw,40px)] sheet:grid-cols-[minmax(0,1fr)_auto]",
  slots: {
    top: "col-span-full flex items-center gap-3",
    text: "grid min-w-0 gap-2",
    actions: "flex flex-wrap gap-3",
  },
} as const satisfies Recipe;

export const pagination = {
  name: "pagination",
  base: "inline-flex items-stretch border-[1.5px] border-ink font-mono text-xs [&>*+*]:border-l [&>*+*]:border-ink",
  variants: {
    size: {
      default: "",
      sm: "text-label [&>button]:h-[30px] [&>button]:min-w-[30px]",
    },
  },
  defaultVariants: { size: "default" },
  slots: {
    item: "inline-grid h-10 min-w-10 cursor-pointer place-items-center px-2 transition-colors duration-150 hover:bg-pen/8 focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:text-rule disabled:hover:bg-transparent aria-[current=page]:bg-ink aria-[current=page]:text-paper",
    gap: "inline-grid min-w-[30px] place-items-center text-grey",
  },
} as const satisfies Recipe;

/** App navigation column. `data-collapsed="true"` folds it to a 60px rail. */
export const sidebar = {
  name: "sidebar",
  base: "flex min-h-full w-[var(--sidebar-width,248px)] shrink-0 flex-col border-r-[1.5px] border-ink bg-sidebar text-sidebar-foreground transition-[width] duration-250 ease-draft data-[collapsed=true]:w-[60px]",
  slots: {
    header: "border-b border-ink p-4",
    body: "flex-1 overflow-y-auto py-3",
    footer: "border-t border-ink px-4 py-3",
    section: "not-first:mt-4",
    label: `px-4 py-2 ${CAPTION} text-grey in-data-[collapsed=true]:invisible in-data-[collapsed=true]:h-2 in-data-[collapsed=true]:p-0`,
    item: "relative flex min-h-9 w-full cursor-pointer items-center gap-3 px-4 py-2 text-left font-mono text-sm tracking-[0.02em] text-ink uppercase transition-colors duration-150 before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:bg-pen before:opacity-0 hover:bg-pen/6 hover:text-pen focus-visible:-outline-offset-2 in-data-[collapsed=true]:justify-center in-data-[collapsed=true]:px-0 aria-[current]:font-medium aria-[current]:text-pen aria-[current]:before:opacity-100",
    itemIcon: "inline-grid size-5 shrink-0 place-items-center [&_svg]:size-4",
    itemText: "min-w-0 flex-1 truncate in-data-[collapsed=true]:hidden",
    itemTrailing: "ml-auto shrink-0 in-data-[collapsed=true]:hidden",
  },
} as const satisfies Recipe;

/** A strip across the top of the app or of a sheet. */
export const banner = {
  name: "banner",
  base: "flex min-h-11 items-center gap-3 bg-[var(--banner-bg)] px-5 py-2 text-sm text-[color:var(--banner-fg)]",
  variants: {
    variant: {
      ink: "[--banner-bg:var(--dt-color-ink)] [--banner-fg:var(--dt-color-paper)]",
      accent:
        "[--banner-bg:var(--dt-color-pen)] [--banner-fg:var(--dt-color-paper)]",
      success:
        "[--banner-bg:var(--dt-color-success)] [--banner-fg:var(--dt-color-paper)]",
      danger:
        "[--banner-bg:var(--dt-color-danger)] [--banner-fg:var(--dt-color-paper)]",
      quiet:
        "border-b border-ink [--banner-bg:color-mix(in_srgb,var(--dt-color-pen)_8%,var(--dt-color-paper))] [--banner-fg:var(--dt-color-ink)]",
    },
  },
  defaultVariants: { variant: "ink" },
  slots: {
    label: `shrink-0 ${CAPTION} opacity-85`,
    text: "min-w-0 flex-1",
    close: "cursor-pointer px-1.5 py-0.5 font-mono text-lg leading-none",
  },
} as const satisfies Recipe;

/** Two panes with a draggable ink rule between them. `data-direction="vertical"` stacks them. */
export const split = {
  name: "split",
  base: "flex h-full min-h-0 min-w-0 data-[direction=vertical]:flex-col",
  slots: {
    pane: "min-h-0 min-w-0 overflow-auto last:flex-1",
    handle:
      "relative w-[1.5px] shrink-0 cursor-col-resize touch-none bg-ink after:absolute after:inset-y-0 after:-inset-x-[5px] hover:bg-pen focus-visible:bg-pen focus-visible:outline-none data-dragging:bg-pen in-data-[direction=vertical]:h-[1.5px] in-data-[direction=vertical]:w-auto in-data-[direction=vertical]:cursor-row-resize in-data-[direction=vertical]:after:inset-x-0 in-data-[direction=vertical]:after:-inset-y-[5px]",
  },
} as const satisfies Recipe;

/** Monogram + mono name block. The pin slides out on hover. */
export const logo = {
  name: "logo",
  base: "inline-flex items-center gap-3 text-inherit no-underline [&_[data-pin]]:transition-[translate] [&_[data-pin]]:duration-300 [&_[data-pin]]:ease-snap hover:[&_[data-pin]]:translate-x-[5px] [&_svg]:shrink-0 [&_svg]:overflow-visible",
  slots: {
    text: "font-mono text-sm leading-[1.35] font-medium uppercase",
    sub: "block font-normal text-grey normal-case",
  },
} as const satisfies Recipe;

/* ─── Records ────────────────────────────────────────────────────────────── */

/** Steps in time. Each item takes `data-status`: done (default), success, danger, active or pending. */
export const timeline = {
  name: "timeline",
  base: "m-0 list-none p-0",
  slots: {
    item: "relative grid grid-cols-[20px_minmax(0,1fr)_auto] gap-x-3 pb-5 [--tone:var(--dt-color-ink)] before:absolute before:top-[18px] before:bottom-0 before:left-[9px] before:w-px before:bg-ink last:pb-0 last:before:hidden data-[status=active]:[--tone:var(--dt-color-pen)] data-[status=danger]:[--tone:var(--dt-color-danger)] data-[status=pending]:[--tone:var(--dt-color-grey)] data-[status=success]:[--tone:var(--dt-color-success)]",
    marker:
      "relative z-1 mt-1 ml-1 size-3 border-[1.5px] border-[color:var(--tone)] bg-paper in-data-[status=active]:animate-pulse-dot in-data-[status=active]:bg-[var(--tone)] in-data-[status=danger]:bg-[var(--tone)] in-data-[status=pending]:border-dashed in-data-[status=success]:bg-[var(--tone)]",
    title:
      "font-mono text-sm leading-5 font-medium in-data-[status=pending]:text-grey",
    time: "font-mono text-label leading-5 text-grey",
    body: "col-[2/-1] mt-0.5 text-sm text-grey",
  },
} as const satisfies Recipe;

/** Revisions: a compact history, newest at the bottom. A row takes `data-current="true"`. */
export const revisions = {
  name: "revisions",
  base: "flex flex-col bg-paper text-[14px] leading-[1.3]",
  slots: {
    title: "border-b border-ink px-4 py-3",
    head: `grid grid-cols-[40px_minmax(0,1fr)_auto] border-b border-ink ${CAPTION} text-grey [&>*]:px-2 [&>*]:py-2 [&>:first-child]:pl-4 [&>:last-child]:pr-4`,
    row: "grid grid-cols-[40px_minmax(0,1fr)_auto] transition-colors duration-250 not-first:border-t not-first:border-rule hover:bg-pen/8 data-[current=true]:font-semibold [&>*]:px-2 [&>*]:py-[7px] [&>:first-child]:pl-4 [&>:first-child]:font-mono hover:[&>:first-child]:text-pen data-[current=true]:[&>:first-child]:text-pen [&>:last-child]:pr-4 [&>:last-child]:font-mono [&>:last-child]:font-normal",
    detail:
      "mt-0.5 block font-mono text-label leading-[1.35] font-normal text-grey",
    footer:
      "mt-auto border-t border-ink p-4 font-mono text-sm leading-[1.6] text-grey",
  },
} as const satisfies Recipe;

/** Parts list: add `parts` next to `table`. First column is the item balloon. */
export const parts = {
  name: "parts",
  base: "[:where(&)_td]:align-middle [:where(&)_td:first-child]:w-14",
  slots: {
    name: "font-display text-xl leading-6 font-semibold font-stretch-[88%]",
    meta: "mt-1.5 block font-mono text-sm text-grey",
  },
} as const satisfies Recipe;

/** General notes: numbered, mono, pencil grey. */
export const notes = {
  name: "notes",
  base: "m-0 list-decimal pl-[22px] font-mono text-sm leading-[1.8]",
  variants: {
    tone: {
      grey: "text-grey",
      ink: "text-ink",
    },
  },
  defaultVariants: { tone: "grey" },
} as const satisfies Recipe;

/** A note pinned at the bottom of the screen: the toast with a body. */
export const note = {
  name: "note",
  base: "pointer-events-auto grid animate-pop-in grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 border-[1.5px] border-l-[3px] border-ink border-l-[color:var(--tone)] bg-paper px-4 py-3 text-ink shadow-float",
  variants: {
    tone: {
      ink: "[--tone:var(--dt-color-ink)]",
      accent: "[--tone:var(--dt-color-pen)]",
      success: "[--tone:var(--dt-color-success)]",
      danger: "[--tone:var(--dt-color-danger)]",
    },
  },
  defaultVariants: { tone: "ink" },
  slots: {
    /** Fixed stack the notes are appended to. */
    layer:
      "pointer-events-none fixed right-6 bottom-6 z-70 flex w-[min(380px,calc(100vw-2rem))] flex-col gap-3",
    title: "col-start-1 font-semibold",
    description: "col-start-1 text-sm text-grey",
    action: "col-start-1 mt-2",
    close:
      "col-start-2 row-start-1 cursor-pointer self-start px-1.5 py-0.5 font-mono text-lg leading-none hover:text-pen",
  },
} as const satisfies Recipe;

/** Fixed layer where rubber stamps land. */
export const stampLayer = {
  name: "stamp-layer",
  base: "pointer-events-none fixed top-8 right-8 z-70 flex flex-col items-end gap-6",
} as const satisfies Recipe;

export const spinner = {
  name: "spinner",
  base: "inline-block size-4 shrink-0 animate-spin rounded-full border-[1.5px] border-current border-r-transparent",
} as const satisfies Recipe;

/* ─── Agent kit: interfaces between people and AI agents ─────────────────── */

/** Vertical stack of transcript entries. */
export const transcript = {
  name: "transcript",
  base: "flex flex-col gap-5",
} as const satisfies Recipe;

/** One turn. `data-role`: user (ink block on the right), assistant (prose with a hairline), system (centred note). */
export const message = {
  name: "message",
  base: "grid min-w-0 gap-2 data-[role=system]:justify-items-center data-[role=user]:justify-items-end",
  slots: {
    meta: "flex items-center gap-2",
    body: "min-w-0 [overflow-wrap:anywhere] in-data-[role=assistant]:border-l in-data-[role=assistant]:border-ink in-data-[role=assistant]:pl-4 in-data-[role=system]:text-center in-data-[role=system]:font-mono in-data-[role=system]:text-xs in-data-[role=system]:text-grey in-data-[role=user]:max-w-[min(640px,92%)] in-data-[role=user]:bg-ink in-data-[role=user]:px-4 in-data-[role=user]:py-3 in-data-[role=user]:whitespace-pre-wrap in-data-[role=user]:text-paper",
    /** Blinking orange caret while text arrives. */
    caret:
      "ml-0.5 inline-block h-[1.05em] w-[0.55em] animate-pulse-dot bg-pen align-text-bottom",
  },
} as const satisfies Recipe;

/** One tool call as a row. `data-status`: done (default), running, pending, error. Use <details> to make it expandable. */
export const toolCall = {
  name: "tool",
  base: "border border-ink bg-paper text-sm [--tone:var(--dt-color-success)] data-[status=error]:[--tone:var(--dt-color-danger)] data-[status=pending]:[--tone:var(--dt-color-grey)] data-[status=running]:[--tone:var(--dt-color-pen)]",
  slots: {
    row: "grid cursor-default list-none grid-cols-[18px_auto_minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 focus-visible:-outline-offset-2 in-[details]:cursor-pointer in-[details]:hover:bg-pen/6 [&::-webkit-details-marker]:hidden",
    icon: "inline-grid size-4.5 place-items-center font-mono text-xs text-[color:var(--tone)]",
    name: "font-mono font-medium tracking-[0.04em] uppercase",
    target: "truncate font-mono text-grey",
    meta: "font-mono text-label text-grey",
    output:
      "m-0 max-h-80 overflow-auto border-t border-ink bg-ink/3 p-3 font-mono text-xs leading-[1.6] whitespace-pre-wrap text-ink",
  },
} as const satisfies Recipe;

/** Tool calls stacked as one block, joined by hairlines. */
export const toolGroup = {
  name: "tool-group",
  base: "grid [&>*+*]:border-t-0",
} as const satisfies Recipe;

/** The model's reasoning, folded by default, in pencil grey. A <details>. */
export const thinking = {
  name: "thinking",
  base: "text-grey",
  slots: {
    summary: `inline-flex cursor-pointer list-none items-center gap-2 ${CAPTION} before:text-[13px] before:content-['+'] hover:text-pen in-open:before:content-['−'] [&::-webkit-details-marker]:hidden`,
    body: "mt-2 border-l border-dashed border-grey pl-4 text-sm whitespace-pre-wrap",
  },
} as const satisfies Recipe;

/** Spinner + what is happening, while the agent works. */
export const working = {
  name: "working",
  base: "inline-flex items-center gap-3 text-sm [&>:first-child]:text-pen",
  slots: {
    title: "font-mono text-xs tracking-label text-pen uppercase",
    detail: "text-grey",
  },
} as const satisfies Recipe;

/** The human-in-the-loop moment: an orange-framed request. `data-resolved` once answered. */
export const permission = {
  name: "permission",
  base: "border-[1.5px] border-pen bg-[color-mix(in_srgb,var(--dt-color-pen)_5%,var(--dt-color-paper))] data-resolved:border-rule data-resolved:bg-paper",
  slots: {
    head: "flex items-center justify-between gap-3 border-b border-pen px-4 py-2 in-data-resolved:border-rule",
    body: "grid gap-3 p-4 [&>*]:min-w-0",
    actions: "flex flex-wrap justify-end gap-2 px-4 pb-4",
  },
} as const satisfies Recipe;

/** Prompt box: a growing textarea over a bar of tools and the send button. */
export const composer = {
  name: "composer",
  base: "border-[1.5px] border-ink bg-paper transition-[border-color,box-shadow] duration-150 focus-within:border-pen focus-within:ring-1 focus-within:ring-pen",
  slots: {
    input:
      "block field-sizing-content max-h-60 min-h-[52px] w-full resize-none border-0 bg-transparent px-4 py-3 text-base leading-normal text-ink outline-none placeholder:text-grey focus-visible:outline-none",
    bar: "flex items-center gap-3 border-t border-rule py-2 pr-2 pl-4",
    tools: "flex min-w-0 flex-1 items-center gap-2",
    hint: "font-mono text-label whitespace-nowrap text-grey max-sheet:hidden",
  },
} as const satisfies Recipe;

/** Every recipe, for the HTML build and the docs. */
export const recipes = {
  button,
  link,
  toggleGroup,
  caption,
  display,
  heading,
  text,
  mark,
  code,
  codeBlock,
  kbd,
  prose,
  desk,
  drawingSheet,
  headerStrip,
  cells,
  cell,
  value,
  status,
  stamp,
  itemNumber,
  dimension,
  sectionLine,
  emptyState,
  card,
  badge,
  table,
  avatar,
  progress,
  skeleton,
  alert,
  label,
  input,
  textarea,
  nativeSelect,
  field,
  checkbox,
  radio,
  switchControl,
  choice,
  select,
  tabs,
  accordion,
  breadcrumb,
  separator,
  dialog,
  sheet,
  menu,
  popover,
  tooltip,
  pageHeader,
  pagination,
  sidebar,
  banner,
  split,
  logo,
  timeline,
  revisions,
  parts,
  notes,
  note,
  stampLayer,
  spinner,
  transcript,
  message,
  toolCall,
  toolGroup,
  thinking,
  working,
  permission,
  composer,
} as const satisfies Record<string, Recipe>;
