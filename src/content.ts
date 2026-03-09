/**
 * YouTube Overlay - Content Script
 * Hides non-music content on YouTube
 * Shows only videos with badges (music, live, mixes)
 */

import overlayStyles from './styles/overlay.css?inline';
import { VIDEO_SELECTORS } from './config';
import { debounce } from './utils';
import { processAllVideoElements } from './badge';

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

  const targetNode = document.body;
  observer.observe(targetNode, {
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
  // Inject styles immediately
  injectOverlayStyles();

  // Process existing elements
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
