# Enchanted Circle Trades New Mexico

Marketing site for a general contracting and handyman business covering all of Taos
County, New Mexico. Owner-operated by Dave Perez.

**Live:** https://taimeade.github.io/enchanted-circle-trades-new-mexico/

---

## ⚠️ Read this before writing any copy

**This business does not hold a New Mexico contractor's license yet.**

New Mexico requires a license number in contractor advertising, and the license itself
is issued by the Regulation and Licensing Department's Construction Industries
Division. Nothing on this site may say _licensed_, _insured_, _certified_, or _bonded_
until that comes through.

Two things that are true but are **not** a contractor's license, and must not be
presented as one:

- the business is registered with the state as **Enchanted Circle Trades LLC**
- it has a federal **EIN**

The EIN is deliberately not stored anywhere in this repo. It is a tax identifier;
publishing one invites fraudulent filings and does nothing for a visitor deciding
whether to call.

What the site says instead is in the "Who you're hiring" section: 15+ years in the
trades, six of them as a licensed general contractor in Nevada, and New Mexico
licensing in progress. That is accurate, and for a new business it is more convincing
than a badge.

**When the license is issued:** set `credentials.nmLicensePending` to `false` and fill
in `credentials.licenseNumber` in `src/config/site.js`. The About section and the FAQ
answer both update from those two values.

---

## Stack

|            |                                                         |
| ---------- | ------------------------------------------------------- |
| Framework  | Vue 3 (`<script setup>`) + Vite 8                       |
| Routing    | vue-router 5, history mode — one route                  |
| Styling    | Tailwind CSS v4 (CSS-first, via `@tailwindcss/vite`)    |
| Components | Vuetify 4 — the contact form's fields only              |
| Email      | EmailJS (`@emailjs/browser`)                            |
| Icons      | `@mdi/js` (tree-shaken SVG paths)                       |
| Fonts      | Archivo + Karla, self-hosted via `@fontsource-variable` |
| Hosting    | GitHub Pages via GitHub Actions                         |

**Node 22.12 or newer is required** — Vite 8 will not run on Node 20.

## Local development

```bash
npm install
cp .env.example .env     # then fill in the EmailJS values
npm run dev
```

| Script            | What it does                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| `npm run dev`     | Dev server at `http://localhost:5173/enchanted-circle-trades-new-mexico/` |
| `npm run build`   | Pre-build checks, production build into `dist/`, plus the 404 fallback    |
| `npm run preview` | Serve the built site locally                                              |
| `npm run lint`    | ESLint + the pre-build checks                                             |
| `npm run format`  | Prettier over `src/`                                                      |

---

## Structure

**The site is a single scrolling page.** There are no sub-pages. The header navigates
it with in-page anchors:

```
Hero            the pitch, the phone number, the ridgeline
#trades         the twelve trades, as a grid
#how            the four-step process
#area           the ten towns and the 50-mile radius
#about          who Dave is, and where licensing stands
#faq            seven questions, answered flat
CTA band        call, or open the estimate form
```

`vue-router` is still installed and configured with `/` plus a catch-all. That is
deliberate: adding real pages later (a `/services/:slug` per trade, once there is
confirmed copy for them) is a route entry and a view, not a re-architecture. The
catch-all also matters right now — `/services`, `/work`, `/reviews` and `/contact`
were live URLs on this domain until this rewrite, so anything already linked or
indexed lands on the not-found page.

---

## Updating content

Content is data, not markup. Almost nothing here requires touching a component.

### Business details — `src/config/site.js`

Phone, email, hours, service area, response time, social links and credentials all
live in this one file, and every component reads from it. Change a value here and it
updates everywhere.

`address.street` is `null`, which keeps the address line off the site — the business
works out of trucks, not a storefront. `social` is empty, which hides the social row
automatically; there is no flag to remember to switch off.

### Trades — `src/data/services.json`

One list feeding the trades grid, the footer, and the contact form's dropdown.

```json
{
  "slug": "url-safe-name",
  "name": "Display Name",
  "summary": "One line for the tile.",
  "icon": "wrench"
}
```

`icon` must be a key from `src/design/icons.js`; to use a new one, import the path
from `@mdi/js` there and add it to the map. The build fails on an unknown key.

There is no `description` or `bullets` field. There used to be — several paragraphs
per trade, written before anyone had confirmed how this business actually works, and
rendered on detail pages that no longer exist. If per-trade pages come back, add the
fields then, with copy the owner has actually read.

### FAQs — `src/data/faqs.json`

Plain `{ "question", "answer" }` pairs. These are the owner's own answers about
response time, scheduling, travel fees and the after-hours premium — not generic
filler. Keep them that way.

### Reviews and project photos

There are none yet, and there is no code for them. When real reviews (with permission
to publish names) and job photos arrive, they get built then — rather than shipping
placeholder machinery that renders sample content in the meantime.

---

## Design

The Sangre de Cristo range stands east of Taos and is named for what it does at
sunset: the high peaks turn blood-orange over dark timbered slopes. That is where the
palette comes from, and it sets the one rule worth knowing:

> **Green is the mass. Orange is the light.**
> `ember` never fills a large area. It catches an edge — a ridgeline rim, a rule, a
> focus ring, one button.

### The ridgeline

`src/design/ridgeline.js` holds the path data. It renders in three places:
`RidgeMountains.vue` (the horizon at the foot of the hero, with the lit crest),
`RidgeRule.vue` (the section divider), and `LogoMark.vue` (a peak inside the open
circle of the byway). A stylised profile, not survey data.

### Type

`type-display` is Archivo pulled to **78% width** — peaks are tall and narrow, so the
display type is too. This is genuine variable-font data (the `wdth` axis spans
62–125%), not a scale transform, so the strokes stay correctly weighted.

`type-label` is for **eyebrows only**. It is 12px uppercase with 0.14em tracking,
which is fine for a two-word label and hard work as a sentence. Buttons deliberately
use body type at 16px in sentence case, with a 48px minimum height — this site's
visitors are homeowners, often older, usually arriving with a problem, and legibility
on the one element they have to find beats styling.

### Tokens are checked, not just documented

Colors are defined twice on purpose: as hex in `src/design/tokens.js` (Vuetify needs
real hex to compute its `on-*` contrast colors) and as `@theme` custom properties in
`src/styles/main.css` (Tailwind's source).

`scripts/check-data.mjs` parses both on every build and **fails if they disagree**, in
either direction. Change one, change the other.

Contrast is measured, not estimated. `ember` (`#D4581F`) is decoration-only — 3.71:1
on `snow`, which fails AA for text. Accent _text_ uses `ember-deep` (6.15:1 on `snow`)
on light grounds and `ember-light` (9.03:1 on `pitch`) on dark. Solid buttons darken
to `ember-dark` on hover rather than brightening toward `ember`, which would drop the
label to 3.71:1 the moment a pointer touched it.

Translucency floors, alpha-blended and verified: `text-snow/55` on `spruce` is 5.02;
`text-spruce/70` on `granite` is 4.81. Do not go below either.

---

## Two things that will break if you move them

### The mobile menu is teleported to `<body>`

`AppHeader.vue` carries `backdrop-blur-md` whenever it is not sitting over the hero,
and opening the menu is one of the things that turns that state on. A
`backdrop-filter` makes an element the containing block for `position: fixed`
descendants — so a menu nested inside the header resolved `top-18 bottom-0` against
the 72px-tall header instead of the viewport and computed to **exactly zero height**:
open, focus-trapped, scroll-locked, and invisible.

It lives in a `<Teleport to="body">` at `z-40`, under the header's `z-50` so the close
button stays on top. Do not move it back inside `<header>`.

### The contact form is loaded on demand

The form pulls in Vuetify's form components and the EmailJS SDK — more than half the
site's JavaScript. `ContactModal.vue` loads it via `defineAsyncComponent` and warms
the chunk on idle after mount. **Do not turn that into a plain import.**

---

## The contact form

The form is a **modal, not a page**. Any button anywhere opens it:

```js
import { openContactModal } from '@/composables/useContactModal'

openContactModal() // blank form
openContactModal('HVAC') // trade picker preselected
```

State is a module-level ref in `src/composables/useContactModal.js`, and a single
`ContactModal` instance is mounted in `App.vue`. The trade tiles pass their own name,
so someone who tapped "Plumbing" is not asked a question they already answered.

`ContactForm.vue` itself carries no border, background, or padding — the surrounding
surface owns those, which is what lets it drop into the modal cleanly.

### EmailJS

The form posts through a shared EmailJS account used across several sites. The
template's _To Email_ field is `{{to_email}}`, so one template delivers to any
business by varying that parameter.

| Template variable                         | Source                               |
| ----------------------------------------- | ------------------------------------ |
| `to_email`                                | `site.email` — `dav.perez@proton.me` |
| `from_name` / `from_email` / `from_phone` | Form fields                          |
| `service_type`                            | Trade dropdown, from `services.json` |
| `message`                                 | Form field                           |

**The recipient is not an environment variable.** It comes from `site.email`, so
changing where inquiries go is a one-line edit.

The three account keys are read from `import.meta.env.VITE_EMAILJS_*` and are never
hardcoded:

- **Locally** — `.env` (gitignored). `.env.example` documents the shape.
- **In CI** — GitHub Actions repository secrets, injected into the build step in
  `.github/workflows/deploy.yml`. Without them the live form fails with _"public key
  is required."_

```bash
gh secret set --env-file .env    # sets all three without typing values
```

#### Allowed Origins

These keys are public by design; they are locked down by origin instead. Add
`https://taimeade.github.io` to **Allowed Origins** in the EmailJS dashboard so the
key only works from your sites.

#### Spam

The form includes a honeypot field that real visitors never see. Submissions that fill
it are dropped silently rather than reported as failures.

---

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`: install → lint → build →
publish `dist/` to Pages.

Pages must be set to **GitHub Actions** as its source (Settings → Pages → Build and
deployment → Source). One-time setup:

```bash
gh api repos/TaiMeade/enchanted-circle-trades-new-mexico/pages -X POST -f build_type=workflow
```

`scripts/postbuild.mjs` copies `index.html` to `404.html`. Pages serves that for any
path it does not recognise, which is how the retired URLs still land somewhere useful.

---

## Architecture

```
src/
├── config/site.js        Single source of truth for business facts
├── design/
│   ├── tokens.js         Palette + font stacks (feeds the Vuetify theme)
│   ├── icons.js          Icon registry — what keeps @mdi/js tree-shaken
│   └── ridgeline.js      The signature path data
├── data/*.json           Trades, FAQs
├── composables/          Trades, EmailJS, focus trap, contact modal, scroll spy
├── components/
│   ├── layout/           Header, footer, section headings
│   ├── ui/               Buttons, icons, the ridgeline, trade tiles
│   ├── sections/         The seven sections of the page, in order
│   └── contact/          The contact modal and the form inside it
└── views/                HomeView (composes the sections) + NotFoundView
```

### Tailwind and Vuetify together

Tailwind drives all layout and visual design; Vuetify is used only where its form
validation and accessibility plumbing is worth having.

They coexist through cascade layers rather than `!important`. Vuetify 4 ships fully
layered CSS and Tailwind v4 is layer-native. Because layer precedence is fixed by
order of first declaration, `src/main.js` imports them in this order:

```js
import 'vuetify/styles' // registers the vuetify-* layers first → lower priority
import './styles/main.css' // Tailwind's layers land after → higher priority
```

**Swapping those two lines makes Vuetify override every Tailwind utility.** If styling
starts behaving strangely, check that order first.

---

## Still needed from the owner

Project photos, a logo, reviews with permission to publish names, social links, and
confirmation of the twelve trade names and the FAQ wording. All of it drops into
`src/config/site.js` and `src/data/*.json` without touching a component.
