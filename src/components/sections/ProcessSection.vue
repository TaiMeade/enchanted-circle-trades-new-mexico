<script setup>
import site from '@/config/site'
import SectionHeading from '@/components/layout/SectionHeading.vue'

/**
 * The only numbered list on this site.
 *
 * Numbers earn their place here because this genuinely is a sequence — it is
 * how the business actually runs a job, described by the owner, step by step.
 * Nothing else on the page is ordered, so nothing else is numbered.
 *
 * There are no icons on these steps, deliberately. A numeral and a glyph
 * sitting side by side both say "item N of a process", and the numeral says it
 * better; the glyphs were four generic outlines doing nothing the words above
 * them weren't already doing.
 */
const steps = [
  {
    title: 'You call',
    body: `We'll ask where you are and what seems to be going on. You'll hear back ${site.responseTime}.`,
  },
  {
    title: 'We find a time',
    body: 'Scheduling happens on the first call, around what works for both of us.',
  },
  {
    title: 'We come and look',
    body: 'An in-person look at the job, at no charge, so the price is based on what is actually there.',
  },
  {
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
        ── Why this is a traverse and not a grid of cards ──

        The trades section directly above is twelve tiles drawn with `gap-px`
        over a tinted background, and the service area below is the same device
        again. Those are sets of peers, and the grid says so. This section is
        the one thing on the page that is a sequence, and drawing it the same
        way made it read as a third grid of interchangeable things — leaving
        the numerals to carry an idea the layout was actively contradicting.

        So: no cell dividers, no tinted ground. One hairline runs along the
        top of the row and the steps hang beneath it as stations along a single
        run. The line is unbroken on purpose — the columns carry no `gap-x` and
        space each other with their own right padding instead, so each step's
        `border-t` meets its neighbour's rather than leaving four stubs. The
        numerals are the section's one accent, large and in ember; everything
        else stays quiet. That also makes this the open, typographic section on
        a page that is otherwise tiles, which the rhythm of the page needed.

        Below `sm` the numeral moves beside the text rather than above it. That
        is the old layout's good idea and it is kept: turning the row on its
        side takes the padding out of the stack, and four numerals stacked over
        four headings costs a couple of hundred pixels of scrolling on a phone
        to say nothing new.
      -->
      <ol class="mt-8 grid gap-y-7 sm:mt-12 sm:grid-cols-2 sm:gap-y-12 lg:mt-16 lg:grid-cols-4">
        <li
          v-for="(step, i) in steps"
          :key="step.title"
          class="flex items-start gap-4 border-t border-spruce/20 pt-4 sm:block sm:pt-5 sm:pr-8 lg:pr-10"
        >
          <!--
            Decorative: the <ol> already announces "item 2 of 4" to a screen
            reader, so reading the numeral out loud would say it twice.
          -->
          <p
            class="type-display w-9 shrink-0 text-[2rem] leading-none text-ember-deep sm:w-auto sm:text-display-sm lg:text-[2.75rem]"
            aria-hidden="true"
          >
            {{ i + 1 }}
          </p>

          <div>
            <h3 class="type-display mt-0.5 text-lg text-spruce sm:mt-5 sm:text-xl">
              {{ step.title }}
            </h3>
            <p class="mt-1.5 leading-relaxed text-pretty text-stone sm:mt-3">{{ step.body }}</p>
          </div>
        </li>
      </ol>

      <!--
        The two things that can still move the number after step four. Side by
        side under their own rule, and both opening with a plain run-in
        sidehead: they were previously two identically ruled paragraphs stacked
        on top of each other, only one of which was labelled, which is what
        made them read as leftovers rather than as the terms of the job.
      -->
      <div
        class="mt-12 grid gap-6 border-t border-spruce/20 pt-6 sm:mt-16 sm:grid-cols-2 sm:gap-10 sm:pt-8"
      >
        <p
          class="max-w-[34rem] text-[0.9375rem] leading-relaxed text-pretty text-stone sm:text-base"
        >
          <strong class="font-semibold text-spruce">Transparency.</strong>
          Due to the nature of this kind of work, unforeseen issues may arise and estimates may not
          reflect the total cost of completion. Integrity and transparency are a staple of our
          company. Anything that comes up is addressed and discussed with our clients before any
          decisions are made that could affect additional costs.
        </p>

        <p
          class="max-w-[34rem] text-[0.9375rem] leading-relaxed text-pretty text-stone sm:text-base"
        >
          <strong class="font-semibold text-spruce">Hours and rates.</strong>
          {{ site.hours.note }}
        </p>
      </div>
    </div>
  </section>
</template>
