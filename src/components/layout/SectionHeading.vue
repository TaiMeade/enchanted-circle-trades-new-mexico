<script setup>
import RidgeRule from '@/components/ui/RidgeRule.vue'

/**
 * The standard section opener: eyebrow, ridge rule, title, optional lead.
 *
 * `tone` only switches text colors — the section itself owns its background.
 */
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  tone: { type: String, default: 'dark', validator: (v) => ['dark', 'light'].includes(v) },
  /** Renders the title as an h3 where the section already has an h2. */
  level: { type: String, default: 'h2' },
})
</script>

<template>
  <div>
    <p
      v-if="eyebrow"
      class="type-label"
      :class="tone === 'light' ? 'text-ember-light' : 'text-ember-deep'"
    >
      {{ eyebrow }}
    </p>

    <RidgeRule
      class="mt-4 mb-6"
      :class="tone === 'light' ? 'text-ember-light/70' : 'text-ember/70'"
      width="4rem"
    />

    <component
      :is="level"
      class="type-display text-display-sm sm:text-display max-w-2xl text-balance"
      :class="tone === 'light' ? 'text-snow' : 'text-spruce'"
    >
      {{ title }}
    </component>

    <p
      v-if="lead"
      class="mt-6 max-w-2xl text-lg leading-relaxed text-pretty"
      :class="tone === 'light' ? 'text-snow/70' : 'text-stone'"
    >
      {{ lead }}
    </p>

    <slot />
  </div>
</template>
