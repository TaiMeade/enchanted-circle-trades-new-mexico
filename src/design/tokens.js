/**
 * Design tokens — the source of truth for the palette.
 *
 * These values are consumed directly by the Vuetify theme (which needs real hex
 * strings to compute its own on-* contrast colors, so CSS variables won't do).
 * They are mirrored into Tailwind's `@theme` block in `src/styles/main.css`.
 *
 * ── The two files are kept honest by scripts/check-data.mjs, which parses both
 * and fails the build if any value disagrees. Change one, change the other. ──
 *
 * ── Palette rationale ──
 * The Sangre de Cristo range above Taos is named for its alpenglow: the peaks
 * turn red-orange at sunset over dark timbered slopes. That is where the two
 * brand colors come from, and it sets the rule for how they are used:
 *
 *   Green is the mass. Orange is the light.
 *
 * `ember` never fills a large area — it is light catching an edge. A ridgeline
 * rim, a rule, a focus ring, one button. Everything structural is green.
 */
export const colors = Object.freeze({
  /** Deepest ground, green-cast near-black. Hero and footer. `snow` on it: 17.1:1. */
  pitch: '#0B1512',
  /** Forest green. The primary dark surface. `snow` on it: 13.0:1. */
  spruce: '#14302A',
  /** Raised surfaces and borders on dark grounds. */
  spruceLight: '#24483F',

  /**
   * Burnt orange. DECORATION ONLY — 3.71:1 on `snow`, which fails WCAG AA for
   * body text. Use it for rims, rules, dots, and borders, never for words.
   */
  ember: '#D4581F',
  /**
   * Accessible accent. 6.15:1 on `snow`, 5.26:1 on `granite`. Use for any accent
   * *text*, link, or button surface that carries `snow` type.
   */
  emberDeep: '#A03C0B',
  /**
   * Pressed / hovered state for a solid `emberDeep` surface. 8.60:1 with `snow`.
   * Hover darkens rather than brightens on purpose: brightening toward `ember`
   * would drop the button label to 3.71:1 the moment a pointer touched it.
   */
  emberDark: '#7C2E08',
  /** Light accent for dark grounds — 9.03:1 on `pitch`, 6.87:1 on `spruce`. */
  emberLight: '#F2A277',

  /** Cool grey-green mid surface — alternating sections. */
  granite: '#E3E5DF',
  /** Lightest ground. Default page background. */
  snow: '#F5F6F3',
  /** Muted secondary text. 6.03:1 on `snow`, 5.15:1 on `granite`. */
  stone: '#55605B',

  /** 5.83:1 on `snow`. */
  success: '#2F6B4A',
  /** 6.38:1 on `snow`. */
  error: '#A33220',
})

/**
 * Font stacks. `Archivo Variable` carries a real width axis (62%–125%), so the
 * condensed display treatment is genuine font data rather than a scale
 * transform — the strokes stay correctly weighted as the letters narrow.
 */
export const fonts = Object.freeze({
  display: "'Archivo Variable', 'Arial Narrow', system-ui, sans-serif",
  body: "'Karla Variable', system-ui, -apple-system, 'Segoe UI', sans-serif",
})
