# Archi: Open-Eye Toolbar Icon

## Decisions
- **Background service worker** owns the icon — popup and pages are not always open when a disable expires
- **Triggers**: storage change (disable / re-enable), a one-shot alarm at the disable's end, a 1-minute periodic alarm for the night boundary; `alarms` permission added (no install warning)
- **Rule lives in shared state** (`isSealBroken`) so it is unit-tested with the rest

## Verification
- `tsc`, 14 unit tests (incl. open eye during a day disable, closed after expiry, closed once night starts mid-disable), `wxt build` (manifest: `storage`, `alarms`, `background.service_worker`)
- Not verified: the live icon swap in Chrome — it only shows outside the night schedule, and work ended at night
