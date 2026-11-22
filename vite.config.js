import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import tailwindcss from '@tailwindcss/vite'

// The site is served from the root of its custom domain (ectnm.com, set in the
// repo's Pages settings), so no path prefix is needed.
const BASE = '/'

export default defineConfig({
  base: BASE,
  plugins: [
    vue(),
    // autoImport pulls in only the Vuetify components actually used in templates.
    // Do not pair this with `import * as components` in plugins/vuetify.js — that
    // eagerly registers the whole library and cancels the tree-shaking out.
    vuetify({ autoImport: true }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The hero and ring are inline SVG, so nothing large should be inlined here.
    assetsInlineLimit: 4096,
  },
})
