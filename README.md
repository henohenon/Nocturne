# Nocturne

A checkpoint against distracting feeds. Nocturne blocks YouTube recommendations by default, makes turning it off a deliberate act, and steps aside at night.

## What it does

- **Blocks recommendations** — thumbnails, titles, and clicks on recommended videos are hidden (watch sidebar, search, grids, Shorts)
- **Lets intentional listening through** — videos from official artist channels (not live), playlists, and mixes stay usable
- **Night mode** — off automatically from 19:30 to 05:00
- **Deliberate disable** — turning it off opens a danger-themed window (default 30 min, max 120). Disabling again within 60 minutes asks you whether you really need it
- **Shared across tabs** — disable state applies to every YouTube tab

## Install (from a release)

1. Download `nocturne-<version>-chrome.zip` from [Releases](../../releases) and unzip it
2. Open `chrome://extensions` and turn on **Developer mode**
3. **Load unpacked** → select the unzipped folder

To update, replace the folder contents with a newer release and press ↻ on the extension card.

## Development

Requires [bun](https://bun.sh).

```bash
bun install
bun run dev        # dev build with auto-reload → load dist/chrome-mv3-dev once
bun run build      # production build → dist/chrome-mv3
bun run zip        # release zip → dist/nocturne-<version>-chrome.zip
bun run type-check
bun run test         # unit tests (shared state)
```

Keep only one of the dev / production builds enabled at a time — they are separate extensions with separate state.

## Branching and releasing

`main` is always releasable. Small changes go straight to `main`; larger work uses a short-lived `feat/*` or `fix/*` branch merged via PR. Versions follow SemVer (patch: fixes and selector updates, minor: features and UI, major: breaking changes). Full policy: [`.claude/rules/git.md`](.claude/rules/git.md).

To release, bump `version` in `package.json`, commit, then push a matching tag:

```bash
git tag v1.0.1 && git push origin v1.0.1
```

GitHub Actions builds the zip and publishes a release.

## Notes

- Relies on YouTube's current DOM; YouTube changes can break blocking until selectors are updated (`src/styles/overlay.css`)
- Official artist detection uses the icon's accessible label and supports Japanese and English UI only
- No data leaves your browser; state is kept in extension local storage
- Not affiliated with YouTube or Google
