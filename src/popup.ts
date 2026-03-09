/**
 * YouTube Overlay - Extension Popup
 */

const DISABLE_DURATION_MS = 3 * 60 * 1000;

const statusEl = document.getElementById('status')!;
const toggleBtn = document.getElementById('toggle') as HTMLButtonElement;

let countdownInterval: ReturnType<typeof setInterval> | null = null;

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
 * Update UI to reflect current state
 */
function setDisabledUI(remainingMs: number): void {
  if (countdownInterval) clearInterval(countdownInterval);

  statusEl.textContent = `無効中 ${formatTime(remainingMs)}`;
  statusEl.className = 'disabled';
  toggleBtn.textContent = '今すぐ再有効化';
  toggleBtn.className = 'active';

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

function setEnabledUI(): void {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  statusEl.textContent = '有効';
  statusEl.className = '';
  toggleBtn.textContent = '3分間 無効化';
  toggleBtn.className = '';
}

/**
 * Send a message to the active tab's content script
 */
async function sendToContentScript(message: { type: string }): Promise<any> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return null;
  try {
    return await chrome.tabs.sendMessage(tab.id, message);
  } catch {
    return null;
  }
}

// On popup open: fetch current state from content script
sendToContentScript({ type: 'GET_STATE' }).then((state) => {
  if (state?.disabled) {
    setDisabledUI(state.remainingMs);
  } else {
    setEnabledUI();
  }
});

// Toggle button click
toggleBtn.addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  if (toggleBtn.className === 'active') {
    // Currently disabled → enable
    await chrome.tabs.sendMessage(tab.id, { type: 'ENABLE' });
    setEnabledUI();
  } else {
    // Currently enabled → disable
    await chrome.tabs.sendMessage(tab.id, { type: 'DISABLE' });
    setDisabledUI(DISABLE_DURATION_MS);
  }
});
