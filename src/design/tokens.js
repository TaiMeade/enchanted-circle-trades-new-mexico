/**
 * Design tokens — the source of truth for the palette.
 *
 * These values are consumed directly by the Vuetify theme (which needs real hex
 * strings to compute its own on-* contrast colors, so CSS variables won't do).
 * They are mirrored into Tailwind's `@theme` block in `src/styles/main.css`.
 *
 * ── If you change a color here, change it there too. ──
 *
 * Palette rationale — northern New Mexico high desert:
 * warm charcoal ground, adobe/terracotta accent, piñon green support.
 */
export const colors = Object.freeze({
  /** Deepest ground. Hero and footer. */
  ink: '#0F0E0C',
  /** Warm charcoal base surface. */
  basalt: '#1C1A17',
  /** Raised surface on dark sections — cards, inputs. */
  slate: '#2A2724',

  /**
   * Terracotta accent. DECORATION ONLY — 3.57:1 on `bone`, which fails WCAG AA
   * for body text. Use it for fills, rules, dots, and borders.
   */
  adobe: '#C6663D',
  /**
   * Accessible accent. 6.28:1 on `bone`, 5.23:1 on `sand`. Use for any accent
   * *text*, link, or button surface that carries `bone` type.
   */
  adobeDeep: '#8F4526',
  /** Light accent for use on dark grounds — 8.40:1 on `ink`. */
  adobeLight: '#E39A75',

  /** Deep piñon green. Secondary accent, category chips. */
  pinon: '#4A5D46',
  /** Lighter piñon for dark grounds. */
  pinonLight: '#8FA88A',

  /** Warm mid surface — alternating sections. */
  sand: '#E8DFD3',
  /** Lightest paper. Default page background. */
  bone: '#F7F4EF',
  /** Muted brown-grey secondary text. 5.59:1 on `bone`, 4.65:1 on `sand`. */
  dusk: '#6E5F52',

  success: '#3F6B4A',
  error: '#A33A2B',
})

/**
 * Font stacks. `Archivo Variable` carries a real width axis (62%–125%), so the
 * expanded display treatment is genuine font data rather than a scale transform.
 */
export const fonts = Object.freeze({
  display: "'Archivo Variable', 'Arial Narrow', system-ui, sans-serif",
  body: "'Karla Variable', system-ui, -apple-system, 'Segoe UI', sans-serif",
})
