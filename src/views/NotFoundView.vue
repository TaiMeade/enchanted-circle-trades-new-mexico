<script setup>
import { openContactModal } from '@/composables/useContactModal'
import site from '@/config/site'
import BaseButton from '@/components/ui/BaseButton.vue'
import RidgeRule from '@/components/ui/RidgeRule.vue'
</script>

<template>
  <section class="on-dark flex min-h-[70vh] items-center bg-pitch py-24 text-snow">
    <div class="shell">
      <p class="type-label text-ember-light">Error 404</p>
      <RidgeRule class="mt-4 mb-6 text-snow/35" width="3.5rem" />

      <h1 class="type-display text-display sm:text-display-lg max-w-3xl text-balance">
        This page isn't here
      </h1>
      <p class="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-snow/70">
        The site is a single page now, so older links like
        <code>/services</code>
        and
        <code>/reviews</code>
        no longer exist. Everything is in one place instead.
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <BaseButton :to="{ name: 'home' }" size="lg" arrow>Back to the site</BaseButton>
        <BaseButton :href="site.phoneHref" variant="outlineLight" size="lg" icon="phone">
          {{ site.phone }}
        </BaseButton>
        <BaseButton variant="ghost" @click="openContactModal()">Get a free estimate</BaseButton>
      </div>
    </div>
  </section>
</template>
