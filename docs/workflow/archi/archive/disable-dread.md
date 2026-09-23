# Archi: Disable Dread

## Decisions
- **Open eye is a separate inline SVG** in the disable page; the closed mark crossfades into it with CSS animation (no JS timing)
- **Cursor tracking in the page script** — pupil group translated toward the cursor, clamped to a small radius; purely cosmetic, no state
- **Streak overlay = in-page modal** returning a promise (proceed / cancel) — replaces `window.confirm` with the same call site shape; countdown uses a timer and re-enables the proceed button
- **Overlay gray = token swap only** in overlay.css; selectors and structure untouched

## Execution Record
- Open eye built on the icon: the crescent + lashes stay as the lower lid; an upper lid, dark sclera, and a glowing red iris with a pinpoint pupil open above it. Explored first with lashes on the upper lid — read as a cute cliché, dropped
- Eye animation: open once (scaleY from the lid line), then a blink every 7 s on a nested group so the two transforms don't fight
- Heartbeat keyframes (lub-dub) replace the steady throb; faster during the confrontation
- Confrontation is a view swap inside the window (form ↔ confront) with the eye kept and enlarged, rather than a layered modal
- Wait constants live in config (`STREAK_WAIT_STEP_SEC`, `STREAK_WAIT_MAX_SEC`)
- Overlay: gold/ink tokens replaced by gray tokens; hairline outline dropped (gray separates from both YouTube themes on its own)

## Verification
- `tsc --noEmit`, `wxt build` pass
- Harness (built page, stubbed `chrome` + fake clock), 440×530 viewport: eye opens, iris offset follows the cursor (e.g. `translate(6.36 -1.27)` toward the top-right)
- Streak n=4: count 4 shown, proceed locked with countdown from 9; n=2: locked 3 s, click while locked ignored, unlock → disable 30 min, streak 2, window closed
- Esc → window closed, record untouched; first disable (n=1) → no confrontation, disabled directly
- Live YouTube watch page (dark), built CSS injected: 16/20 sidebar items blocked, gray thumbnails with the mark, gray text bars
- Not verified: YouTube light theme on the live page, real Chrome popup window
