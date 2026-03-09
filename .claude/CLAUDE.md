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
See `docs/lessons.md` for past mistakes — read before acting.

Quick reference:
- Language: Japanese for human-facing docs, English for code/commits/other docs
- Commits: Conventional Commits, imperative, <50 chars subject
- Docs: High-level and durable — avoid implementation details

## Backlog
`docs/backlog.md` is ordered top-to-bottom by priority. Read it before picking tasks.

## Before Starting Any Task
1. Check `docs/roadmap/index.md` — current phase and open tasks (completed phases are removed)
2. Review relevant `docs/workflow/` docs if design decisions are involved
3. Follow design flow: business (Why) → spec (What) → archi (How)

## After Completing Any Task
1. Update `docs/workflow/` doc lifecycle as needed (wip → adr → archive)
2. Update `docs/roadmap/index.md` — remove completed phases, update current phase tasks
3. Write or update today's journal: `docs/journal/YYYY-MM-DD.md` (index + reflection) and task log `docs/journal/tasks/NNN-task-name.md`
4. Commit following `.claude/rules/commits.md`

## Commands
Slash commands are in `.claude/commands/`. Use `/journal`, `/commit`, `/workflow-status`.
