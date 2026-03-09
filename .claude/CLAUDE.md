# yt-overlay

YouTube動画操作をブロックするChrome拡張機能。

## Stack
- TypeScript + Vite + bun
- Chrome Extension Manifest V3
- CSS injection via content script

## Key Paths
- `src/content.ts` — content script entry point
- `src/styles/overlay.css` — overlay CSS styles
- `public/manifest.json` — extension manifest (source)
- `dist/` — build output (Chrome extension package)
- `docs/` — all project documentation

## Rules
See `.claude/rules/` for all conventions. Apply always.

Quick reference:
- Language: Japanese for human-facing docs, English for code/commits/other docs
- Commits: Conventional Commits, imperative, <50 chars subject
- Docs: High-level and durable — avoid implementation details

## Before Starting Any Task
1. Check `docs/roadmap/index.md` — current phase and open tasks
2. Review relevant `docs/workflow/` docs if design decisions are involved
3. Follow design flow: business (Why) → spec (What) → archi (How)

## After Completing Any Task
1. Update `docs/workflow/` doc lifecycle as needed (wip → adr → archive)
2. Update `docs/roadmap/index.md` if phase/status changed
3. Write or update `docs/journal/YYYY-MM-DD.md` with today's work
4. Commit following `.claude/rules/commits.md`

## Skills
See `.claude/skills/` for reusable task prompts.
