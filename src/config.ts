/** Storage key for the shared disable record */
export const RECORD_STORAGE_KEY = 'disableRecord';

/** Storage keys left over from the per-tab cooldown era */
export const LEGACY_STORAGE_KEYS = ['cooldownEndTime', 'disableDurationMin'];

/** Manual disable duration limits (minutes) */
export const DISABLE_DEFAULT_MIN = 30;
export const DISABLE_MIN_MIN = 1;
export const DISABLE_MAX_MIN = 120;

/** A disable within this gap after the previous one ended counts as consecutive */
export const STREAK_GAP_MS = 60 * 60 * 1000;

/** Night schedule (local time, minutes from midnight): overlay off from start until end */
export const SCHEDULE_START_MIN = 19 * 60 + 30;
export const SCHEDULE_END_MIN = 5 * 60;

/** How often the content script re-checks expiry and schedule boundaries */
export const REEVALUATE_INTERVAL_MS = 15 * 1000;
