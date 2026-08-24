<script setup>
import { RULE_TOOTH } from '@/design/ridgeline'

/**
 * Section divider: the ridgeline reduced to a row of peaks.
 *
 * Takes its color from `currentColor`, so it inherits whatever text color the
 * surrounding section already sets rather than needing a tone prop.
 */
defineProps({
  /** CSS length. Defaults to a short rule sitting under a section eyebrow. */
  width: { type: String, default: '4rem' },
})

// A pattern id has to be unique per document or the first one wins everywhere.
const id = `ridge-rule-${Math.random().toString(36).slice(2, 9)}`
</script>

<template>
  <svg
    :style="{ width, height: `${RULE_TOOTH.height}px` }"
    :height="RULE_TOOTH.height"
    aria-hidden="true"
    focusable="false"
    class="block overflow-visible"
  >
    <defs>
      <pattern
        :id="id"
        :width="RULE_TOOTH.width"
        :height="RULE_TOOTH.height"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="RULE_TOOTH.path"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="miter"
        />
      </pattern>
    </defs>
    <rect width="100%" :height="RULE_TOOTH.height" :fill="`url(#${id})`" />
  </svg>
</template>
