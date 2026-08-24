import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Marks which section of a one-page site is currently being read, so the header
 * nav can show where you are.
 *
 * Works by watching a thin horizontal band across the middle of the viewport
 * rather than the top edge: a section counts as "current" once it reaches the
 * middle of the screen, which is where someone is actually looking. Watching
 * the top edge instead makes the indicator jump a section early on tall
 * screens and feel broken.
 *
 * @param {string[]} ids Section element ids, in document order.
 * @returns {import('vue').Ref<string>} The active id, or '' near the top of the page.
 */
export function useScrollSpy(ids) {
  const active = ref('')
  let observer = null

  onMounted(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el) => el instanceof HTMLElement)

    if (!sections.length || !('IntersectionObserver' in window)) return

    const visible = new Set()

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        // Document order, not intersection order — entries arrive in whatever
        // sequence the browser noticed them.
        active.value = ids.find((id) => visible.has(id)) ?? ''
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    for (const section of sections) observer.observe(section)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}

export default useScrollSpy
