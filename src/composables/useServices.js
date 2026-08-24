import servicesData from '@/data/services.json'

/**
 * Trades — one list, many consumers.
 *
 * The trades grid, the footer list, and the contact form's dropdown all read
 * from here. Keeping a second hand-maintained copy anywhere is how names drift
 * out of sync, so derive instead of duplicating.
 */
const services = Object.freeze(servicesData)

/** Option list for the contact form's picker. */
const serviceOptions = Object.freeze([...services.map((s) => s.name), 'Something else'])

export function useServices() {
  return { services, serviceOptions }
}

export default useServices
