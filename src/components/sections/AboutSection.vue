<script setup>
import site from '@/config/site'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'

const { yearsExperience, priorWork } = site.credentials

/**
 * The scan card beside the copy. Every value is derived from src/config/site.js
 * rather than typed here, so changing a business fact in one place changes this
 * card too.
 */
const facts = [
  { label: 'In the trades', value: `${yearsExperience}+ years` },
  { label: 'Based in', value: `${site.address.city}, New Mexico` },
  { label: 'Callbacks', value: 'Within a few hours' },
  { label: 'Estimates', value: 'Free, and in writing' },
]
</script>

<template>
  <section id="about" class="scroll-mt-(--header-h) bg-snow py-12 sm:py-20 lg:py-28">
    <div class="shell grid gap-8 sm:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
      <div>
        <SectionHeading eyebrow="Who you're hiring" title="One crew, run by Dave Perez" />

        <div
          class="mt-5 space-y-4 leading-relaxed text-pretty text-stone sm:mt-8 sm:space-y-5 sm:text-lg"
        >
          <p>
            {{ yearsExperience }}+ years in the trades, {{ priorWork }}. Enchanted Circle Trades
            started here in northern New Mexico in {{ site.foundedYear }}.
          </p>
          <p>
            The reason to run a job through one crew is simple: nobody hands your project to the
            next trade and stops answering the phone. Same person quotes it, does it, and picks up
            when you call about it afterwards.
          </p>
        </div>
      </div>

      <aside
        class="border border-spruce/15 bg-granite p-5 sm:p-8 lg:sticky lg:top-28 lg:self-start"
      >
        <div class="flex items-center gap-3">
          <AppIcon name="crew" :size="24" class="text-ember-deep" />
          <h3 class="type-display text-lg text-spruce">At a glance</h3>
        </div>

        <dl class="mt-4 border-t border-spruce/12 sm:mt-6">
          <div
            v-for="fact in facts"
            :key="fact.label"
            class="flex items-baseline justify-between gap-6 border-b border-spruce/12 py-2.5 sm:py-4"
          >
            <dt class="type-label text-stone">{{ fact.label }}</dt>
            <dd class="text-right font-medium text-spruce">{{ fact.value }}</dd>
          </div>
        </dl>
      </aside>
    </div>
  </section>
</template>
