<script setup>
/**
 * A peak inside an open circle — the range, and the loop the business is named
 * for. Deliberately not the five-town byway diagram the old mark used: the
 * service area is now all of Taos County, so that shape was no longer true.
 *
 * Strokes inherit `currentColor`; only the lit facet is fixed to `ember`.
 */
defineProps({
  size: { type: Number, default: 32 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <!-- The loop, left open at the top where the peak breaks through it. -->
    <path
      d="M22.8 5.6a13 13 0 1 1-13.6 0"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <!-- The peak. -->
    <path
      d="M6.5 23 16 8.5 25.5 23Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="round"
    />
    <!-- The lit face — the one place orange appears in the mark. -->
    <path d="M16 8.5 25.5 23h-6.2Z" class="fill-ember" />
  </svg>
</template>
