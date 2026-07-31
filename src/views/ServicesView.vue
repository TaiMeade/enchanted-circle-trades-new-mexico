<script setup>
import faqs from '@/data/faqs.json'
import useServices from '@/composables/useServices'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import CtaBand from '@/components/home/CtaBand.vue'

const { services } = useServices()
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Services"
      title="Everything a house needs, from one crew"
      lead="Remodels down to the small repairs that never quite justify their own phone call. If it isn't listed here, ask — the list below is what comes up most, not a limit."
    />

    <section class="bg-bone py-20 lg:py-24">
      <ul class="shell grid gap-px bg-basalt/12 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="service in services" :key="service.slug">
          <ServiceCard :service="service" class="h-full" />
        </li>
      </ul>
    </section>

    <section class="bg-sand py-20 lg:py-24">
      <div class="shell grid gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <SectionHeading eyebrow="Questions" title="Before you call" />

        <v-expansion-panels variant="accordion" flat>
          <v-expansion-panel
            v-for="faq in faqs"
            :key="faq.question"
            :title="faq.question"
            :text="faq.answer"
            class="faq-panel"
          />
        </v-expansion-panels>
      </div>
    </section>

    <CtaBand />
  </div>
</template>

<style scoped>
/* Vuetify's panel chrome is Material by default; flatten it into the page. */
.faq-panel :deep(.v-expansion-panel-title) {
  font-family: var(--font-display);
  font-stretch: 118%;
  font-weight: 700;
  font-size: 1.0625rem;
  padding-block: 1.35rem;
}

.faq-panel :deep(.v-expansion-panel-text__wrapper) {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-dusk);
  padding-inline: 0;
  padding-bottom: 1.5rem;
}

.faq-panel {
  background: transparent;
  border-bottom: 1px solid color-mix(in srgb, var(--color-basalt) 14%, transparent);
}
</style>
