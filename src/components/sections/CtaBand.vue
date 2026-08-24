<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import BaseButton from '@/components/ui/BaseButton.vue'
import RidgeRule from '@/components/ui/RidgeRule.vue'
</script>

<template>
  <section class="on-dark bg-pitch py-20 text-snow lg:py-24">
    <div class="shell">
      <RidgeRule class="text-ember" width="5rem" />

      <h2 class="type-display text-display-sm sm:text-display mt-7 max-w-2xl text-balance">
        Tell us what needs doing
      </h2>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-snow/70">
        Calling is fastest — you'll hear back {{ site.responseTime }}. Or send the details and
        photos and we'll come back to you.
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <BaseButton :href="site.phoneHref" size="lg" icon="phone">{{ site.phone }}</BaseButton>
        <BaseButton variant="outlineLight" size="lg" arrow @click="openContactModal()">
          Get a free estimate
        </BaseButton>
      </div>
    </div>
  </section>
</template>
