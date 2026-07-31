<script setup>
import { computed } from 'vue'

import AppIcon from './AppIcon.vue'

const props = defineProps({
  rating: { type: Number, required: true },
  size: { type: [Number, String], default: 16 },
  /** Hide the accessible label when a neighbouring element already states the score. */
  labelled: { type: Boolean, default: true },
})

const stars = computed(() =>
  Array.from({ length: 5 }, (_, i) => {
    const value = props.rating - i
    if (value >= 0.75) return 'star'
    if (value >= 0.25) return 'starHalf'
    return 'starEmpty'
  })
)
</script>

<template>
  <div
    class="flex items-center gap-0.5 text-adobe"
    :role="labelled ? 'img' : undefined"
    :aria-label="labelled ? `${rating} out of 5 stars` : undefined"
    :aria-hidden="labelled ? undefined : 'true'"
  >
    <AppIcon v-for="(kind, i) in stars" :key="i" :name="kind" :size="size" />
  </div>
</template>
