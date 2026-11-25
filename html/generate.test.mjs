import { describe, expect, it } from "vitest";
import {
  classIndex,
  kebab,
  recipeToCss,
  recipesToCss,
  variantClass,
} from "./generate.mjs";

const button = {
  name: "btn",
  base: "inline-flex   border",
  html: "appearance-none",
  variants: {
    variant: { default: "bg-ink", accent: "bg-pen", ghost: "" },
    block: { true: "w-full" },
  },
  defaultVariants: { variant: "default" },
  slots: { iconStart: "mr-2" },
};

describe("kebab", () => {
  it("turns camelCase into kebab-case", () => {
    expect(kebab("itemDestructive")).toBe("item-destructive");
    expect(kebab("item")).toBe("item");
  });
});

describe("variantClass", () => {
  it("names a value after the recipe", () => {
    expect(variantClass("btn", "variant", "accent")).toBe(".btn-accent");
  });

  it("names a boolean variant after its group", () => {
    expect(variantClass("card", "interactive", "true")).toBe(
      ".card-interactive",
    );
  });
});

describe("recipeToCss", () => {
  const css = recipeToCss(button);

  it("puts base and HTML-only classes on the root, whitespace collapsed", () => {
    expect(css).toContain(
      ".btn {\n    @apply inline-flex border appearance-none;",
    );
  });

  it("applies the default variant only while no other value of the group is present", () => {
    expect(css).toContain(
      ".btn:not(.btn-accent, .btn-ghost) {\n    @apply bg-ink;",
    );
  });

  it("emits one class per non-default value and skips empty ones", () => {
    expect(css).toContain(".btn-accent {\n    @apply bg-pen;");
    expect(css).not.toContain(".btn-ghost {");
    expect(css).not.toContain(".btn-default");
  });

  it("emits boolean variants and slots", () => {
    expect(css).toContain(".btn-block {\n    @apply w-full;");
    expect(css).toContain(".btn-icon-start {\n    @apply mr-2;");
  });

  it("keeps the default on the root when it is the only value", () => {
    const single = recipeToCss({
      name: "x",
      base: "",
      variants: { tone: { ink: "text-ink" } },
      defaultVariants: { tone: "ink" },
    });
    expect(single).toBe("  .x {\n    @apply text-ink;\n  }\n");
  });
});

describe("recipesToCss", () => {
  it("wraps everything in the components layer", () => {
    const css = recipesToCss({ button });
    expect(css.startsWith("@layer components {\n")).toBe(true);
    expect(css.trimEnd().endsWith("}")).toBe(true);
  });
});

describe("classIndex", () => {
  it("lists variants without the defaults, and slots", () => {
    expect(classIndex({ button })).toEqual([
      {
        key: "button",
        name: "btn",
        variants: ["btn-accent", "btn-ghost", "btn-block"],
        slots: ["btn-icon-start"],
      },
    ]);
  });
});
