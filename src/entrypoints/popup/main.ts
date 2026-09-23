/**
 * Nocturne - Extension Popup
 * Shows current state; opens the dedicated disable window or re-enables
 */

import { LEGACY_STORAGE_KEYS, SCHEDULE_END_MIN, SCHEDULE_START_MIN } from '../../config';
import {
  enableNow,
  formatClock,
  formatRemaining,
  isInSchedule,
  isManuallyDisabled,
  loadRecord,
} from '../../state';

const RENDER_INTERVAL_MS = 500;
const DISABLE_WINDOW_WIDTH = 440;
const DISABLE_WINDOW_HEIGHT = 560;

const statusEl = document.getElementById('status')!;
const noteEl = document.getElementById('note')!;
const actionBtn = document.getElementById('action') as HTMLButtonElement;

type Mode = 'active' | 'disabled' | 'schedule';
let mode: Mode = 'active';

/**
 * Render the popup from stored state and the clock
 */
async function render(): Promise<void> {
  const now = new Date();
  const record = await loadRecord();

  if (isInSchedule(now)) {
    mode = 'schedule';
    statusEl.textContent = '夜間モード（無効）';
    statusEl.className = 'off';
    noteEl.textContent = `${formatClock(SCHEDULE_START_MIN)}〜${formatClock(SCHEDULE_END_MIN)} は自動で無効`;
    actionBtn.hidden = true;
  } else if (isManuallyDisabled(record, now.getTime())) {
    mode = 'disabled';
    statusEl.textContent = `無効中 ${formatRemaining(record.disabledUntil - now.getTime())}`;
    statusEl.className = 'off';
    noteEl.textContent = `連続 ${record.streakCount} 回目`;
    actionBtn.hidden = false;
    actionBtn.textContent = '今すぐ再有効化';
    actionBtn.className = 'enable';
  } else {
    mode = 'active';
    statusEl.textContent = '有効';
    statusEl.className = '';
    noteEl.textContent = '';
    actionBtn.hidden = false;
    actionBtn.textContent = '無効化…';
    actionBtn.className = 'danger';
  }
}

/**
 * Open the dedicated disable window and close the popup
 */
async function openDisableWindow(): Promise<void> {
  await chrome.windows.create({
    url: chrome.runtime.getURL('/disable.html'),
    type: 'popup',
    width: DISABLE_WINDOW_WIDTH,
    height: DISABLE_WINDOW_HEIGHT,
  });
  window.close();
}

actionBtn.addEventListener('click', async () => {
  try {
    if (mode === 'disabled') {
      await enableNow();
      await render();
    } else if (mode === 'active') {
      await openDisableWindow();
    }
  } catch (error) {
    console.error('[Nocturne] Popup action failed:', error);
  }
});

chrome.storage.local.remove(LEGACY_STORAGE_KEYS);
render();
setInterval(render, RENDER_INTERVAL_MS);
