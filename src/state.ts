/**
 * YouTube Overlay - Shared state
 * Single source of truth for manual disable, streak, and night schedule
 */

import {
  DISABLE_DEFAULT_MIN,
  DISABLE_MAX_MIN,
  DISABLE_MIN_MIN,
  RECORD_STORAGE_KEY,
  SCHEDULE_END_MIN,
  SCHEDULE_START_MIN,
  STREAK_GAP_MS,
} from './config';

/** Persisted manual disable record (all times are epoch ms) */
export interface DisableRecord {
  /** End of the current manual disable; 0 when not disabled */
  disabledUntil: number;
  /** When the latest disable ended (or is scheduled to end) */
  lastDisableEnd: number;
  /** Consecutive disable count including the latest one */
  streakCount: number;
}

const EMPTY_RECORD: DisableRecord = { disabledUntil: 0, lastDisableEnd: 0, streakCount: 0 };

/** Read the disable record from storage */
export async function loadRecord(): Promise<DisableRecord> {
  const result = await chrome.storage.local.get(RECORD_STORAGE_KEY);
  const saved = result[RECORD_STORAGE_KEY] as Partial<DisableRecord> | undefined;
  return { ...EMPTY_RECORD, ...saved };
}

/** Write the disable record to storage */
async function saveRecord(record: DisableRecord): Promise<void> {
  await chrome.storage.local.set({ [RECORD_STORAGE_KEY]: record });
}

/** Whether the given local time falls within the night schedule */
export function isInSchedule(now: Date): boolean {
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (SCHEDULE_START_MIN <= SCHEDULE_END_MIN) {
    return minutes >= SCHEDULE_START_MIN && minutes < SCHEDULE_END_MIN;
  }
  return minutes >= SCHEDULE_START_MIN || minutes < SCHEDULE_END_MIN;
}

/** Whether a manual disable is in effect */
export function isManuallyDisabled(record: DisableRecord, nowMs: number): boolean {
  return record.disabledUntil > nowMs;
}

/** Whether the overlay should currently be applied */
export function isOverlayActive(record: DisableRecord, now: Date): boolean {
  return !isInSchedule(now) && !isManuallyDisabled(record, now.getTime());
}

/** Streak number the next disable would get */
export function nextStreakCount(record: DisableRecord, nowMs: number): number {
  const isConsecutive = record.lastDisableEnd > 0 && nowMs - record.lastDisableEnd <= STREAK_GAP_MS;
  return isConsecutive ? record.streakCount + 1 : 1;
}

/** Clamp a minutes value into the allowed disable range */
export function clampMinutes(value: number): number {
  if (!Number.isFinite(value)) return DISABLE_DEFAULT_MIN;
  return Math.max(DISABLE_MIN_MIN, Math.min(DISABLE_MAX_MIN, Math.round(value)));
}

/** Start a manual disable for all tabs */
export async function disableFor(minutes: number): Promise<void> {
  const nowMs = Date.now();
  const record = await loadRecord();
  const until = nowMs + clampMinutes(minutes) * 60 * 1000;
  await saveRecord({ disabledUntil: until, lastDisableEnd: until, streakCount: nextStreakCount(record, nowMs) });
}

/** End the current manual disable immediately */
export async function enableNow(): Promise<void> {
  const nowMs = Date.now();
  const record = await loadRecord();
  if (!isManuallyDisabled(record, nowMs)) return;
  await saveRecord({ ...record, disabledUntil: 0, lastDisableEnd: nowMs });
}

/** Format minutes from midnight as HH:MM */
export function formatClock(minutesFromMidnight: number): string {
  const hours = Math.floor(minutesFromMidnight / 60);
  const minutes = minutesFromMidnight % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

/** Format remaining milliseconds as M:SS */
export function formatRemaining(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
