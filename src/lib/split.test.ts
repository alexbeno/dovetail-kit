import { describe, expect, it } from "vitest";
import { clampSize, sizeFromKey } from "./split";

const base = {
  current: 40,
  min: 15,
  max: 85,
  isVertical: false,
  isLargeStep: false,
};

describe("clampSize", () => {
  it("keeps a size inside its limits", () => {
    expect(clampSize(50, 15, 85)).toBe(50);
    expect(clampSize(2, 15, 85)).toBe(15);
    expect(clampSize(99, 15, 85)).toBe(85);
  });
});

describe("sizeFromKey", () => {
  it("moves by 2% with the horizontal arrows", () => {
    expect(sizeFromKey("ArrowLeft", base)).toBe(38);
    expect(sizeFromKey("ArrowRight", base)).toBe(42);
  });

  it("moves by 10% with shift", () => {
    expect(sizeFromKey("ArrowRight", { ...base, isLargeStep: true })).toBe(50);
  });

  it("uses the vertical arrows when the panes are stacked", () => {
    const vertical = { ...base, isVertical: true };
    expect(sizeFromKey("ArrowUp", vertical)).toBe(38);
    expect(sizeFromKey("ArrowDown", vertical)).toBe(42);
    expect(sizeFromKey("ArrowLeft", vertical)).toBeNull();
  });

  it("jumps to the limits with Home and End", () => {
    expect(sizeFromKey("Home", base)).toBe(15);
    expect(sizeFromKey("End", base)).toBe(85);
  });

  it("ignores any other key", () => {
    expect(sizeFromKey("Enter", base)).toBeNull();
    expect(sizeFromKey("ArrowUp", base)).toBeNull();
  });
});
