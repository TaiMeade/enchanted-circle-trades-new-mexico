/**
 * Pre-build guard for the two things on this site that fail quietly.
 *
 * 1. Content. `src/data/*.json` is meant to be edited by hand as real
 *    information arrives, and its failure modes are silent: a mistyped icon key
 *    renders an empty square, a duplicate slug makes an anchor ambiguous.
 *
 * 2. The palette mirror. Colors are defined twice on purpose — as hex in
 *    src/design/tokens.js (Vuetify needs real hex to compute its on-* contrast
 *    colors) and as custom properties in the @theme block of styles/main.css
 *    (Tailwind's source). Nothing at runtime notices when the two disagree; the
 *    site just renders half of one palette and half of another. So compare them
 *    here and refuse to build.
 *
 * Runs as part of `npm run build` and `npm run lint`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const at = (path) => fileURLToPath(new URL(path, import.meta.url))
const read = (path) => JSON.parse(readFileSync(at(path), 'utf8'))
const readText = (path) => readFileSync(at(path), 'utf8')

const services = read('../src/data/services.json')
const faqs = read('../src/data/faqs.json')

const errors = []
const check = (condition, message) => {
  if (!condition) errors.push(message)
}
const unique = (values) => new Set(values).size === values.length

// ── Trades ────────────────────────────────────────────────────────────────
// Icon keys are declared in a JS module, so pull them out by pattern rather
// than importing (this script runs outside Vite's alias resolution).
const iconKeys = new Set(
  [...readText('../src/design/icons.js').matchAll(/^\s{2}([a-zA-Z][\w]*):\s*mdi/gm)].map(
    (m) => m[1]
  )
)

check(services.length > 0, 'services.json is empty')
check(unique(services.map((s) => s.slug)), 'services.json has duplicate slugs')
for (const service of services) {
  const where = `services.json[${service.slug ?? '?'}]`
  for (const field of ['slug', 'name', 'summary', 'icon']) {
    check(
      typeof service[field] === 'string' && service[field].trim(),
      `${where}: missing "${field}"`
    )
  }
  check(/^[a-z0-9-]+$/.test(service.slug ?? ''), `${where}: slug must be lowercase kebab-case`)
  check(
    iconKeys.has(service.icon),
    `${where}: icon "${service.icon}" is not in src/design/icons.js`
  )
}

// ── FAQs ──────────────────────────────────────────────────────────────────
for (const [i, faq] of faqs.entries()) {
  check(faq.question?.trim() && faq.answer?.trim(), `faqs.json[${i}]: needs a question and answer`)
}

// ── Palette mirror ────────────────────────────────────────────────────────
// tokens.js exports camelCase keys (`emberDeep`); the CSS block uses kebab-case
// custom properties (`--color-ember-deep`). Normalise and compare both ways so
// a token added to one file and forgotten in the other is also caught.
const kebab = (key) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const jsColors = Object.fromEntries(
  [
    ...readText('../src/design/tokens.js').matchAll(/^\s{2}([a-zA-Z]\w*):\s*'(#[0-9a-fA-F]{6})'/gm),
  ].map(([, key, hex]) => [kebab(key), hex.toLowerCase()])
)

const themeBlock = readText('../src/styles/main.css').match(/@theme\s*\{([\s\S]*?)\n\}/)
check(themeBlock !== null, 'styles/main.css: could not find the @theme block')

const cssColors = Object.fromEntries(
  [...(themeBlock?.[1] ?? '').matchAll(/--color-([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map(
    ([, key, hex]) => [key, hex.toLowerCase()]
  )
)

check(
  Object.keys(jsColors).length > 0,
  'design/tokens.js: no colors parsed — has the shape changed?'
)

for (const [key, hex] of Object.entries(jsColors)) {
  if (!(key in cssColors)) {
    errors.push(`palette: "${key}" is in design/tokens.js but missing from @theme in main.css`)
  } else if (cssColors[key] !== hex) {
    errors.push(`palette: "${key}" is ${hex} in tokens.js but ${cssColors[key]} in main.css`)
  }
}
for (const key of Object.keys(cssColors)) {
  if (!(key in jsColors)) {
    errors.push(`palette: "--color-${key}" is in main.css but missing from design/tokens.js`)
  }
}

// ── Report ────────────────────────────────────────────────────────────────
if (errors.length) {
  console.error(`\n✗ Pre-build check failed (${errors.length} problem(s)):\n`)
  for (const error of errors) console.error(`  • ${error}`)
  console.error('')
  process.exit(1)
}

console.log(
  `✓ ${services.length} trades, ${faqs.length} FAQs, ` +
    `${Object.keys(jsColors).length} palette tokens in sync`
)
