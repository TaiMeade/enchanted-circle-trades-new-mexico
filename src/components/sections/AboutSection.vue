<script setup>
import site from '@/config/site'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'

const { yearsExperience, priorLicense, nmLicensePending, licenseNumber } = site.credentials
</script>

<template>
  <section id="about" class="scroll-mt-20 bg-snow py-20 lg:py-28">
    <div class="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-20">
      <div>
        <SectionHeading eyebrow="Who you're hiring" title="One crew, run by Dave Perez" />

        <div class="mt-8 space-y-5 text-lg leading-relaxed text-pretty text-stone">
          <p>
            {{ yearsExperience }}+ years in the trades, {{ priorLicense }}. Enchanted Circle Trades
            started here in northern New Mexico in {{ site.foundedYear }}.
          </p>
          <p>
            The reason to run a job through one crew is simple: nobody hands your project to the
            next trade and stops answering the phone. Same person quotes it, does it, and picks up
            when you call about it afterwards.
          </p>
        </div>
      </div>

      <!--
        ── Licensing ──
        This business does not hold a New Mexico contractor's license yet, so
        nothing on this site claims one. Saying where it stands is both accurate
        and, for a new business, more convincing than a badge would be. When the
        license is issued, set `nmLicensePending: false` and fill in
        `licenseNumber` in src/config/site.js — this block updates itself.
      -->
      <aside class="border border-spruce/15 bg-granite p-8 lg:sticky lg:top-28 lg:self-start">
        <div class="flex items-center gap-3">
          <AppIcon name="crew" :size="24" class="text-ember-deep" />
          <h3 class="type-display text-lg text-spruce">Licensing, straight</h3>
        </div>

        <p v-if="nmLicensePending" class="mt-5 leading-relaxed text-pretty text-stone">
          Not licensed in New Mexico yet. Licenses do not carry over between states, so it is being
          redone here and is expected by the end of the year. Until then this page says so rather
          than implying otherwise.
        </p>
        <p v-else class="mt-5 leading-relaxed text-pretty text-stone">
          Licensed in the State of New Mexico
          <span v-if="licenseNumber">— license #{{ licenseNumber }}</span>
          .
        </p>

        <p class="mt-5 leading-relaxed text-pretty text-stone">
          Estimates are free either way, and you get the price before anything starts.
        </p>
      </aside>
    </div>
  </section>
</template>
