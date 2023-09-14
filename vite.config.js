import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { version } from './package.json';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../build',
  },
  publicDir: '../public',
  base: './',
  outDir: './',
  appType: 'spa',
  plugins: [
    VitePWA({
      strategies: 'generateSW',
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      filename: 'service-worker.js',
      manifestFilename: 'desafe-link.webmanifest',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'desafe.link',
        short_name: 'desafe.link',
        description: 'Microsoft Safe Link Unfurler',
        version,
        icons: [
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '32x32',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '128x128',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '152x152',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '167x167',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '180x180',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '196x196',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any',
          },
          {
            src: 'https://emojicon.m5ls5e.workers.dev/🔗',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        lang: 'en-US',
        dir: 'auto',
        orientation: 'portrait',
        id: '/',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#0c1322',
        theme_color: '#b4c6ef',
      },
    }),
    react({
      // Use React plugin in all .jsx files
      include: './src/**/*.jsx',
    }),
  ],
});
