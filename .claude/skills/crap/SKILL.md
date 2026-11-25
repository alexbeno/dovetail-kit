---
name: crap
description: Computes the CRAP score (complexity × lack of coverage) of the functions changed on the branch and proposes tests or a refactor for the worst ones. Used by /ship. Also when the user asks where the code is risky to change.
argument-hint: [files, otherwise the files changed vs main]
allowed-tools: Bash(npx vitest *), Bash(git diff *), Bash(node *)
---

CRAP(f) = CC(f)² × (1 − cov(f))³ + CC(f). Above 30: deal with it before review. Above 15: flag it in the PR.

1. Files: $ARGUMENTS, otherwise `git diff --name-only origin/main...HEAD -- '*.ts' '*.tsx'`, without the tests (`*.test.*`). With no remote, compare against `main`.
2. Coverage: `npx vitest related --run --coverage --coverage.reporter=json <files>`, which produces `coverage/coverage-final.json`.
3. Score: `node ${CLAUDE_SKILL_DIR}/scripts/crap.mjs coverage/coverage-final.json <files>`. The script only keeps functions that overlap changed lines (`--base <ref>` to change the ref, `--all` to analyse everything before a refactor). It exits with code 1 if a function is above 30.
4. Report: the table of functions above 15. For each function above 30, a concrete proposal: the missing test cases, or how to split it.
