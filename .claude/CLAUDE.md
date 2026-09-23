> **First**: before any work, read `.claude/skills/pre-task/SKILL.md` and execute it.

# yt-overlay

Chrome extension that overlays YouTube videos to block interaction.

## Stack
- TypeScript + WXT (Vite) + bun
- Chrome Extension Manifest V3
- CSS injection via content script

## Key Paths
- `src/entrypoints/content.ts` — content script entry point
- `src/entrypoints/popup/` — extension popup
- `src/styles/overlay.css` — overlay CSS styles
- `wxt.config.ts` — build config + extension manifest (source)
- `dist/chrome-mv3/` — production build; `dist/chrome-mv3-dev/` — dev build (`bun run dev`, auto-reloads)
- `docs/` — all project documentation
- `docs/` — all project documentation

## Conventions
- Rules: `.claude/rules/` — read and apply always
- Process: `.claude/rules/process.md` — governs all task behavior
- Docs navigation: `docs/index.md` — start here to find relevant docs

## Skills
Skills in `.claude/skills/xxx/SKILL.md`. Available: `/pre-task`, `/post-task`, `/journal`, `/commit`, `/workflow-status`.
