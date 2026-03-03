/**
 * YouTube Overlay - Content Script
 * Disables video interactions on YouTube through CSS injection
 */

import overlayStyles from './styles/overlay.css?inline';

/**
 * Inject overlay styles into the page
 */
function injectOverlayStyles(): void {
  try {
    // Check if styles already injected
    if (document.getElementById('yt-overlay-styles')) {
      return;
    }

    // Create and inject style element
    const styleElement = document.createElement('style');
    styleElement.id = 'yt-overlay-styles';
    styleElement.textContent = overlayStyles;

    // Inject into head or html element
    const targetElement = document.head || document.documentElement;
    targetElement.appendChild(styleElement);

    console.log('[YT Overlay] Video interactions disabled');
  } catch (error) {
    // Silent failure - don't expose errors to user
    console.error('[YT Overlay] Failed to inject styles:', error);
  }
}

/**
 * Initialize the content script
 */
function init(): void {
  // Inject styles immediately
  injectOverlayStyles();

  // Re-inject on DOM changes (for dynamic content)
  // Using simple check instead of MutationObserver for Phase 1
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectOverlayStyles);
  }
}

// Run initialization
init();
