import { describe, expect, it } from "vitest";
import { getPageItems } from "./pagination";

describe("getPageItems", () => {
  it("lists every page when they all fit", () => {
    expect(getPageItems(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPageItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("returns nothing for an empty set", () => {
    expect(getPageItems(1, 0)).toEqual([]);
  });

  it("elides the end when the current page is near the start", () => {
    expect(getPageItems(1, 20)).toEqual([1, 2, "gap", 20]);
    expect(getPageItems(3, 20)).toEqual([1, 2, 3, 4, "gap", 20]);
  });

  it("elides both sides in the middle", () => {
    expect(getPageItems(10, 20)).toEqual([1, "gap", 9, 10, 11, "gap", 20]);
  });

  it("elides the start when the current page is near the end", () => {
    expect(getPageItems(20, 20)).toEqual([1, "gap", 19, 20]);
  });

  it("widens the window with siblingCount", () => {
    expect(getPageItems(10, 20, 2)).toEqual([
      1,
      "gap",
      8,
      9,
      10,
      11,
      12,
      "gap",
      20,
    ]);
  });
});
