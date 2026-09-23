/**
 * YouTube Overlay - Dedicated disable window
 * Deliberate, danger-themed step before a manual disable; asks for reflection on consecutive disables
 */

import { DISABLE_DEFAULT_MIN } from '../../config';
import {
  clampMinutes,
  disableFor,
  isInSchedule,
  isManuallyDisabled,
  loadRecord,
  nextStreakCount,
} from '../../state';

const minutesInput = document.getElementById('minutes') as HTMLInputElement;
const disableBtn = document.getElementById('disable') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;
const noticeEl = document.getElementById('notice')!;

/**
 * Build the reflection message shown on consecutive disables
 */
function streakMessage(count: number): string {
  return `これで${count}回連続です。本当に必要ですか？？？\nもし虚ろならば、今すぐ散歩に行きましょう。`;
}

/**
 * Block the disable button when disabling makes no sense right now
 */
async function checkAvailability(): Promise<void> {
  const now = new Date();
  const record = await loadRecord();
  if (isInSchedule(now)) {
    noticeEl.textContent = '夜間モード中のため、すでに無効です。';
    disableBtn.disabled = true;
  } else if (isManuallyDisabled(record, now.getTime())) {
    noticeEl.textContent = 'すでに無効化されています。';
    disableBtn.disabled = true;
  }
}

/**
 * Disable after the streak confirmation; close the window either way
 */
async function handleDisable(): Promise<void> {
  const minutes = clampMinutes(Number(minutesInput.value));
  minutesInput.value = String(minutes);

  const record = await loadRecord();
  const count = nextStreakCount(record, Date.now());
  if (count >= 2 && !window.confirm(streakMessage(count))) {
    window.close();
    return;
  }

  await disableFor(minutes);
  window.close();
}

minutesInput.value = String(DISABLE_DEFAULT_MIN);
minutesInput.addEventListener('change', () => {
  minutesInput.value = String(clampMinutes(Number(minutesInput.value)));
});

disableBtn.addEventListener('click', () => {
  disableBtn.disabled = true;
  handleDisable().catch((error) => {
    console.error('[YT Overlay] Disable failed:', error);
    disableBtn.disabled = false;
  });
});
cancelBtn.addEventListener('click', () => window.close());

checkAvailability();
