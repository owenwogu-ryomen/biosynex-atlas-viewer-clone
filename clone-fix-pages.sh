#!/usr/bin/env bash
# Apply this session's fixes remotely; never reset or overwrite the local checkout.
set -euo pipefail

repo='owenwogu-ryomen/biosynex-atlas-viewer-clone'
branch='arena/c976998c-biosynex-atlas-viewer-clone'
pr=1

if ! command -v gh >/dev/null 2>&1; then
  printf 'Error: GitHub CLI (gh) is required. Run this in your GitHub Codespace.\n' >&2
  exit 1
fi
gh auth status

state=$(gh pr view "$pr" --repo "$repo" --json state --jq '.state')
head_branch=$(gh pr view "$pr" --repo "$repo" --json headRefName --jq '.headRefName')
if [[ "$head_branch" != "$branch" || ( "$state" != 'OPEN' && "$state" != 'MERGED' ) ]]; then
  printf 'Error: PR #%s is not the expected open/merged session PR. Nothing changed.\n' "$pr" >&2
  exit 1
fi

printf '\nConfiguring Pages to publish the built app with GitHub Actions, NOT Jekyll.\n'
# Codespaces uses your own GitHub permissions; no token is embedded in this script.
if ! gh api --method PUT "repos/$repo/pages" -f build_type=workflow --silent; then
  current_source=$(gh api "repos/$repo/pages" --jq '.build_type')
  if [[ "$current_source" != 'workflow' ]]; then
    printf '\nCould not change the Pages source. As repository owner, open:\n' >&2
    printf 'https://github.com/%s/settings/pages\n' "$repo" >&2
    printf 'Under Build and deployment, set Source to GitHub Actions, then rerun this script.\n' >&2
    exit 1
  fi
  printf 'Pages already uses GitHub Actions; proceeding.\n'
fi

if [[ "$state" == 'OPEN' ]]; then
  printf '\nMerging all session fixes from PR #%s into main.\n' "$pr"
  gh pr merge "$pr" --repo "$repo" --merge
else
  printf '\nPR #%s is already merged; redeploying main with the fixed workflow.\n' "$pr"
fi

# Explicitly dispatch even if GitHub also starts a push build. The workflow's
# production concurrency group ensures only the latest deployment continues.
since=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
printf '\nStarting the Vite build and Pages deployment on main.\n'
gh workflow run deploy.yml --repo "$repo" --ref main

run_id=''
for attempt in {1..24}; do
  run_id=$(gh run list --repo "$repo" --workflow deploy.yml --branch main \
    --event workflow_dispatch --limit 10 --json databaseId,createdAt \
    --jq "[.[] | select(.createdAt >= \"$since\")] | sort_by(.databaseId) | last | .databaseId // empty")
  if [[ -n "$run_id" ]]; then break; fi
  sleep 5
done
if [[ -z "$run_id" ]]; then
  printf 'Deployment was requested but has not appeared yet. Check:\n'
  printf 'https://github.com/%s/actions/workflows/deploy.yml\n' "$repo"
  exit 1
fi

printf '\nWatching deployment: https://github.com/%s/actions/runs/%s\n' "$repo" "$run_id"
if ! gh run watch "$run_id" --repo "$repo" --exit-status --interval 10; then
  printf '\nDeployment did not succeed. Inspect the run above; do not assume the site is updated.\n' >&2
  exit 1
fi
printf '\nGitHub reports a successful deployment. Open and hard-refresh:\n'
printf 'https://owenwogu-ryomen.github.io/biosynex-atlas-viewer-clone/\n'
printf 'Your local checkout and uncommitted files were not changed.\n'
