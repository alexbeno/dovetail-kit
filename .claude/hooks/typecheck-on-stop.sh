#!/usr/bin/env bash
# Stop: typecheck before handing back, only if TS files changed.
input=$(cat)
# Already re-run by this hook: let Claude stop (avoids an infinite loop).
[[ $(jq -r '.stop_hook_active // false' <<<"$input") == "true" ]] && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0

changed=$(git status --porcelain -- '*.ts' '*.tsx' 2>/dev/null)
[[ -z $changed ]] && exit 0

if ! out=$(npm run -s typecheck 2>&1); then
  echo "Typecheck failed, fix it before finishing:" >&2
  echo "$out" | tail -n 40 >&2
  exit 2
fi
exit 0
