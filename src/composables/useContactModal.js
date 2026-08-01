import { readonly, ref } from 'vue'

/**
 * Contact modal state.
 *
 * The contact form is an overlay rather than a route, so the buttons that open
 * it are scattered across the header, the hero, the CTA band, the service
 * detail pages, and the 404. Module-level state keeps that simple: there is
 * exactly one modal, mounted once in App.vue, and `openContactModal()` is
 * importable from anywhere — no prop drilling, no event bus, no store.
 */
const isOpen = ref(false)

/** Service name to preselect in the form's dropdown. */
const presetService = ref(null)

/**
 * @param {string|null} service Preselects the service picker — pass
 *   `service.name` when opening from a service detail page.
 */
export function openContactModal(service = null) {
  // Guarded because `@click="openContactModal"` (no parens) would otherwise
  // hand us a MouseEvent and quietly poison the dropdown.
  presetService.value = typeof service === 'string' ? service : null
  isOpen.value = true
}

export function closeContactModal() {
  isOpen.value = false
}

export function useContactModal() {
  return {
    isOpen: readonly(isOpen),
    presetService: readonly(presetService),
    openContactModal,
    closeContactModal,
  }
}

export default useContactModal
