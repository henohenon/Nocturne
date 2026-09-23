# Spec: Disable Dread

## Disable Window
- On open, the closed-eye mark opens into a staring eye (red iris, pinpoint pupil)
- The pupil follows the mouse cursor
- Background pulse follows a heartbeat rhythm

## Streak Confrontation (replaces the native confirm)
- Trigger unchanged: n ≥ 2 consecutive disables
- Full-window overlay inside the disable window: the count, 「本当に必要ですか？？？」, 「もし虚ろならば、今すぐ散歩に行きましょう。」
- Actions: 「散歩に行く」 (closes the window, no disable) and 「それでも解く」 (disables)
- 「それでも解く」 is locked for a countdown: 3 s × (n − 1), max 15 s; the remaining seconds are shown on the button
- Esc = 散歩に行く

## Blocked Items on YouTube
- Thumbnails and avatars: neutral gray, mark in a slightly lighter gray
- Hidden text: gray bars; works on YouTube light and dark themes

## Acceptance
- Eye opens once per window open; pupil tracks the cursor
- Streak overlay: count shown, countdown per n, cancel closes without disabling, proceed disables
- No native dialogs remain
