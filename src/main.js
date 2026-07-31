// Self-hosted variable fonts. `wdth` gives Archivo its width axis; Karla only
// ships a weight axis. Both are subset by unicode-range, so browsers download
// only the ranges a visitor actually renders.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/karla/wght.css'

// ── Import order matters. ──
// Vuetify registers its cascade layers (vuetify-core, vuetify-components, …)
// when its stylesheet lands. Loading it first means Tailwind's layers, declared
// by `@import "tailwindcss"` inside main.css, are registered afterwards and so
// take precedence. Swapping these two lines makes Vuetify override every
// Tailwind utility.
import 'vuetify/styles'
import './styles/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App).use(router).use(vuetify).mount('#app')
