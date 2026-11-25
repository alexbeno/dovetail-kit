#!/usr/bin/env node
// CRAP score of the changed functions: CC² × (1 − coverage)³ + CC.
// Usage: node crap.mjs <coverage-final.json> [--base <ref>] [--all] <files...>
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export const BLOCKING_THRESHOLD = 30;
export const REPORT_THRESHOLD = 15;

export function crap(cc, coverage) {
  return cc ** 2 * (1 - coverage) ** 3 + cc;
}

const K = ts.SyntaxKind;
const BRANCHES = new Set([
  K.IfStatement,
  K.ConditionalExpression,
  K.CaseClause,
  K.ForStatement,
  K.ForInStatement,
  K.ForOfStatement,
  K.WhileStatement,
  K.DoStatement,
  K.CatchClause,
]);
const OPERATORS = new Set([
  K.AmpersandAmpersandToken,
  K.BarBarToken,
  K.QuestionQuestionToken,
]);

function isFunction(node) {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node) ||
    ts.isConstructorDeclaration(node)
  );
}

function nameOf(node) {
  if (ts.isConstructorDeclaration(node)) {
    return "constructor";
  }
  if (node.name) {
    return node.name.getText();
  }
  const parent = node.parent;
  if (
    parent &&
    (ts.isVariableDeclaration(parent) ||
      ts.isPropertyAssignment(parent) ||
      ts.isPropertyDeclaration(parent))
  ) {
    return parent.name.getText();
  }
  return "<anonymous>";
}

// Complexity of one function, without descending into nested functions.
function complexity(fn) {
  let cc = 1;
  function visit(node) {
    if (isFunction(node)) {
      return;
    }
    if (BRANCHES.has(node.kind)) {
      cc += 1;
    } else if (
      ts.isBinaryExpression(node) &&
      OPERATORS.has(node.operatorToken.kind)
    ) {
      cc += 1;
    }
    ts.forEachChild(node, visit);
  }
  ts.forEachChild(fn, visit);
  return cc;
}

/** Lists the functions of a source: { name, start, end, cc } (1-indexed lines). */
export function analyzeSource(code, file = "source.tsx") {
  const source = ts.createSourceFile(
    file,
    code,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".ts") ? ts.ScriptKind.TS : ts.ScriptKind.TSX,
  );
  const functions = [];
  function line(pos) {
    return source.getLineAndCharacterOfPosition(pos).line + 1;
  }
  function visit(node) {
    if (isFunction(node) && node.body) {
      functions.push({
        name: nameOf(node),
        start: line(node.getStart(source)),
        end: line(node.getEnd()),
        cc: complexity(node),
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return functions;
}

/** Share of the statements in the range executed at least once. File missing from the report: 0. */
export function coverageOf(fileReport, start, end) {
  if (!fileReport) {
    return 0;
  }
  let total = 0;
  let covered = 0;
  for (const [id, loc] of Object.entries(fileReport.statementMap ?? {})) {
    if (loc.start.line < start || loc.start.line > end) {
      continue;
    }
    total += 1;
    if ((fileReport.s?.[id] ?? 0) > 0) {
      covered += 1;
    }
  }
  return total === 0 ? 1 : covered / total;
}

/** Ranges of added or modified lines, read from a `git diff -U0`. */
export function changedLines(diff) {
  const ranges = [];
  for (const m of diff.matchAll(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/gm)) {
    const start = Number(m[1]);
    const count = m[2] === undefined ? 1 : Number(m[2]);
    if (count > 0) {
      ranges.push([start, start + count - 1]);
    }
  }
  return ranges;
}

function git(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
}

function baseRef(requested) {
  for (const ref of [requested, "origin/main", "main"]) {
    if (!ref) {
      continue;
    }
    try {
      git(["rev-parse", "--verify", "--quiet", ref]);
      return ref;
    } catch {
      // try the next ref
    }
  }
  return null;
}

export function table(rows) {
  const header =
    "| Function | Location | CC | Coverage | CRAP |\n| --- | --- | --- | --- | --- |";
  const body = rows.map(
    (r) =>
      `| \`${r.name}\` | \`${r.file}:${r.start}\` | ${r.cc} | ${Math.round(r.coverage * 100)}% | ${r.crap.toFixed(1)} |`,
  );
  return [header, ...body].join("\n");
}

function main(argv) {
  const [reportPath, ...rest] = argv;
  let base;
  let all = false;
  const files = [];
  for (let i = 0; i < rest.length; i += 1) {
    if (rest[i] === "--base") {
      base = rest[++i];
    } else if (rest[i] === "--all") {
      all = true;
    } else {
      files.push(rest[i]);
    }
  }
  if (!reportPath || files.length === 0) {
    console.error(
      "Usage: node crap.mjs <coverage-final.json> [--base <ref>] [--all] <files...>",
    );
    return 2;
  }

  const report = existsSync(reportPath)
    ? JSON.parse(readFileSync(reportPath, "utf8"))
    : {};
  const ref = all ? null : baseRef(base);
  if (!all && !ref) {
    console.error(
      "No base ref found (origin/main, main): all functions are analysed.",
    );
  }

  const rows = [];
  for (const file of files) {
    if (!existsSync(file)) {
      continue;
    }
    let ranges = null;
    if (ref) {
      try {
        ranges = changedLines(
          git(["diff", "-U0", `${ref}...HEAD`, "--", file]),
        );
      } catch {
        ranges = null;
      }
    }
    const fileReport = report[path.resolve(file)];
    for (const fn of analyzeSource(readFileSync(file, "utf8"), file)) {
      if (ranges && !ranges.some(([s, e]) => s <= fn.end && e >= fn.start)) {
        continue;
      }
      const coverage = coverageOf(fileReport, fn.start, fn.end);
      rows.push({ ...fn, file, coverage, crap: crap(fn.cc, coverage) });
    }
  }

  rows.sort((a, b) => b.crap - a.crap);
  const output = rows.length === 0 ? "No changed function." : table(rows);
  process.stdout.write(`${output}\n`);
  return rows.some((r) => r.crap > BLOCKING_THRESHOLD) ? 1 : 0;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  process.exitCode = main(process.argv.slice(2));
}
