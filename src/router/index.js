import { createRouter, createWebHistory } from 'vue-router'

import site from '@/config/site'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: `${site.shortName} | Contracting & Handyman Services in Taos, NM` },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: `Services | ${site.shortName}` },
  },
  {
    path: '/services/:slug',
    name: 'service-detail',
    component: () => import('@/views/ServiceDetailView.vue'),
    props: true,
  },
  {
    path: '/work',
    name: 'work',
    component: () => import('@/views/WorkView.vue'),
    meta: { title: `Our Work | ${site.shortName}` },
  },
  {
    path: '/reviews',
    name: 'reviews',
    component: () => import('@/views/ReviewsView.vue'),
    meta: { title: `Reviews | ${site.shortName}` },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: `Contact | ${site.shortName}` },
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
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

// Route-level titles. Detail routes set their own once data is resolved.
router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router
