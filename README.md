# Dovetail kit

**The drafting-sheet design system, on shadcn/ui and Tailwind CSS 4.** Cool graph paper, black
ink and one orange pen. One source of styles, two ways to use it:

|                     |                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **React / Next.js** | shadcn-style components (Radix + `cva`), installable one by one through a shadcn registry   |
| **Plain HTML**      | the same components as CSS classes (`.btn`, `.card`, `.cells`…) in one stylesheet, no build |
| **Storybook**       | every component, in both themes, plus the HTML build                                        |
| **Claude Code**     | `CLAUDE.md`, hooks, agents and skills, including a portable `dovetail-html` skill           |

## How it fits together

```text
src/styles/tokens.css   --dt-* tokens + shadcn variables (paper / blueprint)
src/styles/theme.css    Tailwind 4 theme, utilities, base layer
src/lib/recipes.ts      every component's classes  ← the single source of styles
        │
        ├─► src/components/ui/*.tsx   React: cva(recipe) + Radix primitives
        │        └─► registry.json ─► public/r/*.json   (npx shadcn add)
        │
        └─► html/build.mjs            HTML: .btn { @apply … } compiled by Tailwind
                 └─► dist/dovetail.css · dovetail.min.css · dovetail.js · dovetail.bundle.js
```

Change a class in `recipes.ts` and both outputs change.

## Use it in a Next.js / React app

Requirements: Tailwind CSS 4 and a shadcn `components.json`.

1. Point shadcn at the registry (host `public/r/` anywhere static, or use a local path) in the
   app's `components.json`:

   ```json
   { "registries": { "@dovetail": "https://<your-host>/r/{name}.json" } }
   ```

2. Add components. Each one brings `dovetail-core` (tokens, theme, recipes, `cn`):

   ```bash
   npx shadcn@latest add @dovetail/button @dovetail/card @dovetail/drafting @dovetail/typography
   ```

3. Import the theme once, after Tailwind, and remove shadcn's default `:root` / `.dark`
   variables and `@theme inline` block from the same file:

   ```css
   @import "tailwindcss";
   @import "../styles/dovetail/dovetail.css";
   ```

4. Load the fonts. With Next.js, `next/font/google` (`Archivo` with `axes: ["wdth"]`,
   `IBM_Plex_Sans`, `IBM_Plex_Mono`) exposed as `--dt-font-display`, `--dt-font-sans`,
   `--dt-font-mono`; elsewhere `src/styles/fonts.css` (Fontsource) or the Google Fonts link below.

```tsx
import { Button } from "@/components/ui/button";
import {
  Cell,
  Cells,
  Desk,
  DrawingSheet,
  Value,
} from "@/components/ui/drafting";
import { Caption, Display } from "@/components/ui/typography";

export function Page() {
  return (
    <Desk>
      <DrawingSheet>
        <div className="grid-paper grid gap-6 px-5 py-12">
          <Caption>Project 014</Caption>
          <Display>Workbench</Display>
        </div>
        <Cells flush columns={4} className="border-t-[1.5px]">
          <Cell label="Parts">
            <Value variant="lg">128</Value>
          </Cell>
          <Cell label="Next step" span={3}>
            <Button variant="accent">Issue the sheet</Button>
          </Cell>
        </Cells>
      </DrawingSheet>
    </Desk>
  );
}
```

**Theme:** blueprint is `.dark` (or `data-theme="blueprint"`) on any element, so `next-themes`
with `attribute="class"` works as is. Tailwind's `dark:` variant follows it.

**Other shadcn components** (`npx shadcn add calendar`, blocks…) pick the system up through
the semantic variables: square corners, ink borders, Plex type. shadcn's `accent` is the quiet
hover tint; the orange is `pen` (`bg-pen`, `text-pen`, `<Button variant="accent">`).

## Use it in plain HTML

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
/>
<link rel="stylesheet" href="dist/dovetail.min.css" />

<div class="desk">
  <div class="drawing-sheet">
    <section class="grid-paper grid gap-6 px-5 py-12">
      <span class="caption">Project 014</span>
      <h1 class="display">Workbench</h1>
    </section>
    <div class="cells cells-flush border-t" style="--cells: 4">
      <div class="cell">
        <span class="caption">Parts</span>
        <span class="value value-lg">128</span>
      </div>
      <div class="cell" style="--span: 3">
        <button class="btn btn-accent">Issue the sheet</button>
      </div>
    </div>
  </div>
</div>

<script src="dist/dovetail.js"></script>
```

| File                         | Use                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `dist/dovetail.min.css`      | Everything, compiled. Link it, or inline it in a `<style>` for a single-file page           |
| `dist/dovetail.js`           | Theme toggle, tabs, dialogs, dropdowns, toggle groups, `Dovetail.stamp()`                   |
| `dist/dovetail.bundle.js`    | One `<script>`: injects the fonts and the CSS, then the behaviours                          |
| `dist/dovetail.tailwind.css` | Uncompiled (`@apply`): import it in a Tailwind 4 project to get the classes _and_ utilities |
| `dist/classes.json`          | Index of every class                                                                        |

Full page with every class: [`html/demo.html`](html/demo.html). Class list:
[`.claude/skills/dovetail-html/references/classes.md`](.claude/skills/dovetail-html/references/classes.md).

### In a Claude artifact or any single-file app

Copy the folder `.claude/skills/dovetail-html/` into a project's `.claude/skills/` (or into
`~/.claude/skills/` for every project). It is self-contained: the stylesheet, the script, the
class reference and the rules. Claude then inlines the CSS and JS into the page it builds.

## Develop

```bash
npm install
npm run storybook      # http://localhost:6006, theme switch in the toolbar
npm run build          # dist/ (HTML flavour) + public/r/ (shadcn registry)
npm run lint && npm run typecheck && npm test
```

Adding or changing a component touches five places (recipe, component, story, registry, HTML
demo): see [`.claude/skills/kit-patterns/SKILL.md`](.claude/skills/kit-patterns/SKILL.md).

## What is in the kit

- **Foundations**: 2 themes, 8 colours, Archivo / Plex type scale, line weights (hairline 1 ·
  rule 1.5 · frame 2 · stamp 3), hard ink shadows, motion easings, the `sheet` breakpoint (901px).
- **Drafting**: `Desk`, `DrawingSheet` (with zone markers), `HeaderStrip`, `Cells` / `Cell`,
  `Value`, `Status`, `Stamp`, `ItemNumber`, `Dimension`, `SectionLine`, `EmptyState`, `Logo`,
  `DovetailMark`.
- **Type**: `Caption`, `Display`, `Heading`, `Text`, `Mark`, `Code`, `CodeBlock`, `Kbd`, `Prose`, `Link`.
- **Actions**: `Button`, `ToggleGroup`.
- **Forms**: `Input`, `Textarea`, `Label`, `Field`, `Checkbox`, `RadioGroup`, `Switch`, `Select`, `NativeSelect`.
- **Data**: `Card`, `Badge`, `Table`, `Avatar`, `Progress`, `Skeleton`, `Spinner`, `Alert`,
  `Banner`, `Timeline`, `PartsList`, `RevisionList`, `NoteList`.
- **Navigation**: `Sidebar`, `PageHeader`, `Breadcrumb`, `Pagination`, `Tabs`, `Accordion`,
  `Separator`, `Split` (resizable panes).
- **Overlays**: `Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `ContextMenu`, `Popover`,
  `Tooltip`, `StampProvider` / `useStamp()` (rubber stamps and notes).
- **Agent kit**: `Transcript`, `Message`, `Thinking`, `ToolCall` / `ToolGroup`, `WorkIndicator`,
  `PermissionRequest`, `Composer`.

Left out from the original `@alexbeno/dovetail`, on purpose or for later:

- Replaced by Tailwind or shadcn: `Stack` (`flex` / `gap-*`), `ScrollArea` (`overflow-auto`),
  `ThemeProvider` (`next-themes` with `attribute="class"`, or `dovetail.js`), `Fieldset`.
- Not ported yet: `NoteButton`, single `Toggle`, `LiveDot` (use `Status`), `AvatarGroup`,
  `ChoiceList`, `Collapsible`, the full-screen `Dialog` size and `Reveal`.

## License

MIT © Alexis Benoliel
