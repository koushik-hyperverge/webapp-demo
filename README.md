# webapp-demo

First demo webapp from create-scaffold-webapp

Owned by **@platform-team**. Scaffolded from `@koushik-hyperverge/create-scaffold-webapp`.

## Local development

```bash
# 1. Auth GitHub Packages (one-time):
export GITHUB_TOKEN=$(gh auth token)

# 2. Install + run:
pnpm install
pnpm dev
```

## Scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Vite dev server on :5173 |
| `pnpm build` | Production build |
| `pnpm typecheck` | TS check (no emit) |
| `pnpm test` | Vitest unit tests |
| `pnpm scaffold:check` | Verify no scaffold-managed files were edited |

## Scaffold upgrades

Renovate opens auto-PRs when `@koushik-hyperverge/*` packages publish new versions. Patch/minor PRs auto-merge if CI is green; majors require a human review.

## Boundary

`.ci/`, `.scaffold/`, `.platform.yml`, `renovate.json`, `CODEOWNERS`, `.npmrc`, `tailwind.config.ts`, `postcss.config.js`, and `scripts/check-managed-files.mjs` are **scaffold-managed**. CI blocks edits to these without the `scaffold-override` label and platform-team approval.
