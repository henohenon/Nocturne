/**
 * Nocturne - YouTube content script
 * Blocks recommendation items on YouTube
 * Allow/block judgment lives in youtube.css (:has allowlist: artist videos, mixes)
 */

import youtubeStyles from '../styles/youtube.css?inline';
import { startOverlay } from '../overlay';

export default defineContentScript({
  matches: ['*://*.youtube.com/*'],
  runAt: 'document_idle',
  /** Initialize the content script (runtime code must stay inside main; the module is evaluated at build time) */
  main(ctx): void {
    startOverlay(ctx, youtubeStyles);
    console.log('[Nocturne] YouTube initialized');
  },
});
