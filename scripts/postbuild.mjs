/**
 * Post-build steps for GitHub Pages.
 *
 * 1. The 404 fallback.
 * 2. A guard on cascade layer order — see below. That one is not boilerplate.
 */
import { copyFile, readFile, readdir } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

const distUrl = (path) => fileURLToPath(new URL(`../dist/${path}`, import.meta.url))

/* ------------------------------------------------------------------ *
 * 404 fallback
 *
 * The site is a single page now, so there are no deep links to pre-render.
 * What is still needed is the fallback: /services, /services/:slug, /work,
 * /reviews and /contact were live URLs on this domain until the rewrite.
 * Anything already linked, bookmarked or indexed still resolves to a page,
 * where the router's catch-all renders the not-found view.
 * ------------------------------------------------------------------ */
await copyFile(distUrl('index.html'), distUrl('404.html'))

/* ------------------------------------------------------------------ *
 * Cascade layer order
 *
 * Tailwind's `base` layer holds preflight, which sets `border: 0 solid` on
 * everything and `opacity: 1` on every form control. Vuetify's component
 * styles rely on both of those properties: `.v-field__outline__start` draws
 * the outline of a text field with a border, and a select hides its real
 * <input> behind the visible selection with `opacity: 0`.
 *
 * Layers beat specificity. If `base` is declared *after* `vuetify-components`,
 * preflight wins both — and the failure is silent and cosmetic-looking:
 * outlined text fields render with no outline at all, and every select shows
 * its value twice. No error, no warning, nothing in the console.
 *
 * Layer priority follows order of first declaration, which follows the CSS
 * import order in src/main.js. That is one line away from breaking at any
 * time, so assert the built output rather than trusting the comment there.
 * ------------------------------------------------------------------ */
const assets = await readdir(distUrl('assets'))
const mainCss = assets.find((name) => name.startsWith('index-') && name.endsWith('.css'))

if (!mainCss) {
  console.error('\n✗ postbuild: no index-*.css in dist/assets — did the build change?\n')
  process.exit(1)
}

const css = await readFile(distUrl(`assets/${mainCss}`), 'utf8')
const positionOf = (layer) => css.indexOf(`@layer ${layer}{`)

const base = positionOf('base')
const vuetify = positionOf('vuetify-components')

if (base === -1 || vuetify === -1) {
  console.error(
    `\n✗ postbuild: could not find both @layer base and @layer vuetify-components in ${mainCss}.\n` +
      `  The layer names or the bundling changed — re-check the order by hand before shipping.\n`
  )
  process.exit(1)
}

if (base > vuetify) {
  console.error(
    '\n✗ postbuild: cascade layer order is wrong.\n\n' +
      "  Tailwind's `base` layer (preflight) is declared AFTER `vuetify-components`,\n" +
      '  so preflight now outranks every Vuetify component style. Text fields will\n' +
      '  render with no outline and selects will show their value twice.\n\n' +
      '  Fix: in src/main.js, import ./styles/main.css BEFORE vuetify/styles.\n'
  )
  process.exit(1)
}

console.log(`✓ 404.html written · cascade layers ordered correctly (base before vuetify-components)`)
