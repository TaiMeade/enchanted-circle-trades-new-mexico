<script setup>
/**
 * The open ring — an abstraction of the Enchanted Circle byway loop, with a
 * single marker sitting on the arc. Echoes the service-area diagram on the home
 * page, at a size that survives being 28px tall in the header.
 */
defineProps({
  size: { type: [Number, String], default: 28 },
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
    class="shrink-0"
  >
    <!-- Open loop: the gap reads as a road rather than a closed circle. -->
    <circle
      cx="16"
      cy="16"
      r="12"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
      stroke-dasharray="60 15.4"
      stroke-dashoffset="7"
    />
    <!-- Marker on the arc, at Taos's bearing from the center of the loop. -->
    <circle cx="8.45" cy="22.32" r="3.4" class="fill-adobe" />
  </svg>
</template>
