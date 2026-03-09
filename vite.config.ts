import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  build: {
    outDir: 'dist',
    emptyOutDir: mode !== 'popup',
    rollupOptions: {
      input: mode === 'popup'
        ? { popup: resolve(__dirname, 'src/popup.ts') }
        : { content: resolve(__dirname, 'src/content.ts') },
      output: {
        entryFileNames: '[name].js',
        format: 'iife',
      },
    },
  },
  publicDir: mode === 'popup' ? false : 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}));
