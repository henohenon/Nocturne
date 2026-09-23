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

/** Slider color by minutes: white -> gold -> red -> deep crimson */
const DURATION_COLOR_STOPS: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
  [0, [244, 239, 228]],
  [30, [188, 145, 47]],
  [90, [255, 42, 61]],
  [120, [200, 0, 32]],
];
/** Dread zone: past this the number breaks, the room closes in, the eyes widen and stop blinking */
const DREAD_FROM_MIN = 90;
const DREAD_GLOW: readonly [number, number, number] = [255, 42, 61];
/** Pupils start to slit from here, fully slit at the max */
const SLIT_FROM_MIN = 60;
/** How much wider the eyes open at the max */
const DREAD_WIDEN = 0.18;
/** Heartbeat period (s) at 0 min and how much faster it gets at the max */
const BEAT_BASE_SEC = 1.6;
const BEAT_SPEEDUP_SEC = 1.15;
/** Glitch flicker starts once this far into the dread zone (0-1) */
const FLICKER_FROM_K = 0.3;
/** Caption under the number, by the highest minutes it applies to */
const DURATION_CAPTIONS: ReadonlyArray<readonly [number, string]> = [
  [60, '分だけ無効化'],
  [90, '分も無効化'],
  [119, '分も……？'],
  [120, '分。本気？'],
];

const minutesInput = document.getElementById('minutes') as HTMLInputElement;
const minutesValue = document.getElementById('minutes-value')!;
const minutesCaption = document.getElementById('minutes-caption')!;
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
const pupilEls = Array.from(document.querySelectorAll<SVGEllipseElement>('.pupil'));

/** Last cursor position; the eyes look here unless they stare at the slider */
let pointer: readonly [number, number] = [window.innerWidth / 2, window.innerHeight / 2];
/** True while the slider is being dragged */
let dragging = false;

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
  document.body.classList.remove('max');
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
 * Screen position of the slider thumb
 */
function thumbPosition(): readonly [number, number] {
  const rect = minutesInput.getBoundingClientRect();
  const fill = (Number(minutesInput.value) - DISABLE_STEP_MIN) / (DISABLE_MAX_MIN - DISABLE_STEP_MIN);
  return [rect.left + 7 + fill * (rect.width - 14), rect.top + rect.height / 2];
}

/**
 * Point every iris, each from its own resting spot, at the cursor - or at the slider thumb while it is dragged or in the dread zone
 */
function look(): void {
  const staring = !formView.hidden && (dragging || Number(minutesInput.value) > DREAD_FROM_MIN);
  const [tx, ty] = staring ? thumbPosition() : pointer;
  const ctm = eyeEl.getScreenCTM();
  if (!ctm) return;
  for (const iris of irisEls) {
    const origin = new DOMPoint(Number(iris.dataset.cx), Number(iris.dataset.cy)).matrixTransform(ctm);
    const dx = tx - origin.x;
    const dy = ty - origin.y;
    const distance = Math.hypot(dx, dy);
    if (distance === 0) continue;
    const reach = (Math.min(distance / IRIS_FULL_REACH_PX, 1) * Number(iris.dataset.reach)) / distance;
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
 * Show the slider's minutes: one color for number, fill and thumb; past the dread line the number breaks and the room closes in
 */
function renderDuration(): void {
  const minutes = Number(minutesInput.value);
  const color = durationColor(minutes);
  const glow = minutes > DREAD_FROM_MIN ? DREAD_GLOW : color;
  const fill = (minutes - DISABLE_STEP_MIN) / (DISABLE_MAX_MIN - DISABLE_STEP_MIN);
  const dread = Math.max(0, (minutes - DREAD_FROM_MIN) / (DISABLE_MAX_MIN - DREAD_FROM_MIN));
  const slit = Math.max(0, (minutes - SLIT_FROM_MIN) / (DISABLE_MAX_MIN - SLIT_FROM_MIN));
  const body = document.body;
  body.style.setProperty('--c', `rgb(${color.join(' ')})`);
  body.style.setProperty('--g', `rgb(${glow.join(' ')})`);
  body.style.setProperty('--t', String(minutes / DISABLE_MAX_MIN));
  body.style.setProperty('--p', `${fill * 100}%`);
  body.style.setProperty('--k', String(dread));
  body.style.setProperty('--wide', String(1 + DREAD_WIDEN * dread));
  body.style.setProperty('--beat', `${BEAT_BASE_SEC - BEAT_SPEEDUP_SEC * (minutes / DISABLE_MAX_MIN)}s`);
  body.classList.toggle('dread', dread > 0);
  body.classList.toggle('flicker', dread > FLICKER_FROM_K);
  body.classList.toggle('max', minutes >= DISABLE_MAX_MIN);
  for (const pupil of pupilEls) {
    const r = Number(pupil.dataset.r);
    const [rxAtSlit, ryAtSlit] = (pupil.dataset.slit ?? '1 1').split(' ').map(Number) as [number, number];
    pupil.setAttribute('rx', (r * (1 + (rxAtSlit - 1) * slit)).toFixed(2));
    pupil.setAttribute('ry', (r * (1 + (ryAtSlit - 1) * slit)).toFixed(2));
  }
  minutesValue.textContent = String(minutes);
  minutesValue.dataset.text = String(minutes);
  minutesCaption.textContent = DURATION_CAPTIONS.find(([upTo]) => minutes <= upTo)?.[1] ?? '';
  look();
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
minutesInput.addEventListener('pointerdown', () => { dragging = true; look(); });
window.addEventListener('pointerup', () => { dragging = false; look(); });
renderDuration();

disableBtn.addEventListener('click', () => {
  disableBtn.disabled = true;
  handleDisable().catch((error) => {
    console.error('[Nocturne] Disable failed:', error);
    disableBtn.disabled = false;
  });
});
cancelBtn.addEventListener('click', () => window.close());
document.addEventListener('mousemove', (event) => {
  pointer = [event.clientX, event.clientY];
  look();
});

checkAvailability();
