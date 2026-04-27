#!/usr/bin/env bash
# Platform-neutral build pipeline. Called by both .github/workflows/* and .gitlab-ci.yml.
# This script does NOT depend on any provider-specific env vars.
set -euo pipefail

step() { echo "▸ $*"; }
ok()   { echo "✔ $*"; }

step "node $(node --version), pnpm $(pnpm --version)"

step "install"
pnpm install --frozen-lockfile

step "scaffold boundary check"
pnpm scaffold:check

step "typecheck"
pnpm typecheck

step "lint"
pnpm lint || echo "(lint warnings — non-blocking in demo)"

step "test"
pnpm test

step "build"
pnpm build

ok "pipeline green"
