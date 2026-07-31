<script setup>
import VigaRule from '@/components/ui/VigaRule.vue'

/**
 * The one section heading used everywhere.
 *
 * Exists so the eyebrow / rule / title / lead treatment lives in a single place
 * instead of being re-declared in every section's scoped styles, which is how
 * headings quietly drift apart from each other.
 */
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  /** `light` for dark-ground sections. */
  tone: { type: String, default: 'dark', validator: (v) => ['dark', 'light'].includes(v) },
  align: { type: String, default: 'start', validator: (v) => ['start', 'center'].includes(v) },
  as: { type: String, default: 'h2' },
})
</script>

<template>
  <div :class="align === 'center' ? 'flex flex-col items-center text-center' : ''">
    <p
      v-if="eyebrow"
      class="type-label mb-4"
      :class="tone === 'light' ? 'text-adobe-light' : 'text-adobe-deep'"
    >
      {{ eyebrow }}
    </p>

    <VigaRule
      class="mb-5"
      :class="tone === 'light' ? 'text-bone/35' : 'text-basalt/25'"
      width="3.5rem"
    />

    <component
      :is="as"
      class="type-display text-display-sm sm:text-display text-balance"
      :class="tone === 'light' ? 'text-bone' : 'text-basalt'"
    >
      {{ title }}
    </component>

    <p
      v-if="lead"
      class="mt-5 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg"
      :class="tone === 'light' ? 'text-bone/70' : 'text-dusk'"
    >
      {{ lead }}
    </p>

    <slot />
  </div>
</template>
