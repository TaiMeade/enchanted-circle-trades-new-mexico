/**
 * Post-build step for GitHub Pages.
 *
 * Pages serves static files only — it has no rewrite rules — so a router in
 * history mode has a problem: requesting /services directly finds no file.
 *
 * The usual fix is to copy index.html to 404.html, which Pages serves for any
 * unmatched path. That makes the site *work* (the SPA boots and the router
 * resolves the URL), but the response still carries a 404 status. Browsers
 * don't care; search engines do, and won't index a page that 404s. For a local
 * business site, having /services and /contact be unindexable defeats the point.
 *
 * So this writes a real index.html at every known route as well:
 *
 *   dist/services/index.html          → GET /services/ responds 200
 *   dist/services/plumbing/index.html → GET /services/plumbing/ responds 200
 *
 * Known routes get a 200; genuinely unknown ones still fall through to 404.html
 * and render the in-app not-found page, which is the correct outcome for both.
 *
 * Routes are derived from the same data the router uses, so adding a service to
 * services.json automatically produces a static entry for it.
 */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const dist = (path) => fileURLToPath(new URL(`../dist/${path}`, import.meta.url))

const services = JSON.parse(
  await readFile(fileURLToPath(new URL('../src/data/services.json', import.meta.url)), 'utf8')
)

// Mirrors src/router/index.js. There is deliberately no 'contact' entry — the
// contact form is a modal, not a route.
const routes = ['services', 'work', 'reviews', ...services.map((s) => `services/${s.slug}`)]

const shell = await readFile(dist('index.html'), 'utf8')

for (const route of routes) {
  await mkdir(dist(route), { recursive: true })
  await writeFile(dist(`${route}/index.html`), shell)
}

// Fallback for anything not in the list above (mistyped URLs, dead links).
await copyFile(dist('index.html'), dist('404.html'))

console.log(`✓ ${routes.length} static route shells + 404.html written for GitHub Pages`)
