# Business: Migrate Build to WXT

## Why
- Manual loop (build → reload extension → reload YouTube tab) slows iteration, especially now that YouTube DOM drift requires frequent live checks
- Current plugin (`vite-plugin-web-extension`) is installed but unused, and its author is deprecating it in favor of WXT
- WXT is the 2026 de facto standard for extension tooling

## Goals
- Save → changes live in the user's everyday Chrome (logged-in YouTube) without manual reloads
- Single build command producing a loadable extension

## Non-goals
- Cross-browser support, store publishing, CI (separate tasks)
