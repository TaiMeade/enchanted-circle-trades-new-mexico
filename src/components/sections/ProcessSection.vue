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
  <section id="how" class="scroll-mt-(--header-h) bg-snow py-12 sm:py-20 lg:py-28">
    <div class="shell">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps, no surprises"
        lead="Estimates are free, and you will know the price before any work starts."
      />

      <!--
        Cards side by side once there are columns; below `sm` the same four
        steps lay down as rows, number in the gutter and the text beside it.
        Turning the card on its side takes the padding out of the stack and
        keeps the numbers in a single scannable column, which is what makes a
        sequence read as one.
      -->
      <ol class="mt-7 grid gap-px bg-spruce/12 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="flex items-start gap-4 bg-snow py-4 sm:flex-col sm:items-stretch sm:gap-0 sm:px-7 sm:py-7 lg:px-8 lg:py-8"
        >
          <div class="flex items-center gap-3 sm:gap-4">
            <span
              class="type-display flex h-9 w-9 shrink-0 items-center justify-center bg-spruce text-base text-snow sm:h-11 sm:w-11 sm:text-lg"
              aria-hidden="true"
            >
              {{ i + 1 }}
            </span>
            <AppIcon
              :name="step.icon"
              :size="26"
              class="h-5 w-5 text-ember-deep sm:h-[26px] sm:w-[26px]"
            />
          </div>

          <div>
            <h3 class="type-display text-lg text-spruce sm:mt-6 sm:text-xl">{{ step.title }}</h3>
            <p class="mt-1.5 leading-relaxed text-pretty text-stone sm:mt-3">{{ step.body }}</p>
          </div>
        </li>
      </ol>

      <!-- The after-hours premium, said plainly rather than discovered later. -->
      <p
        class="mt-7 max-w-3xl border-l-2 border-ember px-4 text-[0.9375rem] leading-relaxed text-pretty text-stone sm:mt-10 sm:px-5 sm:py-1 sm:text-base"
      >
        {{ site.hours.note }}
      </p>
    </div>
  </section>
</template>
