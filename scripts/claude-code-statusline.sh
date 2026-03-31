#!/bin/bash
# Sally Lurks — Claude Code status line
# Installed by sally-lurks. Removal: sally-lurks remove

input=$(cat)

project_dir=$(echo "$input" | jq -r '.workspace.project_dir')
project_name=$(basename "$project_dir")
model_name=$(echo "$input" | jq -r '.model.display_name')
used_pct=$(echo "$input" | jq -r '.context_window.used_percentage // empty')

# Git branch
if git -C "$project_dir" rev-parse --git-dir > /dev/null 2>&1; then
    branch=$(git -C "$project_dir" -c core.fileMode=false rev-parse --abbrev-ref HEAD 2>/dev/null)
    git_info=" on $branch"
else
    git_info=""
fi

# Context percentage
ctx=""
if [ -n "$used_pct" ]; then
    used_int=$(printf "%.0f" "$used_pct")
    ctx=" | Ctx: ${used_int}%"
fi

# Sally quip (from cached quips)
CACHE="$HOME/.sally-lurks/quips.json"
if [ -f "$CACHE" ]; then
    count=$(jq -r '.quips | length' "$CACHE" 2>/dev/null || echo 0)
    if [ "$count" -gt 0 ]; then
        idx=$((RANDOM % count))
        quote=$(jq -r ".quips[$idx]" "$CACHE" 2>/dev/null)
    fi
fi
quote="${quote:-She's watching.}"

echo "${project_name}${git_info} | ${model_name}${ctx} | ${quote}"
