# Spec: Visual Identity

## Palette
- Two brand colors from the icon: night black `#0e0e16`, antique gold `#bc912f`
- Supporting tones are tints of these two (text, borders, hover); no new hues
- Exception: crimson is allowed only in the disable window, as the danger signal

## Popup
- Header: the mark + `Nocturne` wordmark
- States unchanged (active / disabled with remaining time + streak / night schedule); each state readable at a glance
- Primary action styled in gold; re-enable is the calm action, disable the ominous one

## Night Seal
- During the night schedule, the popup shows a toggle 「今夜も封印する」
- On: blocking applies in all tabs until the current night ends (05:00), then clears itself
- Off: back to night mode immediately; no friction (night is free time)
- Popup while sealed: status shows the seal is on, note shows until when and that it can be lifted anytime

## Disable Window
- Same palette with a crimson accent; no hazard tape or blinking emoji
- Framing: breaking a seal — the mark is shown, the page glows faintly red, the confirm button is the heaviest element
- Copy, minutes input (default 30, 1–120), cancel, streak dialog: unchanged in behavior

## Blocked Items on YouTube
- Thumbnail placeholder: night black with a small gold mark centered
- Hidden text: low-contrast gold-tinted bars (skeleton look), readable as "blocked" on both YouTube light and dark themes
- Still no JS-side judgment; CSS only

## Acceptance
- No visible `NOCTURNE` / other spellings in UI
- All three surfaces use only the palette above (plus crimson in the disable window)
- Behavior identical to before apart from the night seal (popup states, disable window, blocked items)
- Night seal: toggling reflects in all tabs; expires at the night's end without user action
