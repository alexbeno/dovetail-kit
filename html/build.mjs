// Builds the plain-HTML flavour of Dovetail into dist/:
//
//   dovetail.css           tokens + component classes + a small set of layout utilities
//   dovetail.min.css       the same, minified (inline it in a <style> for a Claude artifact)
//   dovetail.tailwind.css  uncompiled source: use it inside a Tailwind 4 project or
//                          with the Tailwind browser build to get every utility
//   dovetail.js            behaviours (theme, tabs, dialog, dropdown, stamp)
//   dovetail.bundle.js     one <script>: injects fonts + CSS, then the behaviours
//   classes.json           index of every class, for docs and agents
//
// Run with `npm run build:html` (tsx, so the TypeScript recipes import directly).
import { execFileSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { classIndex, recipesToCss } from "./generate.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const dist = join(root, "dist");
const tmp = join(here, ".tmp");

const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap";

// Layout utilities kept in the static build, so a page can be laid out
// without Tailwind. Anything else: use dovetail.tailwind.css with Tailwind.
const SAFELIST = [
  "{,sheet:}{block,inline-block,flex,inline-flex,grid,hidden,contents}",
  "{,sheet:}flex-{row,col,wrap,1,none}",
  "{,sheet:}grid-cols-{1,2,3,4,5,6,12}",
  "{,sheet:}col-span-{1,2,3,4,5,6,7,8,9,10,11,12,full}",
  "items-{start,center,end,baseline,stretch}",
  "justify-{start,center,end,between}",
  "self-{start,center,end,stretch}",
  "{gap,gap-x,gap-y,space-y}-{0,1,2,3,4,5,6,8,10,12}",
  "{p,px,py,pt,pb,pl,pr,m,mx,my,mt,mb,ml,mr}-{0,1,2,3,4,5,6,8,10,12,16}",
  "{mx,ml,mr,mt}-auto",
  "{w,h,size}-{4,5,6,8,10,12,full}",
  "max-w-{sm,md,lg,xl,2xl,3xl,4xl,5xl,none}",
  "min-w-0",
  "min-h-screen",
  "text-{left,center,right}",
  "text-{label,xs,sm,base,lg,xl,2xl,3xl}",
  "text-{ink,grey,pen,paper,danger,success}",
  "bg-{paper,desk,ink,pen,accent,transparent}",
  "border{,-t,-b,-l,-r,-x,-y,-0}",
  "border-{ink,rule,pen,grey}",
  "font-{sans,mono,display,normal,medium,semibold,black}",
  "{uppercase,normal-case,truncate,sr-only,tabular-nums,whitespace-nowrap}",
  "tracking-{label,button,heading}",
  "leading-{none,tight,normal}",
  "overflow-{auto,hidden,x-auto}",
  "{relative,absolute,sticky}",
  "{grid-paper,hatch-mark,hatch-fill,cut-line}",
  "{fill,stroke}-{ink,pen,paper,grey}",
];

const banner =
  "/*! Dovetail (HTML build). Generated from src/lib/recipes.ts: do not edit. */\n";

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

const { recipes } = await import("../src/lib/recipes.ts");

const tooltipCss = `@layer components {
  [data-tooltip]:is(:hover, :focus-visible)::after {
    @apply ${recipes.tooltip.base} pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 w-max -translate-x-1/2 content-[attr(data-tooltip)];
  }
}
`;

const source = [
  read("src/styles/tokens.css"),
  read("src/styles/theme.css"),
  recipesToCss(recipes),
  tooltipCss,
  read("html/extras.css"),
].join("\n");

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
mkdirSync(tmp, { recursive: true });

writeFileSync(join(dist, "dovetail.tailwind.css"), banner + source);

const entry = join(tmp, "entry.css");
const safelist = SAFELIST.map(
  (pattern) => `@source inline("${pattern}");`,
).join("\n");
writeFileSync(
  entry,
  `@import "tailwindcss" source(none);\n${safelist}\n${source}`,
);

const cli = join(root, "node_modules", ".bin", "tailwindcss");
execFileSync(cli, ["-i", entry, "-o", join(dist, "dovetail.css")], {
  stdio: "inherit",
});
execFileSync(
  cli,
  ["-i", entry, "-o", join(dist, "dovetail.min.css"), "--minify"],
  { stdio: "inherit" },
);
rmSync(tmp, { recursive: true, force: true });

for (const file of ["dovetail.css", "dovetail.min.css"]) {
  writeFileSync(
    join(dist, file),
    banner + readFileSync(join(dist, file), "utf8"),
  );
}

copyFileSync(join(here, "dovetail.js"), join(dist, "dovetail.js"));

const css = readFileSync(join(dist, "dovetail.min.css"), "utf8");
const behaviours = readFileSync(join(here, "dovetail.js"), "utf8");
const bundle = `${banner}(function () {
  var head = document.head;
  if (!document.querySelector("[data-dovetail-fonts]")) {
    var fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href = ${JSON.stringify(FONTS_URL)};
    fonts.setAttribute("data-dovetail-fonts", "");
    head.appendChild(fonts);
  }
  if (!document.querySelector("[data-dovetail-css]")) {
    var style = document.createElement("style");
    style.setAttribute("data-dovetail-css", "");
    style.textContent = ${JSON.stringify(css)};
    head.insertBefore(style, head.firstChild);
  }
})();
${behaviours}`;
writeFileSync(join(dist, "dovetail.bundle.js"), bundle);

writeFileSync(
  join(dist, "classes.json"),
  JSON.stringify(classIndex(recipes), null, 2) + "\n",
);

// The dovetail-html skill is self-contained: copy its folder into any project
// (or ~/.claude/skills) and it carries the stylesheet, the script and the class list.
const skill = join(root, ".claude", "skills", "dovetail-html");
mkdirSync(join(skill, "assets"), { recursive: true });
mkdirSync(join(skill, "references"), { recursive: true });
copyFileSync(
  join(dist, "dovetail.min.css"),
  join(skill, "assets", "dovetail.min.css"),
);
copyFileSync(join(dist, "dovetail.js"), join(skill, "assets", "dovetail.js"));

function codeList(names) {
  return names.map((name) => `\`${name}\``).join(" ");
}

const rows = classIndex(recipes)
  .map(
    (entry) =>
      `| \`${entry.name}\` | ${codeList(entry.variants)} | ${codeList(entry.slots)} |`,
  )
  .join("\n");
writeFileSync(
  join(skill, "references", "classes.md"),
  `# Dovetail HTML classes

Generated by \`npm run build:html\` from \`src/lib/recipes.ts\`. Do not edit.

A modifier is added next to its root (\`class="btn btn-accent btn-sm"\`). A part is
used on a child element (\`<div class="card"><div class="card-header">\`).

| Root | Modifiers | Parts |
| --- | --- | --- |
${rows}
`,
);

function kb(file) {
  return `${(readFileSync(join(dist, file)).length / 1024).toFixed(1)} kB`;
}
console.log(
  `html: dovetail.css ${kb("dovetail.css")} · dovetail.min.css ${kb("dovetail.min.css")} · dovetail.bundle.js ${kb("dovetail.bundle.js")}`,
);
