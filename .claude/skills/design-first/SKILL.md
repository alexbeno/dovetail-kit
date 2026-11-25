---
name: design-first
description: Design a feature before coding it. Explores the relevant code, proposes 2 or 3 approaches with their trade-offs, writes a design document, has it critiqued, then waits for approval. Use for any non-trivial feature or refactor (several files, new data model, new API) or when the user says "design", "let's think first" or "propose options".
argument-hint: [feature description]
---

# Design before implementation: $ARGUMENTS

Do not write any production code during this skill.

1. Understand: read the relevant code (Explore agent if the area is large) and the CLAUDE.md of each area touched.
2. Clarify: if a piece of information that changes the solution is missing, ask at most 3 questions and wait.
3. Propose 2 or 3 approaches. For each: the principle in 2 sentences, the files touched, the impact on data and API, the risks, the effort (S, M or L). Recommend one.
4. For a component or a visual change: propose static variants as Storybook stories (a throwaway file in `src/stories/`) before touching the recipes, and show them in paper and in blueprint.
5. Write `docs/design/YYYY-MM-DD-<slug>.md` using the template below.
6. Have the document critiqued by the `design-critic` agent. Integrate the well-founded objections and list the others under "Open questions".
7. Present the approaches, the recommendation and the objections. Wait for an explicit "go".
8. After the go: split the plan into deliverable steps, each testable and ideally one PR.

## Document template

- Context and goal (3 lines)
- Chosen approach, rejected alternatives and why
- Changes: tokens, recipes, component API (props before/after), HTML classes (before/after), registry items
- Test plan: what to test at which level
- Breakdown into steps or PRs
- Open questions
