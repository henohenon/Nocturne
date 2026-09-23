> **First**: before any work, read `.claude/skills/pre-task/SKILL.md` and execute it.

# Nocturne

Chrome extension that blocks distracting feeds (YouTube recommendations, X timeline) behind a deliberate checkpoint; free at night.

## Stack
- TypeScript + WXT (Vite) + bun
- Chrome Extension Manifest V3
- CSS injection via content script

## Key Paths
- `src/entrypoints/youtube.content.ts`, `x.content.ts` — per-site content scripts
- `src/overlay.ts` — shared seal lifecycle (inject/remove styles, follow shared state)
- `src/entrypoints/background.ts` — toolbar icon (open eye while the seal is broken by hand)
- `src/state.ts`, `src/config.ts` — shared state and constants
- `src/entrypoints/popup/`, `disable/` — extension popup, disable window
- `src/styles/youtube.css`, `x.css` — per-site seal styles
- `wxt.config.ts` — build config + extension manifest (source)
- `dist/chrome-mv3/` — production build; `dist/chrome-mv3-dev/` — dev build (`bun run dev`, auto-reloads)
- `docs/` — all project documentation

## Conventions
- Rules: `.claude/rules/` — read and apply always
- Process: `.claude/rules/process.md` — governs all task behavior
- Docs navigation: `docs/index.md` — start here to find relevant docs

## Skills
Skills in `.claude/skills/xxx/SKILL.md`. Available: `/pre-task`, `/post-task`, `/journal`, `/commit`, `/workflow-status`.
