/**
 * Nocturne - Shared state tests
 * Covers manual disable, streak, night schedule, and night seal against a stubbed chrome.storage and a fixed clock
 */

import { afterEach, beforeEach, describe, expect, setSystemTime, test } from 'bun:test';
import { RECORD_STORAGE_KEY } from '../src/config';
import {
  clampMinutes,
  disableFor,
  enableNow,
  isInSchedule,
  isOverlayActive,
  loadRecord,
  nextStreakCount,
  scheduleEnd,
  setNightSeal,
} from '../src/state';

const MINUTE_MS = 60 * 1000;

let store: Record<string, unknown> = {};

/** Install an in-memory chrome.storage.local */
function installChromeStub(): void {
  (globalThis as unknown as { chrome: unknown }).chrome = {
    storage: {
      local: {
        get: async (key: string): Promise<Record<string, unknown>> => ({ [key]: store[key] }),
        set: async (items: Record<string, unknown>): Promise<void> => {
          Object.assign(store, items);
        },
      },
    },
  };
}

/** Freeze the clock at a local time */
function at(localIso: string): void {
  setSystemTime(new Date(localIso));
}

beforeEach(() => {
  store = {};
  installChromeStub();
});

afterEach(() => {
  setSystemTime();
});

describe('night schedule', () => {
  test('19:30 to 05:00 is night', () => {
    expect(isInSchedule(new Date('2026-09-23T19:29:00'))).toBe(false);
    expect(isInSchedule(new Date('2026-09-23T19:30:00'))).toBe(true);
    expect(isInSchedule(new Date('2026-09-24T04:59:00'))).toBe(true);
    expect(isInSchedule(new Date('2026-09-24T05:00:00'))).toBe(false);
  });

  test('scheduleEnd is the next 05:00', () => {
    const fromEvening = new Date(scheduleEnd(new Date('2026-09-23T21:00:00')));
    const fromLateNight = new Date(scheduleEnd(new Date('2026-09-24T02:00:00')));
    for (const end of [fromEvening, fromLateNight]) {
      expect([end.getDate(), end.getHours(), end.getMinutes()]).toEqual([24, 5, 0]);
    }
  });
});

describe('manual disable', () => {
  test('clampMinutes keeps 1 to 120 and falls back to the default', () => {
    expect(clampMinutes(0)).toBe(1);
    expect(clampMinutes(500)).toBe(120);
    expect(clampMinutes(12.4)).toBe(12);
    expect(clampMinutes(Number.NaN)).toBe(30);
  });

  test('disable then re-enable during the day', async () => {
    at('2026-09-23T14:00:00');
    await disableFor(10);
    expect(isOverlayActive(await loadRecord(), new Date())).toBe(false);
    await enableNow();
    expect(isOverlayActive(await loadRecord(), new Date())).toBe(true);
  });

  test('disable expires on its own', async () => {
    at('2026-09-23T14:00:00');
    await disableFor(10);
    const record = await loadRecord();
    at('2026-09-23T14:10:01');
    expect(isOverlayActive(record, new Date())).toBe(true);
  });
});

describe('streak', () => {
  test('within 60 minutes of the last end counts as consecutive', async () => {
    at('2026-09-23T14:00:00');
    expect(nextStreakCount(await loadRecord(), Date.now())).toBe(1);
    await disableFor(10);
    at('2026-09-23T15:10:00');
    expect(nextStreakCount(await loadRecord(), Date.now())).toBe(2);
  });

  test('a gap over 60 minutes resets the streak', async () => {
    at('2026-09-23T14:00:00');
    await disableFor(10);
    at('2026-09-23T15:11:00');
    expect(nextStreakCount(await loadRecord(), Date.now())).toBe(1);
  });
});

describe('night seal', () => {
  test('seals the night until 05:00 and can be lifted', async () => {
    at('2026-09-23T21:00:00');
    expect(isOverlayActive(await loadRecord(), new Date())).toBe(false);
    await setNightSeal(true);
    const sealed = await loadRecord();
    expect(isOverlayActive(sealed, new Date())).toBe(true);
    at('2026-09-24T04:59:00');
    expect(isOverlayActive(sealed, new Date())).toBe(true);
    at('2026-09-24T21:00:00');
    expect(isOverlayActive(sealed, new Date())).toBe(false);
    await setNightSeal(true);
    await setNightSeal(false);
    expect(isOverlayActive(await loadRecord(), new Date())).toBe(false);
  });

  test('ignored during the day; manual disable keeps the field', async () => {
    at('2026-09-23T14:00:00');
    await setNightSeal(true);
    expect((await loadRecord()).nightSealUntil).toBe(0);
    store[RECORD_STORAGE_KEY] = { nightSealUntil: 123 };
    await disableFor(5);
    expect((await loadRecord()).nightSealUntil).toBe(123);
  });
});
