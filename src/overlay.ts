/**
 * Nocturne - Overlay lifecycle shared by the site content scripts
 * Keeps a site stylesheet injected while the seal is active, following shared state (manual disable, night schedule, night seal)
 */

import type { ContentScriptContext } from 'wxt/utils/content-script-context';
import { RECORD_STORAGE_KEY, REEVALUATE_INTERVAL_MS } from './config';
import { isOverlayActive, loadRecord } from './state';

const STYLE_ELEMENT_ID = 'nocturne-styles';

/**
 * Inject the site stylesheet into the page
 */
function injectStyles(css: string): void {
  try {
    if (document.getElementById(STYLE_ELEMENT_ID)) {
      return;
    }

    const styleElement = document.createElement('style');
    styleElement.id = STYLE_ELEMENT_ID;
    styleElement.textContent = css;

    const targetElement = document.head || document.documentElement;
    targetElement.appendChild(styleElement);

    console.log('[Nocturne] Styles injected');
  } catch (error) {
    console.error('[Nocturne] Failed to inject styles:', error);
  }
}

/**
 * Remove the site stylesheet from the page
 */
function removeStyles(): void {
  const el = document.getElementById(STYLE_ELEMENT_ID);
  if (!el) return;
  el.remove();
  console.log('[Nocturne] Styles removed');
}

/**
 * Apply or remove the stylesheet according to stored state and the clock
 */
async function applyState(css: string): Promise<void> {
  try {
    const record = await loadRecord();
    if (isOverlayActive(record, new Date())) {
      injectStyles(css);
    } else {
      removeStyles();
    }
  } catch (error) {
    console.error('[Nocturne] Failed to apply state:', error);
  }
}

/**
 * Start sealing the page with the given stylesheet (fails closed: blocks first, relaxes if state says so)
 */
export function startOverlay(ctx: ContentScriptContext, css: string): void {
  injectStyles(css);
  applyState(css);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && RECORD_STORAGE_KEY in changes) applyState(css);
  });
  ctx.setInterval(() => applyState(css), REEVALUATE_INTERVAL_MS);
}
