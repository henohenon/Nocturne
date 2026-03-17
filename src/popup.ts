/**
 * YouTube Overlay - Extension Popup
 */

const STORAGE_KEY = 'disableDurationMs';
const DEFAULT_DURATION_MS = 180000;

const statusEl = document.getElementById('status')!;
const toggleBtn = document.getElementById('toggle') as HTMLButtonElement;
const durationSelect = document.getElementById('duration') as HTMLSelectElement;

let countdownInterval: ReturnType<typeof setInterval> | null = null;

/**
 * Get the selected duration in milliseconds
 */
function getSelectedDuration(): number {
  return parseInt(durationSelect.value, 10);
}

/**
 * Format remaining milliseconds as M:SS
 */
function formatTime(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Update UI to reflect disabled state
 */
function setDisabledUI(remainingMs: number): void {
  if (countdownInterval) clearInterval(countdownInterval);

  statusEl.textContent = `無効中 ${formatTime(remainingMs)}`;
  statusEl.className = 'disabled';
  toggleBtn.textContent = '今すぐ再有効化';
  toggleBtn.className = 'active';
  durationSelect.disabled = true;

  const endTime = Date.now() + remainingMs;
  countdownInterval = setInterval(() => {
    const left = endTime - Date.now();
    if (left <= 0) {
      setEnabledUI();
    } else {
      statusEl.textContent = `無効中 ${formatTime(left)}`;
    }
  }, 500);
}

/**
 * Update UI to reflect enabled state
 */
function setEnabledUI(): void {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  statusEl.textContent = '有効';
  statusEl.className = '';
  toggleBtn.textContent = '無効化';
  toggleBtn.className = '';
  durationSelect.disabled = false;
}

/**
 * Send a message to the active tab's content script
 */
async function sendToContentScript(message: Record<string, unknown>): Promise<any> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, message);
  } catch {
    return null;
  }
}

// Restore saved duration preference, then fetch current state
chrome.storage.local.get(STORAGE_KEY, (result) => {
  const saved = result[STORAGE_KEY];
  if (saved && durationSelect.querySelector(`option[value="${saved}"]`)) {
    durationSelect.value = String(saved);
  }
});

sendToContentScript({ type: 'GET_STATE' }).then((state) => {
  if (state?.disabled) {
    setDisabledUI(state.remainingMs);
  } else {
    setEnabledUI();
  }
});

// Persist duration choice on change
durationSelect.addEventListener('change', () => {
  chrome.storage.local.set({ [STORAGE_KEY]: getSelectedDuration() });
});

// Toggle button click
toggleBtn.addEventListener('click', async () => {
  if (toggleBtn.className === 'active') {
    await sendToContentScript({ type: 'ENABLE' });
    setEnabledUI();
  } else {
    const durationMs = getSelectedDuration();
    await sendToContentScript({ type: 'DISABLE', durationMs });
    setDisabledUI(durationMs);
  }
});
