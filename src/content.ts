/**
 * YouTube Overlay - Content Script
 * Hides non-music content on YouTube
 * Shows only videos with badges (music, live, mixes)
 */

import overlayStyles from './styles/overlay.css?inline';
import { VIDEO_SELECTORS, DISABLE_DURATION_MS } from './config';
import { debounce } from './utils';
import { processAllVideoElements } from './badge';

// Disable state
let disableTimerId: ReturnType<typeof setTimeout> | null = null;
let disableEndTime: number | null = null;

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
 * Disable the overlay for DISABLE_DURATION_MS, then re-enable automatically
 */
function disableOverlay(): void {
  removeOverlayStyles();
  disableEndTime = Date.now() + DISABLE_DURATION_MS;
  if (disableTimerId) clearTimeout(disableTimerId);
  disableTimerId = setTimeout(() => enableOverlay(), DISABLE_DURATION_MS);
  console.log('[YT Overlay] Disabled for 3 minutes');
}

/**
 * Re-enable the overlay immediately
 */
function enableOverlay(): void {
  if (disableTimerId) {
    clearTimeout(disableTimerId);
    disableTimerId = null;
  }
  disableEndTime = null;
  injectOverlayStyles();
  processAllVideoElements();
  console.log('[YT Overlay] Re-enabled');
}

/**
 * Handle messages from the popup
 */
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_STATE') {
    const remaining = disableEndTime ? Math.max(0, disableEndTime - Date.now()) : 0;
    sendResponse({ disabled: remaining > 0, remainingMs: remaining });
    return true;
  }
  if (message.type === 'DISABLE') {
    disableOverlay();
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'ENABLE') {
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
