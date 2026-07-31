import { computed, ref } from 'vue'

import projectsData from '@/data/projects.json'

const ALL = 'All work'

export function useProjects() {
  const projects = computed(() =>
    [...projectsData].sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
  )

  /** Category facets, built from the data rather than a second hardcoded list. */
  const categories = computed(() => [
    ALL,
    ...[...new Set(projects.value.map((project) => project.category))].sort(),
  ])

  const activeCategory = ref(ALL)

  const visible = computed(() =>
    activeCategory.value === ALL
      ? projects.value
      : projects.value.filter((project) => project.category === activeCategory.value)
  )

  const featured = computed(() => projects.value.filter((project) => project.featured))

  /** See useReviews — placeholder work is labelled in the UI, never passed off as real. */
  const hasPlaceholders = computed(() => projects.value.some((project) => project.placeholder))

  return { projects, categories, activeCategory, visible, featured, hasPlaceholders, ALL }
}

export default useProjects
