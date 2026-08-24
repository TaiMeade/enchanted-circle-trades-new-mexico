<script setup>
import faqs from '@/data/faqs.json'
import SectionHeading from '@/components/layout/SectionHeading.vue'

/*
 * No accordion here, on purpose.
 *
 * These started out as Vuetify expansion panels. Seven short answers do not
 * need hiding, collapsing them means every visitor has to click to read the
 * one that applies to them, and the panels dragged 68 kB of Vuetify's scroll
 * machinery into the initial page load — for a widget whose whole job was
 * hiding four sentences.
 *
 * Laid out flat, everything is readable at a glance, findable with ctrl-F, and
 * present in the DOM for a crawler that never runs the JavaScript.
 */
</script>

<template>
  <section id="faq" class="scroll-mt-20 bg-granite py-20 lg:py-28">
    <div class="shell">
      <SectionHeading eyebrow="Questions" title="The ones we get asked" />

      <dl class="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2 lg:mt-16 lg:gap-x-20">
        <div v-for="faq in faqs" :key="faq.question" class="border-t border-spruce/15 pt-6">
          <dt class="type-display text-lg text-spruce">{{ faq.question }}</dt>
          <dd class="mt-3 leading-relaxed text-pretty text-stone">{{ faq.answer }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
