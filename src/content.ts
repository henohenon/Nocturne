/**
 * YouTube Overlay - Content Script
 * Hides non-music content on YouTube
 * Shows only videos with badges (music, live, mixes)
 */

import overlayStyles from './styles/overlay.css?inline';

// Configuration
const BADGE_SELECTOR = '.yt-badge-shape__icon';
const SHOW_CLASS = 'show';
const MUSIC_CLASS = 'music';
const VIDEO_SELECTORS = [
  'ytd-rich-item-renderer',
  'ytd-compact-video-renderer',
  'ytd-grid-video-renderer',
  'ytd-video-renderer',
  'yt-lockup-view-model',
  'ytd-reel-video-renderer',
];

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
 * Check if element contains badge icon
 */
function hasBadge(element: Element): boolean {
  return element.querySelector(BADGE_SELECTOR) !== null;
}

/**
 * Process video element for badge detection
 */
function processVideoElement(element: Element): void {
  if (hasBadge(element)) {
    // Badge found - show the element
    if (!element.classList.contains(SHOW_CLASS)) {
      element.classList.add(SHOW_CLASS);
      console.log('[YT Overlay] Badge detected, showing:', element);
    }
  } else {
    // No badge - ensure show class is removed
    if (element.classList.contains(SHOW_CLASS)) {
      element.classList.remove(SHOW_CLASS);
      console.log('[YT Overlay] Badge removed, hiding:', element);
    }
  }
}

/**
 * Process all video elements in the document
 */
function processAllVideoElements(): void {
  VIDEO_SELECTORS.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => processVideoElement(element));
  });
}

/**
 * Check if current video is music category
 */
function checkMusicCategory(): void {
  try {
    // Look for ytInitialPlayerResponse in page scripts
    const scripts = Array.from(document.querySelectorAll('script'));
    for (const script of scripts) {
      const content = script.textContent || '';
      const match = content.match(/var ytInitialPlayerResponse\s*=\s*({.+?});/);

      if (match) {
        const playerResponse = JSON.parse(match[1]);
        const category = playerResponse?.microformat?.playerMicroformatRenderer?.category;

        if (category === 'Music') {
          document.body.classList.add(MUSIC_CLASS);
          console.log('[YT Overlay] Music detected, enabling player');
        } else {
          document.body.classList.remove(MUSIC_CLASS);
          console.log('[YT Overlay] Non-music, player disabled');
        }
        return;
      }
    }

    // Fallback: check after a delay if not found immediately
    setTimeout(checkMusicCategory, 1000);
  } catch (error) {
    console.error('[YT Overlay] Failed to check music category:', error);
  }
}

/**
 * Check if we're on a watch page
 */
function isWatchPage(): boolean {
  return window.location.pathname === '/watch';
}

/**
 * Debounce function to limit execution frequency
 */
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
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
 * Handle navigation changes (YouTube SPA)
 */
function handleNavigation(): void {
  if (isWatchPage()) {
    checkMusicCategory();
  } else {
    document.body.classList.remove(MUSIC_CLASS);
  }
  processAllVideoElements();
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
      handleNavigation();
      setupMutationObserver();
    });
  } else {
    handleNavigation();
    setupMutationObserver();
  }

  // Listen for YouTube navigation (SPA)
  let lastUrl = location.href;
  new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      handleNavigation();
    }
  }).observe(document, { subtree: true, childList: true });

  console.log('[YT Overlay] Initialized');
}

// Run initialization
init();
