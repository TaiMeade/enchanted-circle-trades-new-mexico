<script setup>
import site, { yearsInBusiness } from '@/config/site'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Four claims the business can actually stand behind. Kept deliberately short —
 * this is a strip, not a section, and every line here has to be verifiable.
 */
const points = [
  {
    icon: 'crew',
    title: `${yearsInBusiness}+ years`,
    body: 'Working on homes across northern New Mexico.',
  },
  {
    icon: 'shield',
    title: 'Licensed & insured',
    body: site.credentials.statement,
  },
  {
    icon: 'wrench',
    title: 'One point of contact',
    body: 'No chasing subcontractors between trades.',
  },
  {
    icon: 'checkCircle',
    title: 'Free written estimates',
    body: 'Priced before the work starts, not after.',
  },
]
</script>

<template>
  <section class="border-b border-basalt/10 bg-sand">
    <ul class="shell grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-14">
      <li v-for="point in points" :key="point.title" class="flex gap-4">
        <AppIcon :name="point.icon" :size="24" class="mt-0.5 text-adobe-deep" />
        <div>
          <p class="type-display text-base leading-none text-basalt">{{ point.title }}</p>
          <p class="mt-2.5 text-sm leading-relaxed text-pretty text-dusk">{{ point.body }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
