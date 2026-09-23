# Archi: Disable Window Polish

## Decisions
- **Native range input, styled** — keyboard and accessibility for free; the color is a CSS custom property set from script (CSS cannot interpolate multi-stop colors from an input value)
- **Color stops live in the page script** — only this page uses them
- **Slider min = step (5)** — a 0-min disable is meaningless; state's clamp (1–120) stays as the storage-side guard
- **Star eyes: a gold dot hands off to the iris** — the dot sits outside the lids, grows and reddens into the iris while the lids unfold, then hides; the lids can then blink with the real iris clipped inside
- **Blocked text: `user-select: none`** — CSS only, consistent with the allowlist rule; garbling would need JS rewriting YouTube's DOM

## Execution Record
- Slider colors: white 0 → gold 30 → red 90 → blood black 120; past 90 the glow stays bright red so the dark number stays readable; trembles past 100
- Star eyes open together with the main eye (the user rejected a staggered order); all three blink together
- Disable window height 560 → 640 — the slider row made the form overflow
- Toolbar icon: SVG gains the star eyes; 32px exported (Inkscape), 16px hand-pixeled as two red pixels at the stars' spots (an almond cannot fit in 1–3px)

## Verification
- `tsc`, 14 unit tests, `wxt build`
- Built disable page (440×608): gold closed → red open with star eyes, slider at 5 / 30 / 90 / 120, blink frame with all three eyes shut, confront view
- Blocked-text test page with the built CSS: select-all skips the blocked title
- Not verified: live YouTube drag selection, real Chrome window size
