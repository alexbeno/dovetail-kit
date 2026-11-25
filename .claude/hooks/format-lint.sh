#!/usr/bin/env bash
# PostToolUse(Edit|Write): formats and lints only the modified file.
file=$(jq -r '.tool_input.file_path // ""')
[[ -z $file || ! -f $file ]] && exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs) ;;
  *.json|*.md|*.css|*.scss|*.html|*.yml|*.yaml)
    npx --no-install prettier --write "$file" >/dev/null 2>&1; exit 0 ;;
  *) exit 0 ;;
esac

npx --no-install prettier --write "$file" >/dev/null 2>&1
if ! out=$(npx --no-install eslint --fix "$file" 2>&1); then
  echo "ESLint: errors not fixed automatically in $file" >&2
  echo "$out" >&2
  exit 2
fi
exit 0
