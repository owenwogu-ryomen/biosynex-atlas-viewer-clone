#!/usr/bin/env bash
# Merge the GitHub Pages fixes into main using the Codespace's GitHub login.
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  printf 'Error: GitHub CLI (gh) is required. Run this in your GitHub Codespace.\n' >&2
  exit 1
fi

gh auth status >/dev/null

printf 'Merging PR #1 into main in owenwogu-ryomen/biosynex-atlas-viewer-clone.\n'
printf 'This includes all session-branch changes and triggers the Pages workflow.\n'
printf 'Your local checkout and uncommitted files will not be changed.\n'
gh pr merge 1 --repo owenwogu-ryomen/biosynex-atlas-viewer-clone --merge
