/**
 * YouTube Overlay - Content Script
 * Disables video interactions on YouTube through CSS injection
 * Excludes videos with badges from overlay
 */
import overlayStyles from './styles/overlay.css?inline';
// Configuration
const BADGE_SELECTOR = '.yt-badge-shape__icon';
const EXCLUSION_CLASS = 'yt-overlay-excluded';
const VIDEO_SELECTORS = [
    'ytd-thumbnail',
    'ytd-video-preview',
    'ytd-compact-video-renderer',
    'ytd-grid-video-renderer',
    'ytd-rich-item-renderer',
    'ytd-reel-video-renderer',
];
/**
 * Inject overlay styles into the page
 */
function injectOverlayStyles() {
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
        // Badge found - exclude from overlay
        if (!element.classList.contains(EXCLUSION_CLASS)) {
            element.classList.add(EXCLUSION_CLASS);
            console.log('[YT Overlay] Badge detected, excluding:', element);
        }
    }
    else {
        // No badge - ensure exclusion class is removed
        if (element.classList.contains(EXCLUSION_CLASS)) {
            element.classList.remove(EXCLUSION_CLASS);
            console.log('[YT Overlay] Badge removed, applying overlay:', element);
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
            // Check if added nodes contain video elements
            if (mutation.addedNodes.length > 0) {
                shouldProcess = true;
                break;
            }
            // Check if badge was added/removed
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
    // Observe YouTube content area
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
            processAllVideoElements();
            setupMutationObserver();
        });
    }
    else {
        processAllVideoElements();
        setupMutationObserver();
    }
    console.log('[YT Overlay] Initialized');
}
// Run initialization
init();
