/**
 * YouTube Overlay - Content Script
 * Hides non-music content on YouTube
 * Shows only videos with badges (music, live, mixes)
 */
import overlayStyles from './styles/overlay.css?inline';
// Configuration
const BADGE_SELECTOR = '.yt-badge-shape__icon';
const SHOW_CLASS = 'show';
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
function injectOverlayStyles() {
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
    }
    catch (error) {
        console.error('[YT Overlay] Failed to inject styles:', error);
    }
}
/**
 * Check if element contains badge icon
 */
function hasBadge(element) {
    return element.querySelector(BADGE_SELECTOR) !== null;
}
/**
 * Process video element for badge detection
 */
function processVideoElement(element) {
    if (hasBadge(element)) {
        // Badge found - show the element
        if (!element.classList.contains(SHOW_CLASS)) {
            element.classList.add(SHOW_CLASS);
            console.log('[YT Overlay] Badge detected, showing:', element);
        }
    }
    else {
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
function processAllVideoElements() {
    VIDEO_SELECTORS.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => processVideoElement(element));
    });
}
/**
 * Debounce function to limit execution frequency
 */
function debounce(func, wait) {
    let timeout = null;
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
/**
 * Setup MutationObserver to watch for dynamic content
 */
function setupMutationObserver() {
    const debouncedProcess = debounce(processAllVideoElements, 300);
    const observer = new MutationObserver((mutations) => {
        let shouldProcess = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldProcess = true;
                break;
            }
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                const target = mutation.target;
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
function init() {
    // Inject styles immediately
    injectOverlayStyles();
    // Process existing elements
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupMutationObserver();
        });
    }
    else {
        setupMutationObserver();
    }
    console.log('[YT Overlay] Initialized');
}
// Run initialization
init();
