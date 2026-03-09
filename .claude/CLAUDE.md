# yt-overlay

Chrome extension that overlays YouTube videos to block interaction.

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

## Conventions
- Rules: `.claude/rules/` — read and apply always
- Process: `.claude/rules/process.md` — governs all task behavior
- Past mistakes: `docs/lessons.md` — read before acting

## Skills
Skills in `.claude/skills/xxx/SKILL.md`. Available: `/journal`, `/commit`, `/workflow-status`.
