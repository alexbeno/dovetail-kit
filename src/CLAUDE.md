# src

## Where code lives

```text
src/
├── styles/
│   ├── tokens.css        # --dt-* tokens + shadcn semantic variables, both themes. Plain CSS.
│   ├── theme.css         # Tailwind 4 @theme mapping, custom utilities, base layer
│   ├── dovetail.css      # entry point: tokens + theme
│   └── fonts.css         # optional self-hosted fonts (Fontsource)
├── lib/
│   ├── recipes.ts        # every component's classes: the single source of styles
│   ├── cn.ts             # clsx + tailwind-merge, configured for Dovetail's theme keys
│   └── utils.ts          # re-exports cn (shadcn convention)
├── components/ui/        # shadcn-style components, zero business logic
└── stories/              # Storybook stories, one file per family

html/                     # the plain-HTML flavour (outside src/)
├── generate.mjs          # recipes -> CSS with @apply (pure functions, tested)
├── build.mjs             # writes dist/: dovetail.css, .min.css, .tailwind.css, .js, .bundle.js
├── extras.css            # HTML-only patterns (details dropdown, data-tooltip)
├── dovetail.js           # behaviours: theme, tabs, dialog, dropdown, stamp
└── demo.html             # every class on one page; also Storybook's HTML story
```

## Who imports what (enforced by ESLint)

- `components/ui/` imports `components/ui/` and `lib/`.
- `lib/` imports only `lib/`, and no React: `html/build.mjs` imports `recipes.ts` in Node.
- `stories/` import anything in `src/`.

Rule: `boundaries/dependencies` in `eslint.config.mjs`.

## Conventions

- Files and folders in `kebab-case` (`dropdown-menu.tsx`). Exported symbols keep the JS convention: `DropdownMenu`, `buttonVariants`.
- Functions and components are `function` declarations (`function Button() {}`), not `const` arrows. Arrows are for inline callbacks.
- Named exports only, grouped in one `export { ... }` at the end of the file, like shadcn/ui. Default exports are reserved for stories and config files.
- A component follows shadcn/ui: one file per family, `data-slot` on every part, `className` merged last with `cn`, native props spread last, `asChild` through `Slot` where it makes sense, variants through `cva` fed by the recipe.
- `"use client"` only on files that wrap a Radix primitive or hold state.
- Radix comes from the unified `radix-ui` package, icons from `lucide-react`.
- Imports across folders use the `@/` alias (`@/lib/recipes`, `@/components/ui/button`).
- Where a new piece goes and how to add it: `kit-patterns` skill. How to write the code: `code-guidelines` skill. How to use the kit in a plain HTML page: `dovetail-html` skill.
