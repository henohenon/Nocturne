/**
 * Nocturne - Background service worker
 * Shows the open-eye toolbar icon while the seal is broken by hand; back to the closed eye on expiry or re-enable
 */

import { RECORD_STORAGE_KEY } from '../config';
import { isSealBroken, loadRecord } from '../state';

/** Fires when the current manual disable ends */
const EXPIRY_ALARM = 'nocturne-expiry';

/** Periodic re-check (covers the night schedule starting mid-disable) */
const REFRESH_ALARM = 'nocturne-refresh';
const REFRESH_PERIOD_MIN = 1;

const SEALED_ICON = { 16: '/icons/icon16.png', 32: '/icons/icon32.png' };
const BROKEN_ICON = { 16: '/icons/icon-open16.png', 32: '/icons/icon-open32.png' };

/**
 * Match the toolbar icon to the current state and schedule the next change
 */
async function updateIcon(): Promise<void> {
  try {
    const record = await loadRecord();
    const broken = isSealBroken(record, new Date());
    await chrome.action.setIcon({ path: broken ? BROKEN_ICON : SEALED_ICON });
    if (broken) {
      await chrome.alarms.create(EXPIRY_ALARM, { when: record.disabledUntil });
    } else {
      await chrome.alarms.clear(EXPIRY_ALARM);
    }
  } catch (error) {
    console.error('[Nocturne] Failed to update icon:', error);
  }
}

export default defineBackground(() => {
  chrome.runtime.onStartup.addListener(updateIcon);
  chrome.runtime.onInstalled.addListener(updateIcon);
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && RECORD_STORAGE_KEY in changes) updateIcon();
  });
  chrome.alarms.onAlarm.addListener(updateIcon);
  chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: REFRESH_PERIOD_MIN });
  updateIcon();
});
