import { describe, expect, it } from "vitest";
import { cn } from "./cn";
import { recipes, type Recipe } from "./recipes";

const all: Recipe[] = Object.values(recipes);

function classesOf(recipe: Recipe): string[] {
  const variants = Object.values(recipe.variants ?? {}).flatMap((values) =>
    Object.values(values),
  );
  const slots = Object.values(recipe.slots ?? {});
  return [recipe.base, recipe.html ?? "", ...variants, ...slots]
    .flatMap((list) => list.split(/\s+/))
    .filter(Boolean);
}

describe("recipes", () => {
  it("give every recipe its own HTML class name", () => {
    const names = all.map((recipe) => recipe.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("never produce the same HTML class twice inside a recipe", () => {
    for (const recipe of all) {
      // A default value has no class of its own: it is the root without a modifier.
      const values = Object.entries(recipe.variants ?? {}).flatMap(
        ([group, map]) =>
          Object.keys(map)
            .filter((value) => value !== recipe.defaultVariants?.[group])
            .map((value) => (value === "true" ? group : value)),
      );
      const names = [...values, ...Object.keys(recipe.slots ?? {})];
      expect(new Set(names).size, recipe.name).toBe(names.length);
    }
  });

  it("only use classes that work under @apply (no group or peer markers)", () => {
    for (const recipe of all) {
      const markers = classesOf(recipe).filter((name) =>
        /^(group|peer)(\/|$)/.test(name),
      );
      expect(markers, recipe.name).toEqual([]);
    }
  });

  it("keep corners square: round is only `rounded-full`", () => {
    for (const recipe of all) {
      const rounded = classesOf(recipe).filter(
        (name) => /(^|:)rounded/.test(name) && !name.endsWith("rounded-full"),
      );
      expect(rounded, recipe.name).toEqual([]);
    }
  });

  it("declare a default for a variant group only with one of its values", () => {
    for (const recipe of all) {
      for (const [group, value] of Object.entries(
        recipe.defaultVariants ?? {},
      )) {
        expect(
          Object.keys(recipe.variants?.[group] ?? {}),
          `${recipe.name}.${group}`,
        ).toContain(value);
      }
    }
  });
});

describe("cn", () => {
  it("keeps Dovetail font sizes next to a text colour", () => {
    expect(cn("text-label text-grey")).toBe("text-label text-grey");
    expect(cn("text-display", "text-pen")).toBe("text-display text-pen");
  });

  it("keeps the display family next to a weight and a stretch", () => {
    expect(cn("font-display font-black font-stretch-[125%]")).toBe(
      "font-display font-black font-stretch-[125%]",
    );
  });

  it("lets the last conflicting class win", () => {
    expect(cn("px-4 text-label", "px-8 text-sm")).toBe("px-8 text-sm");
    expect(cn("shadow-float", "shadow-press")).toBe("shadow-press");
  });
});
