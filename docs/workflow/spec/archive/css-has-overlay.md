# Spec: CSS `:has()` Overlay

## Behavior
- **Blocked by default**: every recommendation video item is unclickable, thumbnail/avatar/duration hidden, text unreadable
- **Allowed**: items that are a live stream or a mix/playlist stay fully visible and interactive
- **Player**: end screen, cards, and fullscreen related grid hidden
- Temporary disable / cooldown behavior unchanged

## Targets
- Unified video item (watch sidebar, search, channel/home grids)
- Shorts item in shelves, Shorts player item
- Home grid wrapper (legacy safety)

## Out of Scope
- Legacy search result item (`ytd-video-renderer`) — kept unblocked as before; revisit separately

## Acceptance
- Normal items blocked, including items lazy-loaded after page load and after SPA navigation
- Live and mix/playlist items visible and clickable
- Disable removes all effects; re-enable restores them
