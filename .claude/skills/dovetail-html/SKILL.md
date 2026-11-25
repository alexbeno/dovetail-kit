---
name: dovetail-html
description: Build a plain HTML page, a prototype or a Claude artifact in the Dovetail style (drafting sheet, graph paper, black ink, one orange pen) with no React and no build step. Use whenever the user asks for an HTML page, a single-file app, an artifact, a mock-up or a dashboard "in Dovetail", "with my design system", "in the blueprint / drafting-sheet style", or when the output must be one self-contained .html file — even if they do not name the skill.
---

# Dovetail in plain HTML

Dovetail is an engineering drawing turned into an interface: cool graph paper, black ink,
**one orange pen**. A screen is a _sheet_ on a _desk_; content sits in the _cells_ of a title
block; every value has a small mono _caption_ above it. Blueprint is the same drawing as a negative.

Everything is in this skill's folder:

- `assets/dovetail.min.css`: tokens, every component class, a small set of layout utilities.
- `assets/dovetail.js`: theme toggle, tabs, dialogs, dropdowns, toggle groups, `Dovetail.stamp()`.
- `references/classes.md`: every class, its modifiers and its parts. Read it before writing markup.

## Setup

**A single self-contained file (Claude artifact, email attachment, prototype):** inline both
assets. Read `assets/dovetail.min.css` into a `<style>` in the `<head>`, read
`assets/dovetail.js` into a `<script>` at the end of the `<body>`. Fonts come from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
/>
```

**A page next to the files:** `<link rel="stylesheet" href="dovetail.min.css" />` and
`<script src="dovetail.js"></script>`.

**Need every Tailwind utility?** Use `dist/dovetail.tailwind.css` from the kit instead: paste
it in `<style type="text/tailwindcss">` after loading
`https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. Prototypes only: it compiles in the browser.

The stylesheet themes the page itself. Do not add a second set of colour variables, and do not
restyle `body`.

## Skeleton of a screen

```html
<body>
  <div class="desk">
    <div class="drawing-sheet">
      <header class="header-strip">
        <div><span class="caption caption-ink">Product · Section</span></div>
        <div>
          <nav class="header-strip-nav">
            <a class="link link-draw" href="#a">Overview</a>
          </nav>
        </div>
        <div class="header-strip-end">
          <button class="btn btn-ghost btn-sm" data-theme-toggle>Theme</button>
          <button class="btn btn-accent">Primary action</button>
        </div>
      </header>

      <section class="grid-paper grid gap-6 px-5 py-12">
        <span class="caption">Context · Subject</span>
        <h1 class="display">Title</h1>
        <p class="text text-lg max-w-xl">One or two sentences.</p>
      </section>

      <div class="cells cells-flush border-t" style="--cells: 4">
        <div class="cell">
          <span class="caption">Label</span>
          <span class="value value-lg">128</span>
        </div>
        <div class="cell" style="--span: 3">…</div>
      </div>
    </div>
  </div>
</body>
```

`--cells` is the column count from 901px up (default 4), `--cells-sm` below (default 2),
`--span` / `--span-sm` how many columns a cell takes.

## Behaviours (need `dovetail.js`)

| Pattern      | Markup                                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme        | `<button data-theme-toggle>`; or set `class="dark"` on `<html>` for blueprint. `Dovetail.setTheme("paper" \| "blueprint" \| "system")`                     |
| Tabs         | `<div class="tabs" data-tabs>` › `.tabs-list` › `<button class="tabs-trigger" data-tab="a">` + `<div class="tabs-content" data-tab-panel="a">`             |
| Dialog       | `<button data-dialog-open="id">` + `<dialog id="id" class="dialog">` with `.dialog-header`, `.dialog-body`, `.dialog-footer`, `<button data-dialog-close>` |
| Side panel   | same as a dialog with `<dialog class="drawer drawer-right">` and `.drawer-*` parts                                                                         |
| Dropdown     | `<details class="dropdown"><summary class="btn btn-outline">Menu</summary><div class="menu"><button class="menu-item">…`                                   |
| Toggle group | `<div class="toggle-group" data-toggle-group>` › `<button class="toggle-group-item" aria-pressed="true">`                                                  |
| Stamp        | `Dovetail.stamp("Approved", { tone: "success" })` — the toast                                                                                              |
| Note         | `Dovetail.notify({ title: "Saved", description: "…", tone: "success" })` — a toast with a body; returns a function that dismisses it                       |
| Dismiss      | `<button data-dismiss>` inside a `.banner` or a `.note` removes it                                                                                         |
| Split        | `<div class="split">` › `.split-pane` + `<div class="split-handle" aria-valuenow="30">` + `.split-pane`; give the split a height                           |

No script needed for: accordion (`<details class="accordion-item" name="x">` with
`<summary class="accordion-trigger"><span class="accordion-sign"></span>…`), tooltip
(`data-tooltip="…"` on the element), checkbox / radio / switch
(`<label class="choice"><input type="checkbox" class="checkbox" /> Text</label>`, `class="switch"`
on a checkbox), progress (`<div class="progress"><div class="progress-indicator" style="width: 62%">`).

State is set with attributes, not classes, on a few parts:

- `.sidebar` takes `data-collapsed="true"`; the current `.sidebar-item` takes `aria-current="page"`.
- `.timeline-item` takes `data-status="success | danger | active | pending"`.
- `.message` takes `data-role="user | assistant | system"`. A user message keeps its line
  breaks: write its text on one line, without indentation inside `.message-body`.
- `.tool` takes `data-status="running | pending | error"` (done by default). Use
  `<details class="tool">` with `<summary class="tool-row">` and `<pre class="tool-output">` to
  make it expandable.
- `.permission` takes `data-resolved` once answered; `.revisions-row` takes `data-current="true"`.
- `.drawing-sheet-zones` takes `data-side="top | bottom | left | right"`.

Dynamic content: the script uses event delegation, so markup added later works. After inserting
tabs, call `Dovetail.init(container)` to select the first one.

## The rules

1. **Classes from the kit first.** Check `references/classes.md` before writing CSS. Write
   custom CSS only for page layout (grid areas, widths), with the tokens.
2. **Tokens only.** `var(--dt-color-paper | ink | pen | grey | rule | desk | danger | success)`
   or the utilities `bg-paper`, `text-ink`, `text-pen`, `border-rule`… No hex, rgb or named
   colours. A tint is `color-mix(in srgb, var(--dt-color-pen) 6%, transparent)`.
3. **Square corners.** No `border-radius`. Round is only for the dots and balloons the kit draws.
4. **Lines, not shadows.** Separate with ink rules: 1px hairline, 1.5px rule, 2px frame. Never
   a blurred shadow; floating layers already carry their hard ink offset.
5. **One orange pen per screen.** `btn-accent` for the single primary action; orange also marks
   the current state, links and live status. Never an orange panel background.
6. **Label everything.** Every value, column and section gets a `caption` above it.
7. **Type roles are fixed.** `display` at most once per screen; `heading` (plus `heading-1`, `heading-3`, `heading-4`)
   for titles; Plex Sans for prose; mono for captions, numbers, codes, dates, IDs. Emphasis is
   `<mark class="mark">`, never italics or coloured text.
8. **Both themes.** Never hard-code a colour that only works on paper. Offer the toggle.
9. **Accessible.** Real `<button>` and `<a>`, a `<label class="label" for>` on every input,
   `<dialog>` for modals, 44px targets (the default `btn`). A tooltip never holds the only copy
   of a piece of information.
10. **One column below 901px.** `cells` collapses by itself; for your own layout use the
    `sheet:` utilities (`sheet:grid-cols-3`) or `@media (min-width: 56.3125rem)`.

## Layout utilities available without Tailwind

`flex`, `grid`, `hidden`, `flex-col`, `flex-wrap`, `flex-1`, `items-*`, `justify-*`,
`gap-{0…12}`, `p*/m*-{0…16}`, `grid-cols-{1…6,12}`, `col-span-*`, `w-full`, `max-w-{sm…5xl}`,
`text-{left,center,right}`, `text-{label,xs,sm,base,lg,xl,2xl,3xl}`,
`text-{ink,grey,pen,paper,danger,success}`, `bg-{paper,desk,ink,pen,accent}`, `border`,
`border-{t,b,l,r}`, `border-{ink,rule,pen,grey}`, `font-{sans,mono,display,medium,semibold}`,
`uppercase`, `truncate`, `sr-only`, `tabular-nums`, `grid-paper`, `hatch-mark`, `hatch-fill`,
`cut-line`. Display, flex direction, grid columns and spans also exist with the `sheet:` prefix.
Anything else: a `style` attribute or a small `<style>` block using the tokens.

## Voice

Short, precise, a little dry. Drafting metaphors are welcome (sheet, revision, issue, stamp)
but never at the cost of clarity. Labels are nouns, buttons are verbs.

## Before finishing

- One `display`, one `btn-accent`.
- No hex colour, no `border-radius`, no `box-shadow` of your own.
- Every value has a caption; every input has a label.
- Toggle the theme: nothing disappears in blueprint.
- Narrow the window below 901px: one column, nothing overflows.
