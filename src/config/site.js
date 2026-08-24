/**
 * Single source of truth for every business fact on this site.
 *
 * Nothing in `src/components` or `src/views` should ever hardcode a phone
 * number, an email address, an address, or business hours. Import from here.
 *
 * ── A NOTE ON CLAIMS ──
 * This business is not yet licensed in New Mexico. Nothing on this site may
 * say "licensed" or "insured" — New Mexico requires a license number in
 * contractor advertising, and claiming a license you do not hold is its own
 * problem. `credentials` below describes experience only, which is accurate
 * and, for a new business, more persuasive than a badge anyway.
 *
 * When the New Mexico license comes through, add the number to `credentials`
 * and update the statement. That is the only edit required.
 */

/** Confirmed with the owner. Display format and the tel: link both derive from this. */
const PHONE_DIGITS = '5757700264'

/** Formats 10 raw digits as (555) 555-5555. */
function formatPhone(digits) {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export const site = Object.freeze({
  /** Marketing name — headings, page title, structured data. */
  name: 'Enchanted Circle Trades New Mexico',
  /**
   * Registered entity name. Used in the footer copyright line and the
   * structured data's legalName, which is where a real legal name belongs.
   *
   * The EIN is deliberately NOT stored here or anywhere else in this repo. It
   * is a tax identifier, not a credential — publishing one invites fraudulent
   * filings, and it does nothing for a visitor deciding whether to call.
   */
  legalName: 'Enchanted Circle Trades LLC',
  /** Shorter form for headers and repeated inline mentions. */
  shortName: 'Enchanted Circle Trades',
  /** Initials for the logo mark and tight spaces. */
  abbr: 'ECT',

  tagline: 'Every trade. One call.',
  description:
    'Remodels, renovations, plumbing, electrical, HVAC, carpentry, concrete, fencing, landscaping and general repairs for homes across Taos County, New Mexico.',

  /** Owner. Named on the site because a one-crew business is a person. */
  owner: 'Dave Perez',

  /** Confirmed. All contact-form submissions are delivered here. */
  email: 'dav.perez@proton.me',

  phone: formatPhone(PHONE_DIGITS),
  phoneHref: `tel:+1${PHONE_DIGITS}`,

  /**
   * No public street address — the business works out of trucks, not a
   * storefront. `street: null` keeps the address line off the site entirely.
   */
  address: Object.freeze({
    street: null,
    city: 'Taos',
    state: 'NM',
    zip: '87571',
    get locality() {
      return `${this.city}, ${this.state}`
    },
  }),

  hours: Object.freeze({
    weekdays: '9:00 AM – 5:00 PM',
    saturday: '9:00 AM – 5:00 PM',
    sunday: 'Closed',
    note: 'Holiday hours vary. Emergency and after-hours calls are taken at a premium rate — dropping a job in progress, or working past hours, costs more.',
  }),

  /**
   * How fast a caller actually hears back. This is the single strongest thing
   * this business can promise right now, so it is a first-class fact rather
   * than a line buried in some component.
   */
  responseTime: 'within a few hours — often within minutes',

  /** Towns covered as a matter of course. Confirmed with the owner. */
  serviceArea: Object.freeze([
    'Taos',
    'Ranchos de Taos',
    'Arroyo Seco',
    'Arroyo Hondo',
    'El Prado',
    'Questa',
    'Red River',
    'Elizabethtown',
    'Eagle Nest',
    'Angel Fire',
  ]),

  /** Everything past the named towns. Stated plainly, travel fee included. */
  radius: Object.freeze({
    miles: 50,
    note: 'Anywhere within about 50 miles of Taos is a normal call. Past that we can still come out, but a travel fee gets added to the job.',
  }),

  /** Leave a value empty and its icon is hidden automatically. */
  social: Object.freeze({
    facebook: '',
    instagram: '',
    google: '',
  }),

  /**
   * Experience, not credentials.
   *
   * `nmLicensePending` drives the honest note about where New Mexico licensing
   * stands. Set it to false and add `licenseNumber` once the license is issued.
   *
   * Note: the business IS registered with the state as an LLC and has an EIN.
   * Neither is a contractor's license. A New Mexico contractor's license is
   * issued by the Regulation and Licensing Department's Construction
   * Industries Division (a GB-98, GB-2 or similar classification), and that is
   * the credential this flag tracks — it is the one that advertising rules and
   * homeowners actually mean. Do not flip this because the LLC exists.
   */
  credentials: Object.freeze({
    yearsExperience: 15,
    priorLicense: 'six of them as a licensed general contractor in Nevada',
    nmLicensePending: true,
    licenseNumber: '',
  }),

  /** The year the business started operating in northern New Mexico. */
  foundedYear: 2025,
})

export default site
