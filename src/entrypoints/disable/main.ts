/**
 * Nocturne - Dedicated disable window
 * Deliberate, dread-themed step before a manual disable; confronts consecutive disables with a timed lock
 */

import { DISABLE_DEFAULT_MIN, STREAK_WAIT_MAX_SEC, STREAK_WAIT_STEP_SEC } from '../../config';
import {
  clampMinutes,
  disableFor,
  isInSchedule,
  isManuallyDisabled,
  loadRecord,
  nextStreakCount,
} from '../../state';

/** How far the iris may travel from center (SVG units) */
const IRIS_MAX_OFFSET = 7;
/** Cursor distance (px) at which the iris reaches its max offset */
const IRIS_FULL_REACH_PX = 220;

const minutesInput = document.getElementById('minutes') as HTMLInputElement;
const disableBtn = document.getElementById('disable') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;
const noticeEl = document.getElementById('notice')!;
const formView = document.getElementById('form')!;
const confrontView = document.getElementById('confront')!;
const streakCountEl = document.getElementById('streak-count')!;
const walkBtn = document.getElementById('walk') as HTMLButtonElement;
const proceedBtn = document.getElementById('proceed') as HTMLButtonElement;
const eyeEl = document.querySelector('.eye') as SVGSVGElement;
const irisEl = document.getElementById('iris')!;

/**
 * Seconds the proceed button stays locked for the given streak count
 */
function streakWaitSec(count: number): number {
  return Math.min(STREAK_WAIT_STEP_SEC * (count - 1), STREAK_WAIT_MAX_SEC);
}

/**
 * Show the streak confrontation; resolves true to proceed, false to walk away
 */
function confront(count: number): Promise<boolean> {
  streakCountEl.textContent = String(count);
  formView.hidden = true;
  confrontView.hidden = false;
  document.body.classList.add('confront');
  walkBtn.focus();

  let remaining = streakWaitSec(count);
  const label = 'それでも解く';
  proceedBtn.disabled = remaining > 0;
  proceedBtn.textContent = remaining > 0 ? `${label}（${remaining}）` : label;
  const timer = window.setInterval(() => {
    remaining -= 1;
    if (remaining > 0) {
      proceedBtn.textContent = `${label}（${remaining}）`;
      return;
    }
    window.clearInterval(timer);
    proceedBtn.textContent = label;
    proceedBtn.disabled = false;
  }, 1000);

  return new Promise((resolve) => {
    const finish = (proceed: boolean): void => {
      window.clearInterval(timer);
      document.removeEventListener('keydown', onKey);
      resolve(proceed);
    };
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') finish(false);
    };
    document.addEventListener('keydown', onKey);
    walkBtn.addEventListener('click', () => finish(false), { once: true });
    proceedBtn.addEventListener('click', () => finish(true), { once: true });
  });
}

/**
 * Point the iris toward the cursor
 */
function followCursor(event: MouseEvent): void {
  const rect = eyeEl.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height * 0.42);
  const distance = Math.hypot(dx, dy);
  if (distance === 0) return;
  const reach = Math.min(distance / IRIS_FULL_REACH_PX, 1) * IRIS_MAX_OFFSET;
  irisEl.setAttribute('transform', `translate(${((dx / distance) * reach).toFixed(2)} ${((dy / distance) * reach).toFixed(2)})`);
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
 * Disable after the streak confrontation; close the window either way
 */
async function handleDisable(): Promise<void> {
  const minutes = clampMinutes(Number(minutesInput.value));
  minutesInput.value = String(minutes);

  const record = await loadRecord();
  const count = nextStreakCount(record, Date.now());
  if (count >= 2 && !(await confront(count))) {
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
    console.error('[Nocturne] Disable failed:', error);
    disableBtn.disabled = false;
  });
});
cancelBtn.addEventListener('click', () => window.close());
document.addEventListener('mousemove', followCursor);

checkAvailability();
