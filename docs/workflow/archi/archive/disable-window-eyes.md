# Archi: Disable Window Eyes

## Decisions
- **Lid = path morph (CSS `d`)** — the opening, its clip and the lid band share one control point, so they move as one; Chrome-only is fine for an extension page
- **Stars blink by scaling the red dot to zero height** — cheap and reads as a blink at this size
- **Dread state lives on `<body>`** (`--k`, `--wide`, `--beat`, classes `dread` / `flicker` / `max`); CSS does the effects, script only sets values and pupil shapes
- **Stop blinking by re-declaring the animation list without the blink** — keeping the finished open animation by name leaves the lid open (pausing could freeze it mid-blink)
- **One source of dread** — the slider (form) or the proceed button (confrontation) feeds the same state; the eyes always follow the cursor (staring at the slider thumb was tried and dropped)
- **Top color = bright crimson** (not blood black): the danger is carried by the effects, the number stays readable

## Process
- Four mock rounds (almond eyes → eyeballs → flat black+red R1; three lid motions → L1; three dread treatments → glitch + room)

## Verification
- `tsc`, 14 unit tests, `wxt build`
- Built page (440×608): gold → red open, dots follow from their own spots, 120 min (no blink animations, slit pupils, glitch, caption, scanlines), confront view
- Not verified: real Chrome window
