<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import BaseButton from '@/components/ui/BaseButton.vue'
import VigaRule from '@/components/ui/VigaRule.vue'
</script>

<template>
  <section class="on-dark bg-adobe-deep py-16 text-bone lg:py-20">
    <div class="shell flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <VigaRule class="mb-6 text-bone/40" width="3.5rem" />
        <h2 class="type-display text-display-sm sm:text-display max-w-xl text-balance">
          Tell us what needs doing
        </h2>
        <p class="mt-5 max-w-lg text-lg leading-relaxed text-pretty text-bone/80">
          Send over the details and photos if you have them. You'll get a written estimate back,
          free, with no obligation to book.
        </p>
      </div>

      <div class="flex shrink-0 flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
        <BaseButton
          size="lg"
          class="bg-bone! text-ink! hover:bg-basalt! hover:text-bone!"
          arrow
          @click="openContactModal()"
        >
          Get a free estimate
        </BaseButton>
        <BaseButton :href="site.phoneHref" variant="outlineLight" size="lg" icon="phone">
          {{ site.phone }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
