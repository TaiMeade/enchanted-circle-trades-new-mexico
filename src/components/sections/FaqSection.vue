<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import faqs from '@/data/faqs.json'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'

/*
 * ── Flat on desktop, disclosure on a phone ──
 *
 * These started life as Vuetify expansion panels, and those went away for good
 * reasons that still hold: six short answers do not need hiding on a screen
 * wide enough to set them in two columns, and the panels dragged 68 kB of
 * Vuetify's scroll machinery into the initial load to hide four sentences.
 *
 * On a phone the arithmetic flips. Two columns become one, and the same six
 * answers run to most of a screen each — a wall of text between a visitor and
 * the phone number at the bottom of the page. So below `md` they collapse.
 *
 * What that objection was really about was the cost, and this version has
 * none: native <details>, no library, no JS to open one. The answers stay in
 * the DOM for a crawler and for ctrl-F either way, and `alwaysOpen` starts
 * true so a browser that never runs this script renders every one expanded.
 */
const DESKTOP = '(min-width: 48rem)'

const alwaysOpen = ref(true)
let query = null

function sync() {
  alwaysOpen.value = query.matches
}

onMounted(() => {
  query = window.matchMedia(DESKTOP)
  sync()
  query.addEventListener('change', sync)
})

onBeforeUnmount(() => query?.removeEventListener('change', sync))

/**
 * At desktop widths the summary is a heading, not a control — clicking a
 * question there should select the words, not fold the answer away.
 */
function onSummaryClick(event) {
  if (alwaysOpen.value) event.preventDefault()
}
</script>

<template>
  <section id="faq" class="scroll-mt-(--header-h) bg-granite py-12 sm:py-20 lg:py-28">
    <div class="shell">
      <SectionHeading eyebrow="Questions" title="Frequently Asked" />

      <!--
        gap-y-px over the tinted container paints the hairlines between the
        collapsed rows; at `md` the rows separate and each takes its own rule.
      -->
      <div
        class="mt-7 grid gap-y-px bg-spruce/15 sm:mt-12 md:grid-cols-2 md:gap-x-14 md:gap-y-10 md:bg-transparent lg:mt-16 lg:gap-x-20"
      >
        <details
          v-for="faq in faqs"
          :key="faq.question"
          :open="alwaysOpen"
          class="faq bg-granite md:border-t md:border-spruce/15 md:pt-6"
        >
          <summary
            class="type-display flex list-none items-center justify-between gap-4 py-3.5 text-[1.0625rem] text-spruce md:py-0 md:text-lg"
            @click="onSummaryClick"
          >
            {{ faq.question }}
            <AppIcon
              name="chevronDown"
              :size="20"
              class="chev shrink-0 text-ember-deep transition-transform duration-200 md:hidden"
            />
          </summary>
          <p
            class="pb-4 text-[0.9375rem] leading-relaxed text-pretty text-stone md:mt-3 md:pb-0 md:text-base"
          >
            {{ faq.answer }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * `list-none` clears the marker in Chrome and Firefox; Safari needs the
 * pseudo-element. Both, or the row gets a stray triangle.
 */
.faq > summary::-webkit-details-marker {
  display: none;
}

.faq > summary {
  cursor: pointer;
}

.faq[open] .chev {
  transform: rotate(180deg);
}

@media (width >= 48rem) {
  .faq > summary {
    cursor: auto;
  }
}
</style>
