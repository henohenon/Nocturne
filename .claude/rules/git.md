# Git & Release Policy

Solo project, lightweight trunk-based flow.

## Branches
- `main` is always releasable — CI (type-check + build) must stay green
- Small changes: commit directly to `main`
- Large or experimental work: short-lived `feat/*` / `fix/*` branch → PR (CI runs) → squash merge → delete branch
- No long-lived branches (no `develop`, no release branches)
- No branch protection on `main` (it would block direct commits)

## Versioning (SemVer)
- **Patch** `x.y.Z` — bug fixes, selector updates for YouTube DOM changes
- **Minor** `x.Y.0` — new features, UI changes
- **Major** `X.0.0` — breaking changes (e.g. stored state reset or incompatible settings)

## Release
1. On `main`, bump `version` in `package.json`; commit `chore: release vX.Y.Z`
2. Tag `vX.Y.Z` on that commit and push the tag
3. The Release workflow checks tag = `package.json` version, builds the zip, and publishes a GitHub Release

## Rules for AI
- Never push, tag, or release without explicit user confirmation
- Never force-push `main` or rewrite published history
