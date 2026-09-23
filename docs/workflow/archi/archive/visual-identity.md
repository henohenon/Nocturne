# Archi: Visual Identity

## Decisions
- **Icon SVG is the master** — `public/icons/icon.svg`; PNGs are exports. 16px is hand-pixeled (vector downscale blurs the lashes); 128px keeps Chrome's 96px artwork + transparent padding
- **Styles stay inline per page** — popup and disable window keep their own `<style>` blocks; the palette is repeated as CSS custom properties at the top of each (two small pages; a shared stylesheet is not worth the build wiring yet)
- **Mark in pages = inline SVG** — scales crisply, colorable per page (gold in popup, crimson in disable window) without extra assets
- **Mark on YouTube = CSS background data URI** — keeps the overlay CSS-only and avoids web-accessible resources
- **Fonts: system only** — serif stack for the wordmark/headings, system sans for body; no remote fonts (privacy, offline)

- **Night seal lives in the shared record** — an end timestamp (the current night's end) next to the manual disable fields; content scripts already react to that record, so no new listener. "Overlay active" = in schedule ? sealed : not manually disabled
- **Expiry by timestamp, not by reset** — storing the night's end means nothing has to clear it at 05:00

## Trade-offs
- Palette duplicated in three places — acceptable at this size; extract if a third extension page appears
- Gold-tinted skeleton bars on YouTube use alpha so one rule works on both light and dark YouTube themes, at the cost of slightly different contrast per theme

## Execution Record
- Icon: closed-eye crescent from the exploration round "B"; palette and proportions tuned by the user with a slider tool (bg `#0e0e16`, gold `#bc912f`, gold rim). Lash roots sunk into the crescent to remove the notch at the joint. 16px hand-pixeled; 32/48 exported from SVG; 128 with 96px artwork + padding. Manifest gained a 32px entry
- Explored and rejected on the way: cut play button (reads as a swoosh / prohibition sign), scythe (reads as "7" at 16px), moth (reads as a butterfly), eyes on the moon's dark side (strong at 16px, but the user preferred B)
- Popup: header mark + wordmark, gold / bone / muted status colors, night seal switch; active state gained the note 「おすすめ動画を封印中」
- Disable window: hazard tape and blinking sign replaced by a crimson-glowing mark, double gold frame, 「封印を解く」 heading; behavior untouched
- Overlay: blocked thumbnails = ink + gold mark + hairline; hidden text = gold-tinted bar on the string host only (children transparent, so alpha does not stack)
- Night seal stored as `nightSealUntil` in the shared record; `disableFor` now spreads the existing record so the field survives

## Verification
- `tsc --noEmit`, `wxt build` pass
- Harness (built pages served locally, stubbed `chrome` + fake clock): popup active / disabled / night / night sealed, disable window normal / already disabled — screenshots match the mock
- Toggle in the harness: on → record gets the next 05:00, status 「封印中（夜間）」; off → cleared
- Unit (bun): `scheduleEnd` at 21:00 and 02:00 → next 05:00; seal active through 04:59, gone the next night; seal refused in daytime; manual disable keeps the field
- Live YouTube watch page (dark theme, built CSS injected): 17/20 sidebar items blocked, mark and bars render as designed
- Not verified: YouTube light theme on the live page (mock only), real Chrome popup/window chrome
