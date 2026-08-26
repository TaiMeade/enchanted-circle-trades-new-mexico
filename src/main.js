// Self-hosted variable fonts. `wdth` gives Archivo its width axis; Karla only
// ships a weight axis. Both are subset by unicode-range, so browsers download
// only the ranges a visitor actually renders.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/karla/wght.css'

// ── Import order matters, but not for the reason it used to. ──
// main.css now opens with an explicit `@layer` statement that fixes the
// priority of every layer on the page, so it has to be the first stylesheet
// the document sees. Vuetify's CSS lands after it and simply fills in the
// layers that statement already ordered. Do not swap these two lines.
import './styles/main.css'
import 'vuetify/styles'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

createApp(App).use(router).use(vuetify).mount('#app')
