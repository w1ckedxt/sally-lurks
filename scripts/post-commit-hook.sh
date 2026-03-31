#!/bin/bash
# >>> SALLY-LURKS (do not edit) >>>
# Post-commit hook. Installed by sally-lurks.

CACHE="$HOME/.sally-lurks/quips.json"

# Diff stats from this commit
STATS=$(git diff --stat HEAD~1 HEAD 2>/dev/null | tail -1)
FILES=$(echo "$STATS" | grep -oE '[0-9]+ file' | grep -oE '[0-9]+')
INS=$(echo "$STATS" | grep -oE '[0-9]+ insertion' | grep -oE '[0-9]+')
DEL=$(echo "$STATS" | grep -oE '[0-9]+ deletion' | grep -oE '[0-9]+')

# Pick a quip
QUIP="She's watching."
if [ -f "$CACHE" ]; then
    count=$(jq -r '.quips | length' "$CACHE" 2>/dev/null || echo 0)
    if [ "$count" -gt 0 ]; then
        idx=$((RANDOM % count))
        QUIP=$(jq -r ".quips[$idx]" "$CACHE" 2>/dev/null)
    fi
fi

# Output
echo ""
echo "  sally: $QUIP"
if [ -n "$INS" ] && [ -n "$DEL" ]; then
    echo "         +${INS}/-${DEL} across ${FILES} file(s)"
fi
echo ""
# <<< SALLY-LURKS <<<
