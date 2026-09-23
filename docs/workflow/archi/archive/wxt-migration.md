# Archi: WXT Migration

## Decisions
- **WXT file conventions** under `srcDir: src` — entrypoints for content script and popup; manifest defined in config instead of a static file
- **Browser runner disabled** — user loads the dev output into their own Chrome once; WXT's dev background keeps a connection to the dev server and reloads on change. Chosen over auto-launched profile: keeps real login state, avoids reported launch/profile issues on recent Chrome
- **CSS stays runtime-injected** (inline string → `<style>`), not manifest `css` — disable feature must remove it
- **Output dir kept as `dist/`** — per-target subfolders (prod / dev)

## Trade-offs
- Dev mode reloads all matching tabs on change (playback interrupted) — acceptable for dev
- WXT is pre-1.0; config keys may shift — pin version, keep config minimal

## Execution Record
- WXT 0.21.4 (pinned); `vite` / `vite-plugin-web-extension` removed; `vite.config.ts` and static manifest removed
- Content script runtime moved into `main()` (entrypoint module is evaluated at build time)
- `tsconfig.json` extends generated `.wxt/tsconfig.json`; `postinstall: wxt prepare`
- Production manifest verified equivalent (only script paths differ)
- Dev build adds background service worker, `scripting` permission, localhost host permission, reload shortcut (Alt+R); content scripts registered at runtime
- Verified: file save → rebuild → "Reloaded: content" from dev server
- Not verified here: reload landing in the user's Chrome (requires loading dev output there)
