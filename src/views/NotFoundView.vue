<script setup>
import { openContactModal } from '@/composables/useContactModal'
import BaseButton from '@/components/ui/BaseButton.vue'
import VigaRule from '@/components/ui/VigaRule.vue'
</script>

<template>
  <section class="on-dark flex min-h-[70vh] items-center bg-ink py-24 text-bone">
    <div class="shell">
      <p class="type-label text-adobe-light">Error 404</p>
      <VigaRule class="mt-4 mb-6 text-bone/30" width="3.5rem" />
      <h1 class="type-display text-display sm:text-display-lg max-w-3xl text-balance">
        This page isn't here
      </h1>
      <p class="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-bone/65">
        The link may be out of date, or the address may have a typo in it. The pages below cover
        everything on the site.
      </p>

      <div class="mt-10 flex flex-wrap gap-4">
        <BaseButton :to="{ name: 'home' }" size="lg" arrow>Back to home</BaseButton>
        <BaseButton :to="{ name: 'services' }" variant="outlineLight" size="lg">
          Services
        </BaseButton>
        <BaseButton variant="outlineLight" size="lg" @click="openContactModal()">
          Contact
        </BaseButton>
      </div>
    </div>
  </section>
</template>
