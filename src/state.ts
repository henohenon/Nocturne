/**
 * Nocturne - Shared state
 * Single source of truth for manual disable, streak, night schedule, and night seal
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
  /** End of the current night's voluntary seal; 0 when not sealed */
  nightSealUntil: number;
}

const EMPTY_RECORD: DisableRecord = { disabledUntil: 0, lastDisableEnd: 0, streakCount: 0, nightSealUntil: 0 };

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

/** End of the night schedule period that is in progress (or next ends) after the given time, as epoch ms */
export function scheduleEnd(now: Date): number {
  const end = new Date(now);
  end.setHours(Math.floor(SCHEDULE_END_MIN / 60), SCHEDULE_END_MIN % 60, 0, 0);
  if (end.getTime() <= now.getTime()) end.setDate(end.getDate() + 1);
  return end.getTime();
}

/** Whether a manual disable is in effect */
export function isManuallyDisabled(record: DisableRecord, nowMs: number): boolean {
  return record.disabledUntil > nowMs;
}

/** Whether the user sealed the current night */
export function isNightSealed(record: DisableRecord, nowMs: number): boolean {
  return record.nightSealUntil > nowMs;
}

/** Whether the user broke the seal by hand (manual disable in effect outside the night schedule) */
export function isSealBroken(record: DisableRecord, now: Date): boolean {
  return !isInSchedule(now) && isManuallyDisabled(record, now.getTime());
}

/** Whether the overlay should currently be applied */
export function isOverlayActive(record: DisableRecord, now: Date): boolean {
  if (isInSchedule(now)) return isNightSealed(record, now.getTime());
  return !isManuallyDisabled(record, now.getTime());
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
  await saveRecord({ ...record, disabledUntil: until, lastDisableEnd: until, streakCount: nextStreakCount(record, nowMs) });
}

/** End the current manual disable immediately */
export async function enableNow(): Promise<void> {
  const nowMs = Date.now();
  const record = await loadRecord();
  if (!isManuallyDisabled(record, nowMs)) return;
  await saveRecord({ ...record, disabledUntil: 0, lastDisableEnd: nowMs });
}

/** Seal (or unseal) the rest of the current night for all tabs */
export async function setNightSeal(sealed: boolean): Promise<void> {
  const now = new Date();
  const record = await loadRecord();
  if (sealed && !isInSchedule(now)) return;
  await saveRecord({ ...record, nightSealUntil: sealed ? scheduleEnd(now) : 0 });
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
