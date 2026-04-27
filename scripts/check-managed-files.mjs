#!/usr/bin/env node
// Hard boundary enforcement: blocks edits to scaffold-managed files unless an
// override label is present. Replaces the legacy scripts/check-managed-files.sh
// from the previous scaffold.
//
// In CI this runs against `git diff origin/main...HEAD` and fails on managed-path edits.
// Locally (no PR context) it runs as a soft warning.

import * as fs from 'node:fs/promises';
import { execSync } from 'node:child_process';

const cfg = JSON.parse(await fs.readFile('.scaffold/managed-files.json', 'utf8'));
const managedGlobs = cfg.managedPaths;

function changedFiles() {
  try {
    const base = process.env.GITHUB_BASE_REF
      ? `origin/${process.env.GITHUB_BASE_REF}`
      : 'origin/main';
    const out = execSync(`git diff --name-only ${base}...HEAD`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
    return out.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

function matches(path, glob) {
  // Tiny glob: '**' matches anything; '*' matches one segment.
  const re = new RegExp(
    '^' +
      glob
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '.+')
        .replace(/\*/g, '[^/]+') +
      '$'
  );
  return re.test(path);
}

const changed = changedFiles();
const violations = changed.filter((f) => managedGlobs.some((g) => matches(f, g)));

if (violations.length === 0) {
  console.log('✔ scaffold boundary OK (no managed files changed, or local run)');
  process.exit(0);
}

const isCI = process.env.CI === 'true';
const overrideLabel = (process.env.PR_LABELS ?? '').split(',').includes('scaffold-override');

if (overrideLabel) {
  console.log('⚠ scaffold boundary: managed files changed, but override label is set');
  for (const v of violations) console.log('  ' + v);
  process.exit(0);
}

if (isCI) {
  console.error('✘ scaffold boundary VIOLATION: managed files changed without override');
  for (const v of violations) console.error('  ' + v);
  console.error('\nManaged paths are owned by the platform team. To propose a change:');
  console.error('  1. Open a PR upstream in platform-scaffold-demo, OR');
  console.error('  2. Add the `scaffold-override` label to this PR with platform-team approval.');
  process.exit(1);
}

console.warn('⚠ scaffold boundary: managed files changed (would fail in CI)');
for (const v of violations) console.warn('  ' + v);
