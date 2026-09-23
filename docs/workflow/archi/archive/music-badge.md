# Archi: Music Badge Allowlist

## Decisions
- **Signal: an icon inside the default thumbnail badge** (`.ytBadgeShapeThumbnailDefault .ytBadgeShapeIcon`) — YouTube renders the duration badge with a leading ♪ for music; non-music duration badges carry no icon. The live badge also has an icon but a different badge type (`…ThumbnailLive`), and live is excluded by its own rule
- **Still CSS-only** — added as a second alternative in the existing `:has()` allowlist

## Verification
- Logged-out samples: music watch page sidebar — all items had the icon (incl. a non-artist lofi mix); game watch page sidebar — no icons on duration badges (0/3), live lofi radio still blocked
- Cover-song watch page sidebar: old rule 4/4 blocked → new rule 2/4 (two ♪ covers pass; a non-music challenge video and one unmarked cover stay blocked)
- User's home "音楽" screenshot: all four blocked items showed ♪ on the duration
- Not verified: the user's logged-in home with the new build
