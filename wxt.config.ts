import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  outDir: 'dist',
  // Load dist/chrome-mv3-dev into your own Chrome once; dev server reloads it on change
  webExt: {
    disabled: true,
  },
  manifest: {
    name: 'Nocturne',
    description: 'A checkpoint against distracting feeds. Blocks YouTube recommendations; free at night.',
    permissions: ['storage'],
    host_permissions: ['*://*.youtube.com/*'],
    icons: {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
  },
});
