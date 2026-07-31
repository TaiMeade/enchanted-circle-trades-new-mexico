import { nextTick, onBeforeUnmount, watch } from 'vue'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Keeps keyboard focus inside an open overlay and hands it back on close.
 *
 * Without this a Tab press inside the mobile menu walks into the page behind
 * it, which is invisible to a sighted mouse user and completely disorienting
 * for anyone navigating by keyboard or screen reader.
 *
 * @param {import('vue').Ref<HTMLElement|null>} containerRef Element to trap within.
 * @param {import('vue').Ref<boolean>} isActive Whether the overlay is open.
 * @param {() => void} onEscape Called when Escape is pressed.
 */
export function useFocusTrap(containerRef, isActive, onEscape) {
  let previouslyFocused = null

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      onEscape?.()
      return
    }
    if (event.key !== 'Tab' || !containerRef.value) return

    const items = [...containerRef.value.querySelectorAll(FOCUSABLE)].filter(
      (el) => el.offsetParent !== null
    )
    if (!items.length) return

    const first = items[0]
    const last = items[items.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function teardown() {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.removeProperty('overflow')
  }

  watch(isActive, async (active) => {
    if (active) {
      previouslyFocused = document.activeElement
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
      await nextTick()
      containerRef.value?.querySelector(FOCUSABLE)?.focus()
    } else {
      teardown()
      // Return focus to whatever opened the overlay, not to the top of the page.
      previouslyFocused?.focus?.()
      previouslyFocused = null
    }
  })

  onBeforeUnmount(teardown)
}

export default useFocusTrap
