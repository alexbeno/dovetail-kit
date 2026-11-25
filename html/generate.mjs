// Turns Dovetail recipes (src/lib/recipes.ts) into plain CSS classes written
// with @apply, ready to be compiled by Tailwind. Pure functions, no I/O.

/** `itemDestructive` → `item-destructive` */
export function kebab(value) {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

function rule(selector, classes) {
  const list = classes.trim().replace(/\s+/g, " ");
  if (list === "") {
    return "";
  }
  return `  ${selector} {\n    @apply ${list};\n  }\n`;
}

/** Class of one variant value: `.btn-accent`, or `.card-interactive` for a boolean variant. */
export function variantClass(name, group, value) {
  if (value === "true") {
    return `.${name}-${kebab(group)}`;
  }
  return `.${name}-${value}`;
}

/**
 * CSS of one recipe.
 *
 * - `.name` carries the base classes.
 * - A default variant applies while no other value of its group is present
 *   (`.btn:not(.btn-accent, .btn-outline…)`), so `class="btn"` alone is the
 *   default button and `class="btn btn-accent"` never fights it.
 * - Slots come last so a slot modifier can override its slot.
 */
export function recipeToCss(recipe) {
  const root = `.${recipe.name}`;
  let css = rule(root, [recipe.base, recipe.html].filter(Boolean).join(" "));

  for (const [group, values] of Object.entries(recipe.variants ?? {})) {
    const fallback = recipe.defaultVariants?.[group];
    const others = Object.keys(values).filter((value) => value !== fallback);

    if (fallback !== undefined) {
      const except = others
        .map((value) => variantClass(recipe.name, group, value))
        .join(", ");
      const selector = except === "" ? root : `${root}:not(${except})`;
      css += rule(selector, values[fallback]);
    }
    for (const value of others) {
      css += rule(variantClass(recipe.name, group, value), values[value]);
    }
  }

  for (const [slot, classes] of Object.entries(recipe.slots ?? {})) {
    css += rule(`.${recipe.name}-${kebab(slot)}`, classes);
  }
  return css;
}

/** All recipes, wrapped in Tailwind's components layer so utilities still win. */
export function recipesToCss(recipes) {
  const body = Object.values(recipes).map(recipeToCss).join("\n");
  return `@layer components {\n${body}}\n`;
}

/** Every class name the HTML build exposes, for the reference doc. */
export function classIndex(recipes) {
  return Object.entries(recipes).map(([key, recipe]) => {
    const variants = Object.entries(recipe.variants ?? {}).flatMap(
      ([group, values]) =>
        Object.keys(values)
          .filter((value) => value !== recipe.defaultVariants?.[group])
          .map((value) => variantClass(recipe.name, group, value).slice(1)),
    );
    const slots = Object.keys(recipe.slots ?? {}).map(
      (slot) => `${recipe.name}-${kebab(slot)}`,
    );
    return { key, name: recipe.name, variants, slots };
  });
}
