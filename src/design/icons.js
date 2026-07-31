/**
 * Icon registry.
 *
 * Every icon used anywhere on the site is imported by name here, which is what
 * lets the bundler drop the rest of @mdi/js (~7,000 paths). Data files refer to
 * icons by the short keys below rather than embedding SVG path strings, so JSON
 * stays readable and an icon swap is a one-line change.
 *
 * Adding an icon: import the path, add it to `icons`, use the key in a template
 * or a data file.
 */
import {
  mdiAccountHardHatOutline,
  mdiAlertCircleOutline,
  mdiArrowLeft,
  mdiArrowRight,
  mdiCheck,
  mdiCheckCircleOutline,
  mdiChevronDown,
  mdiClockOutline,
  mdiClose,
  mdiCountertop,
  mdiEmailOutline,
  mdiFacebook,
  mdiFormatPaint,
  mdiGoogle,
  mdiGrid,
  mdiHandSaw,
  mdiHomePlus,
  mdiInstagram,
  mdiLightningBolt,
  mdiMapMarkerOutline,
  mdiMenu,
  mdiPhone,
  mdiPipeWrench,
  mdiShieldCheckOutline,
  mdiStar,
  mdiStarHalfFull,
  mdiStarOutline,
  mdiToolbox,
} from '@mdi/js'

export const icons = Object.freeze({
  // Services — keys match the "icon" field in src/data/services.json
  counter: mdiCountertop,
  home: mdiHomePlus,
  plumbing: mdiPipeWrench,
  electrical: mdiLightningBolt,
  carpentry: mdiHandSaw,
  paint: mdiFormatPaint,
  tile: mdiGrid,
  wrench: mdiToolbox,

  // Contact
  phone: mdiPhone,
  email: mdiEmailOutline,
  location: mdiMapMarkerOutline,
  clock: mdiClockOutline,

  // Interface
  menu: mdiMenu,
  close: mdiClose,
  arrowRight: mdiArrowRight,
  arrowLeft: mdiArrowLeft,
  chevronDown: mdiChevronDown,
  check: mdiCheck,
  checkCircle: mdiCheckCircleOutline,
  alert: mdiAlertCircleOutline,

  // Trust markers
  shield: mdiShieldCheckOutline,
  crew: mdiAccountHardHatOutline,

  // Ratings
  star: mdiStar,
  starHalf: mdiStarHalfFull,
  starEmpty: mdiStarOutline,

  // Social
  facebook: mdiFacebook,
  instagram: mdiInstagram,
  google: mdiGoogle,
})

export default icons
