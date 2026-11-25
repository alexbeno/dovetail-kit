#!/usr/bin/env bash
# PreToolUse(Bash): blocks destructive commands and access to secrets.
# A safety net, not a sandbox: it stops common mistakes.
cmd=$(jq -r '.tool_input.command // ""')
shopt -s nocasematch

deny() { echo "Blocked by guard-bash: $1. Ask the human to do it if it is needed." >&2; exit 2; }

re_rm='rm[[:space:]]+-[[:alpha:]]*(rf|fr)'
re_force='git[[:space:]]+push.*(--force([[:space:]]|$)|[[:space:]]-f([[:space:]]|$))'
re_reset='git[[:space:]]+(reset[[:space:]]+--hard|clean[[:space:]]+-[[:alpha:]]*f)'
re_main='git[[:space:]]+push[[:space:]]+[^[:space:]]+[[:space:]]+(main|master)([[:space:]]|$)'
re_env='(^|[[:space:]/=<])\.env(\.[[:alnum:]]+)*([[:space:]]|$)'
re_example='\.env\.example'
re_db='(drop[[:space:]]+(table|database|schema)|migrate[[:space:]]+reset|--force-reset)'

[[ $cmd =~ $re_rm ]]    && deny "rm -rf"
[[ $cmd =~ $re_force ]] && deny "git push --force (use --force-with-lease)"
[[ $cmd =~ $re_reset ]] && deny "git reset --hard / git clean -f"
[[ $cmd =~ $re_main ]]  && deny "direct push to main/master"
[[ $cmd =~ $re_env && ! $cmd =~ $re_example ]] && deny "access to a .env file"
[[ $cmd =~ $re_db ]]    && deny "destructive database operation"
exit 0
