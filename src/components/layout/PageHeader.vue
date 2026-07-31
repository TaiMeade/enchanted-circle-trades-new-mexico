<script setup>
import VigaRule from '@/components/ui/VigaRule.vue'

/** Dark banner at the top of every non-home route. */
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
})
</script>

<template>
  <section class="on-dark bg-ink pt-16 pb-16 text-bone sm:pt-20 sm:pb-20">
    <div class="shell">
      <p v-if="eyebrow" class="type-label text-adobe-light">{{ eyebrow }}</p>
      <VigaRule class="mt-4 mb-6 text-bone/30" width="3.5rem" />
      <h1 class="type-display text-display sm:text-display-lg max-w-4xl text-balance">
        {{ title }}
      </h1>
      <p v-if="lead" class="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-bone/70">
        {{ lead }}
      </p>
      <slot />
    </div>
  </section>
</template>
