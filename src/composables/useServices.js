import { computed } from 'vue'

import servicesData from '@/data/services.json'

/**
 * Services — one list, many consumers.
 *
 * The services grid, the detail routes, the footer, and the contact form's
 * dropdown all read from here. Keeping a second hand-maintained copy anywhere
 * is how service names drift out of sync, so derive instead of duplicating.
 */
const services = Object.freeze(servicesData)

export function useServices() {
  const featured = computed(() => services.filter((service) => service.featured))

  /** Option list for the contact form's service picker. */
  const serviceOptions = computed(() => [
    ...services.map((service) => service.name),
    'Something else',
  ])

  function getBySlug(slug) {
    return services.find((service) => service.slug === slug) ?? null
  }

  return { services, featured, serviceOptions, getBySlug }
}

export default useServices
