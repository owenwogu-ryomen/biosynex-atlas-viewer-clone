import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { test } from "node:test";

const script = fileURLToPath(new URL("../clone-fix-pages.sh", import.meta.url));

function run(overrides = {}) {
  const directory = mkdtempSync(join(tmpdir(), "biosynex-repair-"));
  const bin = join(directory, "bin");
  mkdirSync(bin);
  const log = join(directory, "gh.log");
  writeFileSync(
    join(bin, "gh"),
    `#!/usr/bin/env bash
set -eu
printf '%s\\n' "$*" >> "$MOCK_LOG"
case "$*" in
  'auth status') exit 0 ;;
  *'--json state'*) echo "\u0024{MOCK_STATE:-OPEN}" ;;
  *'--json headRefName'*) echo 'arena/c976998c-biosynex-atlas-viewer-clone' ;;
  'api '*'/actions/permissions --jq '*) echo "\u0024{MOCK_POLICY:-local_only}" ;;
  'api --method PUT '*'/actions/permissions -F '*) exit "\u0024{MOCK_POLICY_EXIT:-0}" ;;
  'api '*'/actions/permissions/selected-actions --jq '*) echo '{}' ;;
  'api --method PUT '*'/actions/permissions/selected-actions --input '*) cat >> "$MOCK_LOG"; exit "\u0024{MOCK_POLICY_EXIT:-0}" ;;
  'api --method PUT '*) exit "\u0024{MOCK_SETTINGS_EXIT:-0}" ;;
  'api '*'/pages --jq .build_type') echo "\u0024{MOCK_SOURCE:-workflow}" ;;
  'pr merge '*) exit "\u0024{MOCK_MERGE_EXIT:-0}" ;;
  'workflow run '*) exit 0 ;;
  'run list '*) echo '123456' ;;
  'run watch '*) exit "\u0024{MOCK_WATCH_EXIT:-0}" ;;
  *) echo "Unexpected gh call: $*" >&2; exit 99 ;;
esac
`,
    { mode: 0o755 },
  );
  try {
    const result = spawnSync("bash", [script], {
      cwd: directory,
      encoding: "utf8",
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, MOCK_LOG: log, ...overrides },
      timeout: 10000,
    });
    return { ...result, commands: readFileSync(log, "utf8") };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test("configures Pages, merges the explicit PR, dispatches main, and watches", () => {
  const result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.commands, /actions\/permissions -F enabled=true -f allowed_actions=selected/);
  assert.match(result.commands, /actions\/permissions\/selected-actions --input -/);
  assert.match(result.commands, /actions\/upload-artifact@v4/);
  assert.match(result.commands, /api --method PUT .*\/pages -f build_type=workflow/);
  assert.match(result.commands, /pr merge 1 --repo .* --merge/);
  assert.match(result.commands, /workflow run deploy.yml --repo .* --ref main/);
  assert.match(result.commands, /run watch 123456 .* --exit-status/);
  assert.match(result.stdout, /successful deployment/);
});

test("reruns safely if the PR is already merged", () => {
  const result = run({ MOCK_STATE: "MERGED" });
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.commands, /pr merge/);
  assert.match(result.commands, /workflow run/);
});

test("stops on failed merge without dispatching an unfixed main", () => {
  const result = run({ MOCK_MERGE_EXIT: "1" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.commands, /workflow run/);
});

test("explains manual Pages setup if denied and still using legacy publishing", () => {
  const result = run({ MOCK_SETTINGS_EXIT: "1", MOCK_SOURCE: "legacy" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /set Source to GitHub Actions/);
  assert.doesNotMatch(result.commands, /pr merge|workflow run/);
});

test("can continue when settings write is denied but source is already correct", () => {
  const result = run({ MOCK_SETTINGS_EXIT: "1", MOCK_SOURCE: "workflow" });
  assert.equal(result.status, 0, result.stderr);
});

test("reports deployment failure instead of claiming success", () => {
  const result = run({ MOCK_WATCH_EXIT: "1" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.stdout, /successful deployment/);
});

test("does not reopen or merge a closed PR", () => {
  const result = run({ MOCK_STATE: "CLOSED" });
  assert.notEqual(result.status, 0);
  assert.doesNotMatch(result.commands, /api --method PUT|pr merge|workflow run/);
});

test("does not replace an existing all-actions policy", () => {
  const result = run({ MOCK_POLICY: "all" });
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.commands, /allowed_actions=selected/);
});

test("explains the Actions policy blocker before merging if admin access is denied", () => {
  const result = run({ MOCK_POLICY_EXIT: "1" });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /settings\/actions/);
  assert.doesNotMatch(result.commands, /pr merge|workflow run/);
});

test("allows explicitly confirmed manual setup without settings API access", () => {
  const result = run({ BIOSYNEX_SETTINGS_CONFIRMED: "1", MOCK_POLICY_EXIT: "1" });
  assert.equal(result.status, 0, result.stderr);
  assert.doesNotMatch(result.commands, /api /);
  assert.match(result.commands, /pr merge 1/);
  assert.match(result.commands, /run watch/);
});
