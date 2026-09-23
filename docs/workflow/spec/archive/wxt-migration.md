# Spec: WXT Migration

## Behavior
- Extension behavior unchanged (overlay, popup, disable/cooldown)
- Production manifest equivalent to current: name, description, version, permissions, host permissions, content script match/timing, popup, icons
- Dev mode: file save rebuilds and reloads the extension and matching YouTube tabs in the user's own Chrome

## Commands
- `dev` — dev server with auto-reload (browser not auto-launched)
- `build` — production build
- `type-check` — unchanged role

## Acceptance
- Production build loads and behaves as before
- Dev output loaded once into the user's Chrome reloads on save
