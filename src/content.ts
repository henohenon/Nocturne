/**
 * YouTube Interaction Blocker - Content Script
 * Disables video interactions on YouTube through CSS injection
 */

// CSS to block video interactions
const blockingStyles = `
  /* Video thumbnails */
  ytd-thumbnail,
  ytd-video-preview,
  ytd-compact-video-renderer,
  ytd-grid-video-renderer,
  ytd-rich-item-renderer {
    pointer-events: none !important;
    cursor: not-allowed !important;
    user-select: none !important;
    opacity: 0.6 !important;
    filter: grayscale(40%) !important;
  }

  /* Video player */
  #movie_player,
  video,
  .html5-video-player,
  .ytp-play-button,
  .ytp-large-play-button {
    pointer-events: none !important;
    cursor: not-allowed !important;
  }

  /* Related videos and suggestions */
  ytd-compact-video-renderer a,
  ytd-video-renderer a,
  ytd-grid-video-renderer a {
    pointer-events: none !important;
    cursor: not-allowed !important;
  }

  /* Video cards and end screens */
  .ytp-ce-element,
  .ytp-cards-teaser,
  .ytp-videowall-still {
    pointer-events: none !important;
    display: none !important;
  }

  /* Shorts */
  ytd-reel-video-renderer,
  ytd-shorts {
    pointer-events: none !important;
    cursor: not-allowed !important;
    opacity: 0.6 !important;
    filter: grayscale(40%) !important;
  }
`;

/**
 * Inject blocking styles into the page
 */
function injectBlockingStyles(): void {
  try {
    // Check if styles already injected
    if (document.getElementById('yt-blocker-styles')) {
      return;
    }

    // Create and inject style element
    const styleElement = document.createElement('style');
    styleElement.id = 'yt-blocker-styles';
    styleElement.textContent = blockingStyles;

    // Inject into head or html element
    const targetElement = document.head || document.documentElement;
    targetElement.appendChild(styleElement);

    console.log('[YT Blocker] Video interactions disabled');
  } catch (error) {
    // Silent failure - don't expose errors to user
    console.error('[YT Blocker] Failed to inject styles:', error);
  }
}

/**
 * Initialize the content script
 */
function init(): void {
  // Inject styles immediately
  injectBlockingStyles();

  // Re-inject on DOM changes (for dynamic content)
  // Using simple check instead of MutationObserver for Phase 1
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectBlockingStyles);
  }
}

// Run initialization
init();
