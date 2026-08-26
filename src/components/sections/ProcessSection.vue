<script setup>
import site from '@/config/site'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'

/**
 * The only numbered list on this site.
 *
 * Numbers earn their place here because this genuinely is a sequence — it is
 * how the business actually runs a job, described by the owner, step by step.
 * Nothing else on the page is ordered, so nothing else is numbered.
 */
const steps = [
  {
    icon: 'call',
    title: 'You call',
    body: `We'll ask where you are and what seems to be going on. You'll hear back ${site.responseTime}.`,
  },
  {
    icon: 'schedule',
    title: 'We find a time',
    body: 'Scheduling happens on the first call, around what works for both of us.',
  },
  {
    icon: 'inspect',
    title: 'We come and look',
    body: 'An in-person look at the job, at no charge, so the price is based on what is actually there.',
  },
  {
    icon: 'quote',
    title: 'You get a price',
    body: 'On the spot when we can. If materials need pricing or sourcing first, within a few days.',
  },
]
</script>

<template>
  <section id="how" class="scroll-mt-20 bg-snow py-20 lg:py-28">
    <div class="shell">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps, no surprises"
        lead="Estimates are free, and you will know the price before any work starts."
      />

      <ol class="mt-14 grid gap-px bg-spruce/12 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(step, i) in steps" :key="step.title" class="flex flex-col bg-snow p-7 lg:p-8">
          <div class="flex items-center gap-4">
            <span
              class="type-display flex h-11 w-11 shrink-0 items-center justify-center bg-spruce text-lg text-snow"
              aria-hidden="true"
            >
              {{ i + 1 }}
            </span>
            <AppIcon :name="step.icon" :size="26" class="text-ember-deep" />
          </div>
          <h3 class="type-display mt-6 text-xl text-spruce">{{ step.title }}</h3>
          <p class="mt-3 leading-relaxed text-pretty text-stone">{{ step.body }}</p>
        </li>
      </ol>

      <!-- The after-hours premium, said plainly rather than discovered later. -->
      <p
        class="mt-10 max-w-3xl border-l-2 border-ember px-5 py-1 leading-relaxed text-pretty text-stone"
      >
        {{ site.hours.note }}
      </p>
    </div>
  </section>
</template>
