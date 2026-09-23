# Archi: CSS `:has()` Overlay

## Decision
Move allow/block judgment from JS (badge scan + `.show` class) into CSS `:not(:has(<allow signals>))`.

## Why
- Applies instantly to lazy-loaded items — no MutationObserver, no flash, no debounce
- All YouTube-specific names live in one stylesheet; allowlist written once via CSS nesting
- Content script shrinks to style injection + disable/cooldown messaging

## Structure
- One blocked-item rule: `:is(<targets>):not(:has(<allow>))`, with nested rules for inner parts
- Inner parts use shared view-model classes (thumbnail image, bottom overlay, attributed string, avatar)
- Player rules stay independent (no allowlist)

## Trade-offs
- Allowlist limited to what CSS can match (class presence); text/locale-based rules not possible — acceptable
- `:has()` cost on large DOM — acceptable for a bounded set of item elements
- Build tooling may lower CSS nesting to flat selectors — equivalent output

## Risks
- Further class renames → edit the stylesheet only

## Execution Record
- Implemented as designed; detection JS (badge scan, MutationObserver, debounce) removed
- **Deviation**: live allowlist needed two signals — thumbnail live badge (`ytBadgeShapeThumbnailLive`) on lockups vs metadata live badge (`ytBadgeShapeLive`) elsewhere. Found during verification; fixed by one allowlist line (validates the single-edit design)
- Shorts item element is `ytm-shorts-lockup-view-model` (the `-v2` tag is a wrapper)
- Build lowers CSS nesting to flat selectors as expected

## Verification (injected build into live YouTube, logged out)
- Search: 10 normal + 4 Shorts blocked (hit-test: clicks do not land), mix clickable
- Watch sidebar after SPA navigation: 72 normal blocked incl. lazy-loaded, 6 live + 3 mix visible and clickable
- Disable removes all effects; auto re-enable restores; cooldown unchanged
- Not verified: home feed, Shorts player (need login)
- Known leftovers: small metadata icons remain visible in blocked items (no content revealed)
