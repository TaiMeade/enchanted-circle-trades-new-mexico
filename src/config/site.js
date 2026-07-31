/**
 * Single source of truth for every business fact on this site.
 *
 * Nothing in `src/components` or `src/views` should ever hardcode a phone
 * number, an email address, an address, or business hours. Import from here.
 *
 * ── FILLING IN REAL DETAILS ──
 * Every value marked PLACEHOLDER below is a stand-in. Replace the value, leave
 * the shape alone, and the whole site updates. Delete the PLACEHOLDER comment
 * once a value is confirmed so it is obvious what still needs attention.
 */

/** PLACEHOLDER — swap in the real 10-digit number. Display + tel: both derive from this. */
const PHONE_DIGITS = '5755550123'

/** Formats 10 raw digits as (555) 555-5555. */
function formatPhone(digits) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export const site = Object.freeze({
  /** Full legal / marketing name. */
  name: 'Enchanted Circle Trades New Mexico',
  /** Shorter form for headers and repeated inline mentions. */
  shortName: 'Enchanted Circle Trades',
  /** Initials for the logo mark and tight spaces. */
  abbr: 'ECT',

  tagline: 'One crew. Every trade.',
  description:
    'Remodels, renovations, plumbing, electrical, carpentry, and general repair work for homes around the Enchanted Circle in northern New Mexico.',

  /** Confirmed. All contact-form submissions are delivered here. */
  email: 'dav.perez@proton.me',

  phone: formatPhone(PHONE_DIGITS),
  phoneHref: `tel:+1${PHONE_DIGITS}`,

  /** PLACEHOLDER — mailing address. Set `street` to null to hide it site-wide. */
  address: Object.freeze({
    street: null,
    city: 'Taos',
    state: 'NM',
    zip: '87571',
    get locality() {
      return `${this.city}, ${this.state}`
    },
  }),

  /** PLACEHOLDER — business hours. `note` renders beneath the table. */
  hours: Object.freeze({
    weekdays: '7:00 AM – 5:00 PM',
    saturday: 'By appointment',
    sunday: 'Closed',
    note: 'Emergency and after-hours calls handled case by case — reach out and ask.',
  }),

  /**
   * The Enchanted Circle byway towns, with each town's real compass bearing from
   * the center of the loop (degrees clockwise from north). The service-area ring
   * places the towns at these bearings, so the diagram reflects actual geography
   * rather than five evenly spaced decorative dots.
   *
   * PLACEHOLDER — confirm the covered towns and the drive notes.
   */
  serviceArea: Object.freeze([
    Object.freeze({ name: 'Red River', bearing: 6, note: 'North end of the loop' }),
    Object.freeze({ name: 'Eagle Nest', bearing: 90, note: 'Moreno Valley' }),
    Object.freeze({ name: 'Angel Fire', bearing: 145, note: 'Resort and second homes' }),
    Object.freeze({ name: 'Taos', bearing: 219, note: 'Home base' }),
    Object.freeze({ name: 'Questa', bearing: 318, note: 'Upper Río Grande' }),
  ]),

  /** Towns just off the byway that are still covered. PLACEHOLDER — confirm. */
  nearbyAreas: Object.freeze([
    'Arroyo Seco',
    'Ranchos de Taos',
    'El Prado',
    'Taos Ski Valley',
    'Cerro',
  ]),

  /** PLACEHOLDER — leave a value empty and its icon is hidden automatically. */
  social: Object.freeze({
    facebook: '',
    instagram: '',
    google: '',
  }),

  /** PLACEHOLDER — confirm the license number and insurance wording before launch. */
  credentials: Object.freeze({
    licensed: true,
    insured: true,
    licenseNumber: '',
    /** Kept generic on purpose. Do not claim a specific license until confirmed. */
    statement: 'Licensed and insured in the State of New Mexico.',
  }),

  /** Rough founding year, used for the "years in the trade" line. PLACEHOLDER. */
  foundedYear: 2015,
})

/** Years in business, recomputed on load so it never goes stale. */
export const yearsInBusiness = new Date().getFullYear() - site.foundedYear

export default site
