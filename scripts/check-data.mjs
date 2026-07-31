/**
 * Validates the JSON content files before a build.
 *
 * These files are meant to be edited by hand as real content arrives, and the
 * failure modes are quiet ones: a mistyped icon key renders an empty square, a
 * duplicate slug makes one service unreachable, a project pointing at a
 * non-existent service silently breaks nothing until someone links to it. This
 * turns all of those into a build error instead.
 *
 * Runs as part of `npm run build` and `npm run lint`.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const read = (path) =>
  JSON.parse(readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8'))

const services = read('../src/data/services.json')
const reviews = read('../src/data/reviews.json')
const projects = read('../src/data/projects.json')
const faqs = read('../src/data/faqs.json')

// Icon keys are declared in a JS module, so pull them out by pattern rather
// than importing (this script runs outside the Vite alias resolution).
const iconsSource = readFileSync(
  fileURLToPath(new URL('../src/design/icons.js', import.meta.url)),
  'utf8'
)
const iconKeys = new Set(
  [...iconsSource.matchAll(/^\s{2}([a-zA-Z][\w]*):\s*mdi/gm)].map((match) => match[1])
)

const errors = []
const check = (condition, message) => {
  if (!condition) errors.push(message)
}

const unique = (values) => new Set(values).size === values.length

// ── Services ──
check(services.length > 0, 'services.json is empty')
check(unique(services.map((s) => s.slug)), 'services.json has duplicate slugs')
for (const service of services) {
  const at = `services.json[${service.slug ?? '?'}]`
  for (const field of ['slug', 'name', 'summary', 'description', 'icon']) {
    check(typeof service[field] === 'string' && service[field].trim(), `${at}: missing "${field}"`)
  }
  check(/^[a-z0-9-]+$/.test(service.slug ?? ''), `${at}: slug must be lowercase kebab-case`)
  check(Array.isArray(service.bullets) && service.bullets.length > 0, `${at}: needs bullets`)
  check(typeof service.featured === 'boolean', `${at}: "featured" must be true or false`)
  check(
    iconKeys.has(service.icon),
    `${at}: icon "${service.icon}" is not in src/design/icons.js (have: ${[...iconKeys].join(', ')})`
  )
}
check(
  services.some((s) => s.featured),
  'services.json: at least one service must be featured for the home page'
)

// ── Reviews ──
check(unique(reviews.map((r) => r.id)), 'reviews.json has duplicate ids')
for (const review of reviews) {
  const at = `reviews.json[${review.id ?? '?'}]`
  for (const field of ['id', 'author', 'location', 'text']) {
    check(typeof review[field] === 'string' && review[field].trim(), `${at}: missing "${field}"`)
  }
  check(
    Number.isFinite(review.rating) && review.rating >= 1 && review.rating <= 5,
    `${at}: rating must be a number from 1 to 5`
  )
  check(!Number.isNaN(Date.parse(review.date)), `${at}: date "${review.date}" is not parseable`)
}

// ── Projects ──
const slugs = new Set(services.map((s) => s.slug))
check(unique(projects.map((p) => p.id)), 'projects.json has duplicate ids')
check(unique(projects.map((p) => p.slug)), 'projects.json has duplicate slugs')
for (const project of projects) {
  const at = `projects.json[${project.id ?? '?'}]`
  for (const field of ['id', 'slug', 'title', 'category', 'location', 'summary']) {
    check(typeof project[field] === 'string' && project[field].trim(), `${at}: missing "${field}"`)
  }
  check(Number.isInteger(project.year), `${at}: "year" must be a whole number`)
  check(Array.isArray(project.images), `${at}: "images" must be an array (use [] if none yet)`)
  for (const image of project.images ?? []) {
    check(
      image.startsWith('/'),
      `${at}: image "${image}" must start with "/" so Vite rewrites it to the Pages base path`
    )
  }
  check(
    !project.service || slugs.has(project.service),
    `${at}: service "${project.service}" does not match any slug in services.json`
  )
}

// ── FAQs ──
for (const [i, faq] of faqs.entries()) {
  check(faq.question?.trim() && faq.answer?.trim(), `faqs.json[${i}]: needs a question and answer`)
}

if (errors.length) {
  console.error(`\n✗ Content check failed (${errors.length} problem(s)):\n`)
  for (const error of errors) console.error(`  • ${error}`)
  console.error('')
  process.exit(1)
}

const pending =
  reviews.filter((r) => r.placeholder).length + projects.filter((p) => p.placeholder).length

console.log(
  `✓ Content OK — ${services.length} services, ${reviews.length} reviews, ` +
    `${projects.length} projects, ${faqs.length} FAQs` +
    (pending ? `  (${pending} still marked as placeholders)` : '')
)
