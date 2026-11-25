---
name: ship
description: Prepares the work in progress for human review. Checks lint, types, tests and CRAP, splits into atomic Conventional Commits, pushes the branch and opens a draft PR with a description and "how to test".
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(gh *), Bash(npm *), Bash(npx *), Bash(node *)
---

## Context

- Branch: !`git branch --show-current`
- Status: !`git status --short`
- Remote: !`git remote -v | head -n 1`
- Diff vs main: !`git diff --stat origin/main...HEAD 2>/dev/null || git diff --stat main...HEAD`

## Steps

1. Branch: if you are on main, create `<type>/<slug>` (e.g. `feat/export-csv`).
2. Check: `npm run lint`, `npm run typecheck`, `npm test`. On failure, fix it or stop and explain.
3. CRAP: run the `crap` skill on the changed files. If a changed function is above 30, propose tests or a split, and wait for the answer before continuing.
4. Size: if the diff exceeds about 400 lines (excluding lockfiles, snapshots, generated code) or mixes several topics, propose splitting into several PRs and wait for the answer.
5. Atomic commits: group by intent (preparatory refactor, then feature, then tests if separable). Each commit compiles and passes the tests. Add files one by one, without `git add -p` (interactive). Message: `type(scope): imperative summary`, and a body that explains the why. Written in English.
6. Push: `git push -u origin HEAD`. With no remote, stop here and say so: the PR needs a GitHub repository.
7. PR: `gh pr create --draft`, with a body that follows `${CLAUDE_SKILL_DIR}/pr-template.md`. The title reuses the main commit.
8. Return the PR URL and the points needing attention.
