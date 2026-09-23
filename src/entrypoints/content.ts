/**
 * Nocturne - Content Script
 * Blocks recommendation items on YouTube
 * Allow/block judgment lives in overlay.css (:has allowlist: artist videos, mixes)
 * On/off follows shared state (manual disable, night schedule) in extension storage
 */

import overlayStyles from '../styles/overlay.css?inline';
import { RECORD_STORAGE_KEY, REEVALUATE_INTERVAL_MS } from '../config';
import { isOverlayActive, loadRecord } from '../state';

/**
 * Inject overlay styles into the page
 */
function injectOverlayStyles(): void {
  try {
    if (document.getElementById('nocturne-styles')) {
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = 'nocturne-styles';
    styleElement.textContent = overlayStyles;

    const targetElement = document.head || document.documentElement;
    targetElement.appendChild(styleElement);

    console.log('[Nocturne] Styles injected');
  } catch (error) {
    console.error('[Nocturne] Failed to inject styles:', error);
  }
}

/**
 * Remove overlay styles from the page
 */
function removeOverlayStyles(): void {
  const el = document.getElementById('nocturne-styles');
  if (!el) return;
  el.remove();
  console.log('[Nocturne] Styles removed');
}

/**
 * Apply or remove the overlay according to stored state and the clock
 */
async function applyState(): Promise<void> {
  try {
    const record = await loadRecord();
    if (isOverlayActive(record, new Date())) {
      injectOverlayStyles();
    } else {
      removeOverlayStyles();
    }
  } catch (error) {
    console.error('[Nocturne] Failed to apply state:', error);
  }
}

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_idle',
  /** Initialize the content script (runtime code must stay inside main; the module is evaluated at build time) */
  main(ctx): void {
    // Fail closed: block first, then relax if state says so
    injectOverlayStyles();
    applyState();

    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName === 'local' && RECORD_STORAGE_KEY in changes) applyState();
    });
    ctx.setInterval(applyState, REEVALUATE_INTERVAL_MS);

    console.log('[Nocturne] Initialized');
  },
});
