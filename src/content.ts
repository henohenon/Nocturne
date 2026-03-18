/**
 * YouTube Overlay - Content Script
 * Hides non-music content on YouTube
 * Shows only videos with badges (music, live, mixes)
 */

import overlayStyles from './styles/overlay.css?inline';
import { VIDEO_SELECTORS } from './config';
import { debounce } from './utils';
import { processAllVideoElements } from './badge';

// Disable state
let disableTimerId: ReturnType<typeof setTimeout> | null = null;
let disableEndTime: number | null = null;

// Cooldown state
const COOLDOWN_STORAGE_KEY = 'cooldownEndTime';
let cooldownTimerId: ReturnType<typeof setTimeout> | null = null;
let cooldownEndTime: number | null = null;
let pendingCooldownMs: number = 0;

/**
 * Inject overlay styles into the page
 */
function injectOverlayStyles(): void {
  try {
    if (document.getElementById('yt-overlay-styles')) {
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'yt-overlay-styles';
    styleElement.textContent = overlayStyles;

    const targetElement = document.head || document.documentElement;
    targetElement.appendChild(styleElement);

    console.log('[YT Overlay] Styles injected');
  } catch (error) {
    console.error('[YT Overlay] Failed to inject styles:', error);
  }
}

/**
 * Remove overlay styles from the page
 */
function removeOverlayStyles(): void {
  const el = document.getElementById('yt-overlay-styles');
  if (el) el.remove();
}

/**
 * Disable the overlay for the given duration, then re-enable automatically
 */
function disableOverlay(durationMs: number): void {
  removeOverlayStyles();
  disableEndTime = Date.now() + durationMs;
  if (disableTimerId) clearTimeout(disableTimerId);
  disableTimerId = setTimeout(() => enableOverlay(), durationMs);
  console.log(`[YT Overlay] Disabled for ${Math.round(durationMs / 1000)}s`);
}

/**
 * Re-enable the overlay and start cooldown
 */
function enableOverlay(): void {
  if (disableTimerId) {
    clearTimeout(disableTimerId);
    disableTimerId = null;
  }
  disableEndTime = null;
  injectOverlayStyles();
  processAllVideoElements();
  if (pendingCooldownMs > 0) startCooldown(pendingCooldownMs);
  console.log('[YT Overlay] Re-enabled');
}

/**
 * Start cooldown period during which disable is blocked
 */
function startCooldown(durationMs: number): void {
  cooldownEndTime = Date.now() + durationMs;
  chrome.storage.local.set({ [COOLDOWN_STORAGE_KEY]: cooldownEndTime });
  if (cooldownTimerId) clearTimeout(cooldownTimerId);
  cooldownTimerId = setTimeout(() => {
    cooldownEndTime = null;
    cooldownTimerId = null;
    chrome.storage.local.remove(COOLDOWN_STORAGE_KEY);
    console.log('[YT Overlay] Cooldown ended');
  }, durationMs);
}

/**
 * Restore cooldown from storage if still active
 */
function restoreCooldown(): void {
  chrome.storage.local.get(COOLDOWN_STORAGE_KEY, (result) => {
    const saved = result[COOLDOWN_STORAGE_KEY] as number | undefined;
    if (!saved) return;
    const remaining = saved - Date.now();
    if (remaining > 0) {
      cooldownEndTime = saved;
      cooldownTimerId = setTimeout(() => {
        cooldownEndTime = null;
        cooldownTimerId = null;
        chrome.storage.local.remove(COOLDOWN_STORAGE_KEY);
        console.log('[YT Overlay] Cooldown ended');
      }, remaining);
      console.log(`[YT Overlay] Cooldown restored, ${Math.round(remaining / 1000)}s remaining`);
    } else {
      chrome.storage.local.remove(COOLDOWN_STORAGE_KEY);
    }
  });
}

/**
 * Handle messages from the popup
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_STATE') {
    const remaining = disableEndTime ? Math.max(0, disableEndTime - Date.now()) : 0;
    const cooldownRemaining = cooldownEndTime ? Math.max(0, cooldownEndTime - Date.now()) : 0;
    sendResponse({ disabled: remaining > 0, remainingMs: remaining, cooldown: cooldownRemaining > 0, cooldownMs: cooldownRemaining });
    return true;
  }
  if (message.type === 'DISABLE') {
    if (cooldownEndTime && cooldownEndTime > Date.now()) {
      const cooldownRemaining = Math.max(0, cooldownEndTime - Date.now());
      sendResponse({ ok: false, cooldown: true, cooldownMs: cooldownRemaining });
      return true;
    }
    pendingCooldownMs = message.cooldownMs || 0;
    disableOverlay(message.durationMs);
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'ENABLE') {
    pendingCooldownMs = message.cooldownMs || 0;
    enableOverlay();
    sendResponse({ ok: true });
    return true;
  }
});

/**
 * Setup MutationObserver to watch for dynamic content
 */
function setupMutationObserver(): void {
  const debouncedProcess = debounce(processAllVideoElements, 300);

  const observer = new MutationObserver((mutations) => {
    let shouldProcess = false;

    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldProcess = true;
        break;
      }

      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        const target = mutation.target as Element;
        if (target.matches && VIDEO_SELECTORS.some(sel => target.matches(sel) || target.closest(sel))) {
          shouldProcess = true;
          break;
        }
      }
    }

    if (shouldProcess) {
      debouncedProcess();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
  });

  console.log('[YT Overlay] MutationObserver active');
}

/**
 * Initialize the content script
 */
function init(): void {
  injectOverlayStyles();
  restoreCooldown();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupMutationObserver();
    });
  } else {
    setupMutationObserver();
  }

  console.log('[YT Overlay] Initialized');
}

// Run initialization
init();
