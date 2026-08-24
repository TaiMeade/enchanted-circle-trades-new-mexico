import { createRouter, createWebHistory } from 'vue-router'

import site from '@/config/site'
import HomeView from '@/views/HomeView.vue'

/*
 * One page, one route.
 *
 * The site is a single scrolling page; the header navigates it with in-page
 * anchors (#trades, #how, #area, #about, #faq) rather than routes. vue-router
 * stays anyway, and that is deliberate — it costs about ten lines here, and it
 * means adding real pages later (a /services/:slug per trade, say, once there
 * is confirmed copy for them) is a route entry plus a view, not a rewrite.
 *
 * The catch-all matters more than usual right now: /services, /services/:slug,
 * /work, /reviews and /contact were all live URLs on this domain until this
 * change, so anything already linked or indexed lands on NotFoundView.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: `${site.shortName} | Contracting & Handyman Services in Taos, NM` },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: `Page not found | ${site.shortName}` },
  },
]

const router = createRouter({
  // BASE_URL comes from `base` in vite.config.js, so routes resolve correctly
  // under the GitHub Pages project path.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      /*
       * Deliberately async. On a cold load of a URL that already carries a hash
       * — someone opening a shared /#faq link — this runs before the app has
       * mounted, so `#faq` does not exist yet and vue-router silently gives up,
       * landing the visitor at the top of the page. Resolving on the next task
       * gives the sections time to render.
       */
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 0)
      })
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
