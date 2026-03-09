import { BADGE_SELECTOR, SHOW_CLASS, VIDEO_SELECTORS } from './config';

/**
 * Check if element contains badge icon
 */
export function hasBadge(element: Element): boolean {
  return element.querySelector(BADGE_SELECTOR) !== null;
}

/**
 * Process video element for badge detection
 */
export function processVideoElement(element: Element): void {
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
export function processAllVideoElements(): void {
  VIDEO_SELECTORS.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => processVideoElement(element));
  });
}
