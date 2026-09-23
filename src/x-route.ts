/**
 * Nocturne - X route classification
 * Decides whether the current X page is an endless feed (home timeline, explore)
 */

/** Paths whose main column is an endless feed */
const FEED_PATH = /^\/(home|explore)(\/|$)/;

/** Paths that open as a dialog over the current page and keep its state */
const DIALOG_PATH = /^\/(compose|i\/compose)(\/|$)/;

/** Whether the path shows a feed; dialog paths inherit the previous page's answer */
export function isFeedPath(pathname: string, previous: boolean): boolean {
  if (DIALOG_PATH.test(pathname)) return previous;
  return FEED_PATH.test(pathname);
}
