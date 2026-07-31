import { computed } from 'vue'

import reviewsData from '@/data/reviews.json'

const DAY = 86_400_000
const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

/** Human-readable age of a review, computed at render time so it never goes stale. */
function relativeDate(isoDate) {
  const days = Math.round((new Date(isoDate).getTime() - Date.now()) / DAY)
  if (days > -30) return relative.format(days, 'day')
  if (days > -365) return relative.format(Math.round(days / 30), 'month')
  return relative.format(Math.round(days / 365), 'year')
}

export function useReviews() {
  const reviews = computed(() =>
    [...reviewsData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((review) => ({ ...review, relativeDate: relativeDate(review.date) }))
  )

  const total = computed(() => reviews.value.length)

  const averageRating = computed(() => {
    if (!total.value) return 0
    const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
    return Math.round((sum / total.value) * 10) / 10
  })

  /**
   * True while any seeded placeholder is still in the list. Views use this to
   * show a visible notice, so sample content can never be mistaken for real
   * customer feedback. Delete the placeholder entries and the notice disappears.
   */
  const hasPlaceholders = computed(() => reviews.value.some((review) => review.placeholder))

  function featured(count = 3) {
    return reviews.value.slice(0, count)
  }

  return { reviews, total, averageRating, hasPlaceholders, featured }
}

export default useReviews
