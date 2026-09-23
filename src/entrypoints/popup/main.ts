/**
 * Nocturne - Extension Popup
 * Shows current state; opens the dedicated disable window, re-enables, or toggles the night seal
 */

import { LEGACY_STORAGE_KEYS, SCHEDULE_END_MIN, SCHEDULE_START_MIN } from '../../config';
import {
  enableNow,
  formatClock,
  formatRemaining,
  isInSchedule,
  isManuallyDisabled,
  isNightSealed,
  loadRecord,
  setNightSeal,
} from '../../state';

const RENDER_INTERVAL_MS = 500;
const DISABLE_WINDOW_WIDTH = 440;
const DISABLE_WINDOW_HEIGHT = 560;

const statusEl = document.getElementById('status')!;
const noteEl = document.getElementById('note')!;
const actionBtn = document.getElementById('action') as HTMLButtonElement;
const sealRow = document.getElementById('seal-row')!;
const sealInput = document.getElementById('seal') as HTMLInputElement;

type Mode = 'active' | 'disabled' | 'schedule';
let mode: Mode = 'active';

/**
 * Show a status label, optionally followed by a time value
 */
function setStatus(label: string, className: string, time?: string): void {
  const nodes: (string | Node)[] = [label];
  if (time) {
    const timeEl = document.createElement('span');
    timeEl.className = 'time';
    timeEl.textContent = time;
    nodes.push(timeEl);
  }
  statusEl.replaceChildren(...nodes);
  statusEl.className = className;
}

/**
 * Render the popup from stored state and the clock
 */
async function render(): Promise<void> {
  const now = new Date();
  const record = await loadRecord();

  if (isInSchedule(now)) {
    mode = 'schedule';
    const sealed = isNightSealed(record, now.getTime());
    if (sealed) {
      setStatus('封印中（夜間）', '');
      noteEl.textContent = `${formatClock(SCHEDULE_END_MIN)} まで。いつでも解除できます`;
    } else {
      setStatus('夜間モード（無効）', 'night');
      noteEl.textContent = `${formatClock(SCHEDULE_START_MIN)}〜${formatClock(SCHEDULE_END_MIN)} は自動で無効`;
    }
    sealRow.hidden = false;
    sealInput.checked = sealed;
    actionBtn.hidden = true;
  } else if (isManuallyDisabled(record, now.getTime())) {
    mode = 'disabled';
    setStatus('無効中', 'off', formatRemaining(record.disabledUntil - now.getTime()));
    noteEl.textContent = `連続 ${record.streakCount} 回目`;
    sealRow.hidden = true;
    actionBtn.hidden = false;
    actionBtn.textContent = '今すぐ再有効化';
    actionBtn.className = 'enable';
  } else {
    mode = 'active';
    setStatus('有効', '');
    noteEl.textContent = 'おすすめ動画を封印中';
    sealRow.hidden = true;
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

sealInput.addEventListener('change', async () => {
  try {
    await setNightSeal(sealInput.checked);
    await render();
  } catch (error) {
    console.error('[Nocturne] Night seal toggle failed:', error);
  }
});

chrome.storage.local.remove(LEGACY_STORAGE_KEYS);
render();
setInterval(render, RENDER_INTERVAL_MS);
