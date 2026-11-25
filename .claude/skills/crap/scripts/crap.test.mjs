import { describe, expect, it } from "vitest";
import { analyzeSource, changedLines, coverageOf, crap } from "./crap.mjs";

const CC5 = `
function f(a, b) {
  if (a) return 1;
  for (const x of b) {
    if (x) return 2;
  }
  return b ?? 0;
}`;

// Minimal Istanbul report: one statement per line from 2 to 8.
function report(hits) {
  const statementMap = {};
  const s = {};
  for (let line = 2; line <= 8; line += 1) {
    statementMap[line] = { start: { line }, end: { line } };
    s[line] = hits;
  }
  return { statementMap, s };
}

describe("reference cases", () => {
  it("CC 1 covered at 100% gives 1", () => {
    const [fn] = analyzeSource("function f() { return 1; }");
    expect(fn.cc).toBe(1);
    expect(crap(fn.cc, 1)).toBe(1);
  });

  it("CC 5 not covered gives 30", () => {
    const [fn] = analyzeSource(CC5);
    expect(fn.cc).toBe(5);
    expect(crap(fn.cc, coverageOf(report(0), fn.start, fn.end))).toBe(30);
  });

  it("CC 5 covered at 100% gives 5", () => {
    const [fn] = analyzeSource(CC5);
    expect(crap(fn.cc, coverageOf(report(3), fn.start, fn.end))).toBe(5);
  });
});

describe("complexity", () => {
  it("counts nested functions separately", () => {
    const fns = analyzeSource(`
const outer = (xs) => {
  return xs.map((x) => (x ? 1 : 0));
};`);
    expect(fns.map((f) => [f.name, f.cc])).toEqual([
      ["outer", 1],
      ["<anonymous>", 2],
    ]);
  });

  it("ignores default but counts each case, catch and ||", () => {
    const [fn] = analyzeSource(`
function g(a) {
  try {
    switch (a) {
      case 1: return 1;
      case 2: return 2;
      default: return a || 0;
    }
  } catch { return -1; }
}`);
    expect(fn.cc).toBe(5);
  });
});

describe("coverage and diff", () => {
  it("counts 0% for a file missing from the report", () => {
    expect(coverageOf(undefined, 1, 10)).toBe(0);
  });

  it("reads the added ranges of a -U0 diff", () => {
    const diff = "@@ -3 +3,2 @@ x\n@@ -10,2 +11,0 @@\n@@ -20,0 +22 @@";
    expect(changedLines(diff)).toEqual([
      [3, 4],
      [22, 22],
    ]);
  });
});
