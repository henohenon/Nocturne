/**
 * Nocturne - X content script
 * Seals X's endless feeds (home timeline, explore) and hides the trends sidebar
 * CSS cannot see the URL, so this script flags feed routes on <html>; x.css acts only under that flag
 */

import xStyles from '../styles/x.css?inline';
import { startOverlay } from '../overlay';
import { isFeedPath } from '../x-route';

/** Attribute on <html> marking a feed route */
const FEED_ATTRIBUTE = 'data-nocturne-feed';

/** How often to re-check the route (X navigates without reloads) */
const ROUTE_CHECK_INTERVAL_MS = 250;

export default defineContentScript({
  matches: ['*://x.com/*', '*://twitter.com/*'],
  runAt: 'document_start',
  /** Initialize the content script (runtime code must stay inside main; the module is evaluated at build time) */
  main(ctx): void {
    let onFeed = false;

    /** Sync the feed flag with the current path */
    const checkRoute = (): void => {
      onFeed = isFeedPath(location.pathname, onFeed);
      const root = document.documentElement;
      if (root.hasAttribute(FEED_ATTRIBUTE) !== onFeed) root.toggleAttribute(FEED_ATTRIBUTE, onFeed);
    };

    checkRoute();
    ctx.setInterval(checkRoute, ROUTE_CHECK_INTERVAL_MS);
    startOverlay(ctx, xStyles);
    console.log('[Nocturne] X initialized');
  },
});
