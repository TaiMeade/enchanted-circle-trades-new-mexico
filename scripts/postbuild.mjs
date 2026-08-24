/**
 * Post-build step for GitHub Pages.
 *
 * The site is a single page now, so there are no deep links to pre-render — an
 * earlier version of this script wrote a static index.html at every route so
 * /services/plumbing would answer 200 instead of 404, and that is no longer
 * needed.
 *
 * What is still needed is the 404 fallback, and here it does real work rather
 * than being boilerplate: /services, /services/:slug, /work, /reviews and
 * /contact were live URLs on this domain until this build. Anything already
 * linked, bookmarked or indexed still resolves to a page, where the router's
 * catch-all renders the not-found view and points people back to the site.
 */
import { copyFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const dist = (path) => fileURLToPath(new URL(`../dist/${path}`, import.meta.url))

await copyFile(dist('index.html'), dist('404.html'))

console.log('✓ 404.html written for GitHub Pages')
