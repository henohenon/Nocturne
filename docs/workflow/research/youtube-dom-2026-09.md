# YouTube DOM Survey (2026-09)

Investigation of the current YouTube desktop DOM to find replacements for broken selectors and better detection approaches. Observed logged-out, ja locale, desktop viewport.

## Findings

### Unified video item
- `yt-lockup-view-model` is now the common video item on watch sidebar, search results, and channel grids (wrapped by `ytd-rich-item-renderer` on grids)
- Search still mixes in legacy `ytd-video-renderer` (e.g. top results, shelves)
- Search Shorts use `ytm-shorts-lockup-view-model-v2` — not covered today
- Host div carries `content-id-<videoId>` class (stable per-item id)

### Class naming migration
- BEM kebab-case → camelCase (`yt-badge-shape__icon` → `ytBadgeShapeIcon`, `yt-core-attributed-string` → `ytAttributedStringHost`)
- Expect further breakage of any remaining kebab-case selectors

### Badge signals available in the DOM
| Signal | Meaning | Usable? |
|---|---|---|
| `.ytBadgeShapeIcon` | Any badge with an icon (verified, product count, duration, live, mix) | No — too broad |
| `.ytBadgeShapeLive` | Live stream | Yes |
| `.ytCollectionThumbnailViewModelHost` | Mix / playlist (stacked thumbnail) | Yes |
| Badge text (`ミックスリスト`, `ライブ`) | Kind label | Fallback only — locale dependent |
| `[class*=StyleTypeVerifiedArtist]` | Official artist channel | Only on `ytd-video-renderer`; lockups hide it behind a dialog |

- "Music" as a category is **not** detectable from lockup DOM

### Internal data (page world only)
- Lockup element exposes `rawProps.data` with `contentType` (`LOCKUP_CONTENT_TYPE_VIDEO` / `_PLAYLIST`) and badge styles
- Structure differs between pages (empty on search); requires a MAIN-world script
- Judged fragile — internal, unversioned

### Player
- `.ytp-videowall-still` gone; fullscreen related grid is `.ytp-fullscreen-grid` containing `.ytp-modern-videowall-still`
- `.ytp-endscreen-content`, `.ytp-ce-element`, `.ytp-cards-teaser` still present

## Approaches Compared

| Approach | Pros | Cons |
|---|---|---|
| JS badge detection + `.show` class (current) | Works with any logic | MutationObserver cost; flash before processing; selector drift |
| **CSS `:has()` only** | No JS for detection; applies instantly to lazy-loaded items; one place to update | Allowlist limited to what CSS can express |
| MAIN-world data read (`rawProps`) | Semantic (`contentType`) | Internal API, inconsistent across pages |
| Network response rewriting (`/youtubei/v1/*`) | Can drop items before render | Heavy, invasive, highest breakage risk |

### `:has()` prototype (verified)
- Rule shape: `yt-lockup-view-model:not(:has(.ytBadgeShapeLive, .ytCollectionThumbnailViewModelHost))` → block
- Watch sidebar: 14/14 normal items blocked, including items loaded after injection
- Search: mix item stayed interactive and visible; 10 normal items blocked

## Recommendation
- Move detection to CSS `:has()`; drop `badge.ts` + MutationObserver
- Target `yt-lockup-view-model` first; add `ytd-video-renderer` and Shorts lockups as needed
- Keep all YouTube class names in one CSS section so drift fixes are single-edit
- Decide scope of "allowed" content explicitly (live + mix/playlist; music not detectable)

## Not Verified
- Home feed and Shorts player (require logged-in session)
- Fullscreen grid visibility in actual fullscreen
