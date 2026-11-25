---
name: kit-patterns
description: Where code belongs in dovetail-kit and how to add or change a token, a recipe, a component, a story, a registry item or an HTML class. Use whenever you create, move or restyle a component, add a variant, touch src/styles, src/lib/recipes.ts, html/ or registry.json, or when the user asks "where should I put this?".
user-invocable: false
paths: ["src/**", "html/**", "registry.json", ".storybook/**"]
---

One source of styles, two outputs. Keep them in step: a change is done when React **and** HTML show it, in paper **and** blueprint.

## Where does it go?

```text
A colour, a font, a line weight, a shadow        → src/styles/tokens.css   (--dt-*, both themes)
A Tailwind utility, an animation, a breakpoint   → src/styles/theme.css    (@theme, @utility)
How a component looks (any class)                → src/lib/recipes.ts
A component's markup, props, Radix wiring        → src/components/ui/<name>.tsx
A behaviour for plain HTML (no React)            → html/dovetail.js
A pattern only plain HTML needs                  → html/extras.css, or `html:` in the recipe
An example                                       → src/stories/<family>.stories.tsx and html/demo.html
```

## New component (or new part of one)

1. **Recipe** in `src/lib/recipes.ts`: `name` (the HTML class), `base`, optional `variants` + `defaultVariants`, `slots`, `html`. Add it to the `recipes` object at the bottom. Reference: `button` (variants), `card` (slots), `checkbox` (`html` for the native input).
2. **Component** in `src/components/ui/<name>.tsx`, shadcn style. Reference: `button.tsx` (cva + `asChild`), `card.tsx` (slots), `dialog.tsx` (Radix + portal). For a primitive shadcn already has, start from `npx shadcn@latest add <component>`, then move every class into a recipe.
3. **Story** in the matching file of `src/stories/`. Show each variant; no business scenario.
4. **Registry**: add the item to `registry.json` (`registryDependencies: ["@dovetail/dovetail-core"]`, npm `dependencies`), then `npm run build:registry`.
5. **HTML**: add the markup to `html/demo.html`, run `npm run build:html`, check `dist/classes.json` for the class names. If the component needs a behaviour, add it to `html/dovetail.js` with event delegation and a `data-*` hook, never an inline handler.
6. **Showcase**: add a `Specimen` to the matching file of `src/docs/sections/`.
7. `npm run lint && npm run typecheck && npm test`, then look at the story and at `html/demo.html` in both themes.

## Writing a recipe

- Every class in full, as text: Tailwind reads the file, it does not run it. `${CONSTANT}` of a literal string is fine, a computed prefix is not.
- No `group` / `peer` marker classes: the string goes through `@apply`. To react to an ancestor use `in-data-[state=open]:`, `in-open:`; to style children use `[&_svg]:`, `[&>*+*]:`.
- State comes from Radix attributes (`data-[state=checked]:`, `data-highlighted:`, `aria-selected:`). When the HTML flavour uses a native element instead, add the native twin either next to it (`open:animate-…` next to `data-[state=open]:animate-…`) or in `html:` when it would break React (`appearance-none`, `checked:` pseudo-elements).
- A default variant becomes `.name:not(.name-other…)` in HTML. So each value of a group must set the same properties (background, border, text colour), otherwise one value leaks into another.
- Colours: `ink`, `paper`, `desk`, `pen`, `grey`, `rule`, `danger`, `success`, or shadcn's semantic names. A one-off tint is `bg-pen/6` or `color-mix()`, never a new colour.
- Lines: `border` (1px hairline), `border-[1.5px]` (rule), `border-2` (frame), `border-[3px]` (stamp). Depth: `shadow-float`, `shadow-press`, `shadow-lift` only.
- Type: `font-display` + `font-stretch-[88%]` (headings) or `font-stretch-[125%]` (display), `font-sans` for prose, `font-mono text-label tracking-label uppercase` for captions.
- Motion: `duration-150` (press, colour), `duration-250`, `duration-300`; `ease-draft`, `ease-out`, `ease-snap`. Animate `scale` / `translate` / `rotate` separately so they compose.

## New token

1. Add the `--dt-*` variable to **both** theme blocks of `tokens.css` (paper and blueprint).
2. Map it in `theme.css` (`--color-<name>: var(--dt-color-<name>)`) so Tailwind gets `bg-<name>`.
3. If it is a font size, a shadow, a tracking or an easing, add its key to `cn.ts` so `tailwind-merge` classifies it.
4. Add it to the `SAFELIST` in `html/build.mjs` if plain-HTML pages should have the utility.

## Checking the HTML flavour

`npm run build:html`, then open `html/demo.html` (file or Storybook → HTML → Without React). The generator is covered by `html/generate.test.mjs`; the recipes' invariants by `src/lib/recipes.test.ts`.
