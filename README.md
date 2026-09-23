<p align="center"><img src="public/icons/icon128.png" width="96" alt=""></p>

# Nocturne

A Chrome extension that seals the feeds that eat your time — YouTube recommendations and the X timeline — behind a deliberate checkpoint. Free at night.

## Features

- **YouTube** — recommended videos are blanked out. Official artist videos, playlists, and mixes still work
- **X** — the home timeline, Explore, and sidebar trends are sealed. Notifications, DMs, profiles, posts, and posting still work
- **Night** — off from 19:30 to 05:00, or keep the seal on for the night from the popup
- **Breaking the seal** — takes a dedicated window; doing it again soon makes you wait longer each time

## Install

1. Download the zip from [Releases](../../releases) and unzip it
2. Open `chrome://extensions`, turn on **Developer mode**, then **Load unpacked** and pick the folder

To update, replace the folder with a newer release and press ↻ on the extension card.

## Development

Requires [bun](https://bun.sh).

```bash
bun install
bun run dev         # auto-reloading dev build → load dist/chrome-mv3-dev
bun run build       # production build → dist/chrome-mv3
bun run test        # unit tests
bun run type-check
```

Enable only one of the dev / production builds at a time; they keep separate state.

To release, bump `version` in `package.json` and push a matching `vX.Y.Z` tag — CI publishes the zip. Branching and versioning: [`.claude/rules/git.md`](.claude/rules/git.md).

## Notes

- Depends on YouTube's and X's current page structure; site changes can break it until the selectors in `src/styles/` are updated
- Official artist detection supports Japanese and English YouTube UI only
- Everything stays in your browser (extension local storage)
- Not affiliated with Google, YouTube, or X Corp.
