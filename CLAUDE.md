# dovetail-kit

Dovetail, the drafting-sheet design system (graph paper, black ink, one orange pen), built on
shadcn/ui and Tailwind CSS 4 in a single npm package. One source of styles, two outputs:
React components for Next.js / React apps, and plain CSS classes for HTML pages (Claude
artifacts included). The code lives in `src/` and `html/`, its architecture rules in `src/CLAUDE.md`.

## Language

Everything in this repo is written in English: code, comments, docs, commit messages and PRs.

## Commands

- Install: `npm install`
- Showcase site: `npm run dev` (port 5173) · production build: `npm run build:site` (into `build/`) · `npm run preview`
- Storybook: `npm run storybook` (port 6006) · static build: `npm run build:storybook`
- Build: `npm run build` (HTML flavour into `dist/`, then the shadcn registry into `public/r/`)
  - HTML only: `npm run build:html` · registry only: `npm run build:registry`
- Lint: `npm run lint` (fix: `npm run lint:fix`)
- Types: `npm run typecheck`
- Tests: `npm test` · one file: `npx vitest run <path>` · related to files: `npx vitest related --run <files>`
- Coverage: `npm run test:coverage`

## Rules

- Never work around a lint or type error (`eslint-disable`, `@ts-ignore`, `any`) without flagging it.
- A component's classes live in `src/lib/recipes.ts` and nowhere else: React reads them, the HTML build compiles them. Never restyle a component in its `.tsx` or by hand in `dist/`.
- Tokens only: no hex, rgb or Tailwind palette colour (`bg-zinc-100`) outside `src/styles/tokens.css`.
- Square corners (`rounded-full` only for dots and balloons), ink rules instead of blurred shadows, one orange (`pen`) action per screen.
- Both themes, always: check paper and blueprint before finishing a visual change.
- A public change touches six places: recipe, component, story, `registry.json`, `html/demo.html` and the showcase section in `src/docs/sections/`. The `kit-patterns` skill lists them.
- The architecture is enforced by ESLint: if a dependency rule blocks you, change the design, not the rule.
- Code style is enforced by ESLint too; the rules a tool cannot check are in the `code-guidelines` skill.
- A non-trivial feature starts with `/design-first`.
- Commits follow Conventional Commits. To commit and open a PR: `/ship`.

## Known pitfalls

- Tailwind 4 has no `tailwind.config.js`: the theme is `src/styles/theme.css`, the tokens `src/styles/tokens.css`.
- Tailwind finds classes by reading source text. A class built at runtime (`"text-" + size`) does not exist: write every class in full in `recipes.ts`.
- A recipe string goes through `@apply` in the HTML build: no `group` / `peer` marker classes in it (use `in-*`, `has-*` or `[&_child]:` variants).
- `cn` comes from `@/lib/cn`, not from a stock `tailwind-merge`: it knows `text-label`, `text-display` and the custom shadows. A stock merge drops `text-label` next to `text-grey`.
- shadcn's `accent` is the quiet hover tint. The orange is `pen` (`bg-pen`, `text-pen`); the orange button is `variant="accent"`.
- shadcn's `Sheet` (`sheet.tsx`) is the side panel. The drawing sheet of a screen is `DrawingSheet` in `drafting.tsx` (`.drawing-sheet` in HTML, where the side panel is `.drawer`).
- The showcase site (`index.html` + `src/docs/`) is what Vercel deploys (`vercel.json`). Its build also serves the registry at `/r/` and the HTML flavour at `/dist/`: a broken `npm run build` breaks the deployment.
- A CSS variable set on a cell is inherited by a grid nested inside it. `--span` and `--span-sm` are registered as non-inheriting in `theme.css`; do the same for any new per-item variable.
- `dist/` and `public/r/` are generated: edit the sources and rebuild. Storybook's HTML story serves `dist/` as it was when Storybook started.
- `.gitignore` ignores `.env*`, so `.env.example` too: add `!.env.example` the day you create one.
