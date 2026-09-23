# Archi: Disable Flow Redesign

## Decisions
- **Single source of truth in extension storage** — disable end time and streak record; content scripts derive "overlay active" from storage + clock. Replaces popup→tab messaging (which targeted only the active tab and broke with a separate window)
- **Content script re-evaluates** on storage change and on a short interval — covers expiry and schedule boundaries (incl. sleep/wake) without alarms or a background worker
- **Shared state module** used by content script, popup, and disable window — one place for keys, limits, schedule, streak rule
- **Dedicated window** = extension page opened as a popup-type window; native confirm dialog for the streak prompt
- **Allowlist in CSS**: block unless (playlist/mix) or (artist icon and not live). Artist detected by the metadata icon's accessible label (ja/en) — the icon class is shared with the verified badge

## Trade-offs
- Artist label is locale-dependent — supports ja/en only; acceptable for a personal tool
- Interval polling (seconds granularity) — negligible cost, simpler than alarms
- "Official artist" ≈ music; artist non-music uploads also pass — acceptable

## Execution Record
- Shared state module + config constants; content script derives on/off from storage (change event + 15 s tick, WXT ctx interval)
- Popup → popup-type window (`disable.html`); streak confirm via native dialog
- Messaging, cooldown, `tabs` permission removed; legacy storage keys cleaned on popup open
- CSS minifier rewrites the quoted ja label as an escaped identifier — equivalent, verified on live DOM
- **Found during verification**: top-left "new" thumbnail badge (`ytThumbnailOverlayBadgeViewModelHost`) leaked on blocked items — added to hidden parts

## Verification
- Live YouTube (injected built CSS): artist 16 visible, mix 1 visible, artist+live 1 / live 9 / normal 53 blocked
- Harness (stubbed storage shared across pages, fake clock):
  - Manual disable reflects immediately in another tab; expiry re-applies within one tick (≤15 s)
  - Schedule boundaries 19:30 (on→off) and 05:00 (off→on) switch without reload
  - Popup states (active / disabled with remaining + streak / night) and actions
  - Disable window: default 30, clamp 1–120, blocked when already disabled
  - Streak: 1st no dialog; 2nd dialog text exact; Cancel closes without disabling; OK disables (n=2); natural expiry + 10 min → n=3; 61 min gap → n=1
- Not verified: real Chrome window/confirm rendering
