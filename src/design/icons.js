/**
 * Icon registry.
 *
 * Every icon used anywhere on the site is imported by name here, which is what
 * lets the bundler drop the rest of @mdi/js (~7,000 paths). Data files refer to
 * icons by the short keys below rather than embedding SVG path strings, so JSON
 * stays readable and an icon swap is a one-line change.
 *
 * Adding an icon: import the path, add it to `icons`, use the key in a template
 * or a data file. scripts/check-data.mjs fails the build if services.json names
 * a key that isn't here.
 */
import {
  mdiAccountHardHatOutline,
  mdiAlertCircleOutline,
  mdiArrowRight,
  mdiCalendarCheckOutline,
  mdiCheck,
  mdiCheckCircleOutline,
  mdiClockOutline,
  mdiClose,
  mdiCountertop,
  mdiEmailOutline,
  mdiFacebook,
  mdiFence,
  mdiFileDocumentOutline,
  mdiFormatPaint,
  mdiGoogle,
  mdiGrid,
  mdiHandSaw,
  mdiHomePlus,
  mdiHomeSearchOutline,
  mdiHvac,
  mdiInstagram,
  mdiLightningBolt,
  mdiMapMarkerOutline,
  mdiMenu,
  mdiPhone,
  mdiPhoneInTalkOutline,
  mdiPipeWrench,
  mdiSprout,
  mdiToolbox,
  mdiTrashCanOutline,
  mdiWall,
} from '@mdi/js'

export const icons = Object.freeze({
  // Trades — keys match the "icon" field in src/data/services.json
  counter: mdiCountertop,
  home: mdiHomePlus,
  plumbing: mdiPipeWrench,
  electrical: mdiLightningBolt,
  hvac: mdiHvac,
  carpentry: mdiHandSaw,
  paint: mdiFormatPaint,
  tile: mdiGrid,
  concrete: mdiWall,
  fencing: mdiFence,
  landscaping: mdiSprout,
  trash: mdiTrashCanOutline,
  wrench: mdiToolbox,

  // How it works — the four steps, in order
  call: mdiPhoneInTalkOutline,
  schedule: mdiCalendarCheckOutline,
  inspect: mdiHomeSearchOutline,
  quote: mdiFileDocumentOutline,

  // Contact
  phone: mdiPhone,
  email: mdiEmailOutline,
  location: mdiMapMarkerOutline,
  clock: mdiClockOutline,

  // Interface
  menu: mdiMenu,
  close: mdiClose,
  arrowRight: mdiArrowRight,
  check: mdiCheck,
  checkCircle: mdiCheckCircleOutline,
  alert: mdiAlertCircleOutline,
  crew: mdiAccountHardHatOutline,

  // Social — rendered only when the matching link in site.js is non-empty
  facebook: mdiFacebook,
  instagram: mdiInstagram,
  google: mdiGoogle,
})

export default icons
