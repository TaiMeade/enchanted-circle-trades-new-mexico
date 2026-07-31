<script setup>
import { computed } from 'vue'

/**
 * Stand-in artwork for a project that has no photograph yet.
 *
 * Deliberately abstract: a geometric band pattern drawn from the site palette,
 * not a stock photo. A stock image here would imply the business did work it
 * has not done. The pattern is generated from the project's id, so each card
 * looks distinct and stays stable between renders.
 */
const props = defineProps({
  seed: { type: String, required: true },
})

/** Small deterministic hash so the same id always yields the same bands. */
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

const BAND_COLORS = ['#C6663D', '#8F4526', '#4A5D46', '#E8DFD3', '#6E5F52']

const bands = computed(() => {
  const h = hash(props.seed)
  const count = 7
  return Array.from({ length: count }, (_, i) => {
    const n = Math.floor(h / 7 ** i)
    return {
      color: BAND_COLORS[n % BAND_COLORS.length],
      height: 4 + (n % 5) * 3,
      inset: (n % 4) * 6,
    }
  })
})
</script>

<template>
  <svg
    viewBox="0 0 120 90"
    preserveAspectRatio="none"
    class="h-full w-full bg-basalt"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Horizontal bands, echoing Río Grande weaving. -->
    <g>
      <rect
        v-for="(band, i) in bands"
        :key="i"
        :x="band.inset"
        :y="i * 13 + 4"
        :width="120 - band.inset * 2"
        :height="band.height"
        :fill="band.color"
        :opacity="0.75"
      />
    </g>
  </svg>
</template>
