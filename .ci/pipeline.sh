#!/usr/bin/env bash
# Platform-neutral build pipeline. Called by .github/workflows/validate.yml
# AND .gitlab-ci.yml (future). This script does NOT depend on any provider-specific env vars.
set -euo pipefail

step() { echo "▸ $*"; }
ok()   { echo "✔ $*"; }

step "node $(node --version), pnpm $(pnpm --version)"

step "install"
# First-run installs (and runs after package.json edits) regenerate the lockfile.
# In production, commit pnpm-lock.yaml on first push and switch to --frozen-lockfile.
pnpm install --no-frozen-lockfile

step "scaffold boundary check"
node scripts/check-managed-files.mjs

step "typecheck"
pnpm typecheck

step "build"
pnpm build

# Tests + lint are non-blocking in the demo template; uncomment in production.
# pnpm lint
# pnpm test

ok "pipeline green"
