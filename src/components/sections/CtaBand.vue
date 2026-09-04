<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import BaseButton from '@/components/ui/BaseButton.vue'
import RidgeRule from '@/components/ui/RidgeRule.vue'
</script>

<template>
  <section class="on-dark bg-pitch py-14 text-snow sm:py-20 lg:py-24">
    <div class="shell">
      <RidgeRule class="text-ember" width="5rem" />

      <h2 class="type-display text-display-sm sm:text-display mt-5 max-w-2xl text-balance sm:mt-7">
        Tell us what needs doing
      </h2>
      <p class="mt-4 max-w-xl leading-relaxed text-pretty text-snow/70 sm:mt-6 sm:text-lg">
        Calling is fastest — you'll hear back {{ site.responseTime }}. Or send the details and
        photos and we'll come back to you.
      </p>

      <div class="mt-7 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-3">
        <BaseButton :href="site.phoneHref" size="lg" icon="phone">{{ site.phone }}</BaseButton>
        <BaseButton variant="outlineLight" size="lg" arrow @click="openContactModal()">
          Get a free estimate
        </BaseButton>
      </div>
    </div>
  </section>
</template>
