<script setup>
import { computed } from 'vue'

import icons from '@/design/icons'

const props = defineProps({
  /** Key from src/design/icons.js */
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  /**
   * Accessible name. Omit for decorative icons sitting next to visible text —
   * they are hidden from assistive tech by default.
   */
  label: { type: String, default: '' },
})

const path = computed(() => icons[props.name] ?? '')
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    :role="label ? 'img' : undefined"
    :aria-hidden="label ? undefined : 'true'"
    :aria-label="label || undefined"
    focusable="false"
    class="shrink-0"
  >
    <path :d="path" />
  </svg>
</template>
