# Spec: Disable Flow Redesign

## Allowlist
- Visible: item from an official artist channel (not live), playlist, mix
- Blocked: everything else, including live streams from any channel

## Night Schedule
- Local time 19:30–05:00: overlay off in all tabs, switches automatically at boundaries
- Popup shows schedule state; manual disable not offered

## Manual Disable
- Popup button opens a dedicated small window (danger-themed)
- Window: minutes input (default 30, range 1–120), disable button, cancel
- Disable applies to all YouTube tabs; auto re-enables at expiry
- Popup while disabled: remaining time + "re-enable now"

## Streak Confirmation
- A disable within 60 min after the previous disable ended counts as consecutive (n = previous + 1); otherwise n = 1
- n ≥ 2: after pressing disable, confirm dialog:
  「これでn回連続です。本当に必要ですか？？？\nもし虚ろならば、今すぐ散歩に行きましょう。」
  - OK → disable; Cancel → close the window without disabling

## Removed
- Cooldown (disable lockout after re-enable)
- Per-tab disable state

## Acceptance
- Allowlist behaves as above on live YouTube
- State shared across tabs; survives reloads
- Schedule boundaries switch overlay without reload
- Streak count and dialog behave per rules
