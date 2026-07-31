import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { colors } from '@/design/tokens'

/*
 * Vuetify is deliberately a small part of this site — Tailwind drives the
 * design. Vuetify supplies the form controls, the snackbar, and the expansion
 * panels, where its accessibility and validation plumbing is worth having.
 *
 * Components are NOT imported here on purpose. `vuetify({ autoImport: true })`
 * in vite.config.js registers only what templates actually reference; adding an
 * `import * as components` block would silently undo that tree-shaking.
 *
 * Icons use `mdi-svg`, which tree-shakes individual paths out of @mdi/js,
 * rather than the ~1.2 MB @mdi/font webfont.
 */
export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'enchantedCircle',
    themes: {
      enchantedCircle: {
        dark: false,
        colors: {
          primary: colors.adobeDeep,
          secondary: colors.pinon,
          accent: colors.adobe,
          background: colors.bone,
          surface: colors.bone,
          error: colors.error,
          success: colors.success,
        },
      },
    },
  },
  defaults: {
    global: {
      // Square corners throughout; the design has no rounded geometry.
      rounded: 0,
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
      persistentPlaceholder: false,
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
  },
})
