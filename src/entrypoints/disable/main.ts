/**
 * Nocturne - Dedicated disable window
 * Deliberate, dread-themed step before a manual disable; confronts consecutive disables with a timed lock
 */

import {
  DISABLE_DEFAULT_MIN,
  DISABLE_MAX_MIN,
  DISABLE_STEP_MIN,
  STREAK_WAIT_MAX_SEC,
  STREAK_WAIT_STEP_SEC,
} from '../../config';
import {
  clampMinutes,
  disableFor,
  isInSchedule,
  isManuallyDisabled,
  loadRecord,
  nextStreakCount,
} from '../../state';

/** Cursor distance (px) at which each iris reaches its max offset (its data-reach, SVG units) */
const IRIS_FULL_REACH_PX = 220;

/** Slider color by minutes: white -> gold -> red -> blood black */
const DURATION_COLOR_STOPS: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
  [0, [244, 239, 228]],
  [30, [188, 145, 47]],
  [90, [255, 42, 61]],
  [120, [110, 0, 22]],
];
/** Past this, the color is too dark to glow in itself; glow in bright red instead */
const DURATION_GLOW_SWITCH_MIN = 90;
const DURATION_GLOW_DARK: readonly [number, number, number] = [255, 42, 61];
/** Past this, the number trembles */
const DURATION_DREAD_MIN = 100;

const minutesInput = document.getElementById('minutes') as HTMLInputElement;
const minutesView = document.getElementById('minutes-view')!;
const minutesValue = document.getElementById('minutes-value')!;
const disableBtn = document.getElementById('disable') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancel') as HTMLButtonElement;
const noticeEl = document.getElementById('notice')!;
const formView = document.getElementById('form')!;
const confrontView = document.getElementById('confront')!;
const streakCountEl = document.getElementById('streak-count')!;
const walkBtn = document.getElementById('walk') as HTMLButtonElement;
const proceedBtn = document.getElementById('proceed') as HTMLButtonElement;
const eyeEl = document.querySelector('.eye') as SVGSVGElement;
const irisEls = Array.from(document.querySelectorAll<SVGGElement>('.iris'));

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
 * Point every iris toward the cursor
 */
function followCursor(event: MouseEvent): void {
  const rect = eyeEl.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height * 0.42);
  const distance = Math.hypot(dx, dy);
  if (distance === 0) return;
  const pull = Math.min(distance / IRIS_FULL_REACH_PX, 1) / distance;
  for (const iris of irisEls) {
    const reach = Number(iris.dataset.reach) * pull;
    iris.setAttribute('transform', `translate(${(dx * reach).toFixed(2)} ${(dy * reach).toFixed(2)})`);
  }
}

/**
 * Slider color at the given minutes, interpolated between the stops
 */
function durationColor(minutes: number): readonly [number, number, number] {
  let [fromMin, from] = DURATION_COLOR_STOPS[0]!;
  for (const [toMin, to] of DURATION_COLOR_STOPS) {
    if (minutes <= toMin) {
      const t = toMin === fromMin ? 1 : (minutes - fromMin) / (toMin - fromMin);
      return [0, 1, 2].map((c) => Math.round(from[c]! + (to[c]! - from[c]!) * t)) as [number, number, number];
    }
    [fromMin, from] = [toMin, to];
  }
  return from;
}

/**
 * Show the slider's minutes and paint number, fill and thumb in its color
 */
function renderDuration(): void {
  const minutes = Number(minutesInput.value);
  const color = durationColor(minutes);
  const glow = minutes > DURATION_GLOW_SWITCH_MIN ? DURATION_GLOW_DARK : color;
  const fill = (minutes - DISABLE_STEP_MIN) / (DISABLE_MAX_MIN - DISABLE_STEP_MIN);
  for (const el of [minutesInput, minutesView]) {
    el.style.setProperty('--c', `rgb(${color.join(' ')})`);
    el.style.setProperty('--g', `rgb(${glow.join(' ')})`);
    el.style.setProperty('--t', String(minutes / DISABLE_MAX_MIN));
    el.style.setProperty('--p', `${fill * 100}%`);
  }
  minutesView.classList.toggle('dread', minutes > DURATION_DREAD_MIN);
  minutesValue.textContent = String(minutes);
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

  const record = await loadRecord();
  const count = nextStreakCount(record, Date.now());
  if (count >= 2 && !(await confront(count))) {
    window.close();
    return;
  }

  await disableFor(minutes);
  window.close();
}

minutesInput.min = String(DISABLE_STEP_MIN);
minutesInput.max = String(DISABLE_MAX_MIN);
minutesInput.step = String(DISABLE_STEP_MIN);
minutesInput.value = String(DISABLE_DEFAULT_MIN);
minutesInput.addEventListener('input', renderDuration);
renderDuration();

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
