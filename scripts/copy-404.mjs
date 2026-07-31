/**
 * GitHub Pages has no server-side rewrite, so a hard refresh on a client route
 * like /services/plumbing returns a 404 instead of the SPA shell. Pages does
 * serve 404.html for any unmatched path, so shipping a copy of index.html under
 * that name lets the app boot and vue-router resolve the real URL.
 *
 * Runs automatically after `vite build` (see the "build" script).
 */
import { copyFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const dist = (file) => fileURLToPath(new URL(`../dist/${file}`, import.meta.url))

await copyFile(dist('index.html'), dist('404.html'))
console.log('✓ dist/404.html written (SPA fallback for GitHub Pages)')
