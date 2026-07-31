# Enchanted Circle Trades New Mexico

Marketing site for a general contracting and handyman business serving the Enchanted
Circle in northern New Mexico — Taos, Questa, Red River, Eagle Nest, and Angel Fire.

**Live:** https://taimeade.github.io/enchanted-circle-trades-new-mexico/

---

## Stack

| | |
|---|---|
| Framework | Vue 3 (`<script setup>`) + Vite 8 |
| Routing | vue-router 5, history mode |
| Styling | Tailwind CSS v4 (CSS-first, via `@tailwindcss/vite`) |
| Components | Vuetify 4 — form controls, expansion panels only |
| Email | EmailJS (`@emailjs/browser`) |
| Icons | `@mdi/js` (tree-shaken SVG paths) |
| Fonts | Archivo + Karla, self-hosted via `@fontsource-variable` |
| Hosting | GitHub Pages via GitHub Actions |

**Node 22.12 or newer is required** — Vite 8 will not run on Node 20.

## Local development

```bash
npm install
cp .env.example .env     # then fill in the EmailJS values
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server at `http://localhost:5173/enchanted-circle-trades-new-mexico/` |
| `npm run build` | Production build into `dist/`, plus the SPA 404 fallback |
| `npm run preview` | Serve the built site locally |
| `npm run lint` | ESLint (correctness only — formatting is Prettier's job) |
| `npm run format` | Prettier over `src/` |

---

## Updating content

Content is data, not markup. Almost nothing here requires touching a component.

### Business details — `src/config/site.js`

Phone, email, address, hours, service area, social links, and license info all live in
this one file, and every component reads from it. Change a value here and it updates
everywhere on the site.

Values still marked `// PLACEHOLDER` need real information:

- **Phone** — set `PHONE_DIGITS` to the real 10 digits. The display format
  `(575) 555-0123` and the `tel:` link are both derived from it, so there is nothing
  else to change.
- **Address** — leave `street` as `null` to keep the street address off the site.
- **Hours**, **service area**, **nearby areas**, **social links**, **license number**,
  **founded year**.

Delete the `// PLACEHOLDER` comment once a value is confirmed, so what is left is
obvious.

> Two placeholders are deliberately **not** published anywhere public until confirmed:
> the phone number is left out of the structured data in `index.html`, and there is no
> `og:image` yet. Both are marked with a `TODO` in that file.

### Services — `src/data/services.json`

One list feeding the services grid, the `/services/:slug` detail pages, the footer, and
the contact form's dropdown. Adding an entry adds all four.

```json
{
  "slug": "url-safe-name",
  "name": "Display Name",
  "summary": "One line for the card.",
  "description": "A paragraph for the detail page.",
  "bullets": ["What that covers", "…"],
  "icon": "wrench",
  "featured": true
}
```

`icon` must be a key from `src/design/icons.js`. To use a new one, import the path from
`@mdi/js` there and add it to the map. `featured: true` puts the service on the home page.

### Reviews — `src/data/reviews.json`

```json
{
  "id": "r1",
  "author": "First L.",
  "location": "Taos, NM",
  "rating": 5,
  "date": "2026-05-18",
  "text": "…",
  "source": "Google",
  "placeholder": true
}
```

The average rating and review count are computed from this file — do not hardcode them.

### Projects — `src/data/projects.json`

Put photos in `public/images/projects/` and reference them as
`"images": ["/images/projects/kitchen-1.jpg"]`. Leading slash; Vite rewrites it to the
Pages base path. A project with an empty `images` array renders a generated geometric
pattern instead.

### FAQs — `src/data/faqs.json`

Plain `{ "question", "answer" }` pairs, shown on the Services page.

### ⚠️ Placeholder content

Every seeded review and project carries `"placeholder": true`. While any of them remain,
the site shows a visible **"Sample content"** notice above those sections, and project
cards get a "Sample" badge.

This is intentional: it means sample entries can never be mistaken for real customer
feedback or for work the business has actually done. The notice disappears on its own as
the placeholders are replaced — there is no flag to remember to switch off.

**Before launch, replace every entry with `"placeholder": true`.**

---

## EmailJS

The contact form posts through a shared EmailJS account used across several sites. The
template's *To Email* field is `{{to_email}}`, so one template delivers to any business
by varying that parameter.

Form fields map to template variables as:

| Template variable | Source |
|---|---|
| `to_email` | `site.email` — currently `dav.perez@proton.me` |
| `from_name` / `from_email` / `from_phone` | Form fields |
| `service_type` | Service dropdown, derived from `services.json` |
| `message` | Form field |

**The recipient is not an environment variable.** It comes from `site.email` in
`src/config/site.js`, so changing where inquiries go is a one-line edit there.

The three account keys are read from `import.meta.env.VITE_EMAILJS_*` and are never
hardcoded:

- **Locally** — `.env` (gitignored). `.env.example` documents the shape.
- **In CI** — GitHub Actions repository secrets, injected into the build step in
  `.github/workflows/deploy.yml`. The gitignored `.env` does not exist in CI, so without
  these secrets the live form fails with *"public key is required."*

To set them from the local `.env` without typing values on the command line:

```bash
gh secret set --env-file .env
```

### Allowed Origins

These keys are public by design; they are locked down by origin instead. Add
`https://taimeade.github.io` to **Allowed Origins** in the EmailJS dashboard so the key
only works from your sites.

### Spam

The form includes a honeypot field that real visitors never see. Submissions that fill it
are dropped silently rather than being reported as failures.

---

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`: install → lint → build →
publish `dist/` to Pages.

Pages must be set to **GitHub Actions** as its source (Settings → Pages → Build and
deployment → Source). One-time setup:

```bash
gh api repos/TaiMeade/enchanted-circle-trades-new-mexico/pages -X POST -f build_type=workflow
```

### SPA routing on Pages

Pages serves static files with no rewrite rules, so a direct request for
`/services/plumbing` finds no file. `scripts/postbuild.mjs` runs after every build and
handles this two ways:

1. **Writes a real `index.html` at every known route** — `dist/services/index.html`,
   `dist/services/plumbing/index.html`, and so on. These respond **200**.
2. **Copies `index.html` to `404.html`** as a catch-all for genuinely unknown paths,
   which renders the in-app not-found page.

The first part matters for SEO. The common copy-`404.html`-and-done approach makes the
site work for visitors, but every non-root URL still responds with a 404 status, and
search engines will not index a page that 404s — which would leave `/services` and
`/contact` invisible in search.

Routes are derived from `services.json`, so adding a service automatically produces a
static entry for it. Keep this script wired into the `build` script.

---

## Architecture notes

```
src/
├── config/site.js        Single source of truth for business facts
├── design/
│   ├── tokens.js         Palette + font stacks (feeds the Vuetify theme)
│   └── icons.js          Icon registry — what keeps @mdi/js tree-shaken
├── data/*.json           Services, reviews, projects, FAQs
├── composables/          Data access, EmailJS, focus trap
├── components/
│   ├── layout/           Header, footer, section headings
│   ├── ui/               Buttons, cards, icons, the Enchanted Circle ring
│   ├── home/             Home page sections
│   └── contact/          Contact form
└── views/                One per route
```

### Tailwind and Vuetify together

Tailwind drives all layout and visual design; Vuetify is used only where its form
validation and accessibility plumbing is worth having.

They coexist through cascade layers rather than `!important`. Vuetify 4 ships fully
layered CSS (`vuetify-core`, `vuetify-components`, …) and Tailwind v4 is layer-native.
Because layer precedence is fixed by order of first declaration, `src/main.js` imports
them in this order:

```js
import 'vuetify/styles'      // registers the vuetify-* layers first → lower priority
import './styles/main.css'   // Tailwind's layers land after → higher priority
```

**Swapping those two lines makes Vuetify override every Tailwind utility.** If styling
starts behaving strangely, check that order first.

### Design tokens

Colors are defined twice on purpose: as hex in `src/design/tokens.js` (Vuetify needs real
hex values to compute its contrast colors) and as `@theme` custom properties in
`src/styles/main.css` (Tailwind's source). **Keep the two in sync** — both files say so.

One rule worth knowing: `adobe` (`#C6663D`) is **decoration only** — at 3.57:1 on `bone`
it fails WCAG AA for body text. Accent *text* and buttons use `adobe-deep` (`#8F4526`,
6.28:1), and accent text on dark backgrounds uses `adobe-light` (`#E39A75`, 8.40:1 on
`ink`).

Every text/background pair in use has been measured against WCAG AA. If you introduce a
translucent text color (`text-bone/45` and the like), check it — alpha blending drops the
ratio well below what the solid color suggests. `text-bone/55` on `ink` is roughly the
floor that still passes.
