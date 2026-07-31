<script setup>
import useServices from '@/composables/useServices'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'

const { featured } = useServices()
</script>

<template>
  <section class="bg-bone py-20 lg:py-28">
    <div class="shell">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we do"
          title="Most jobs need more than one trade"
          lead="Which is usually where things stall — waiting on a plumber, then an electrician, then someone to patch the wall behind them. Running it through one crew is the whole point."
        />
        <BaseButton :to="{ name: 'services' }" variant="outline" class="shrink-0" arrow>
          All services
        </BaseButton>
      </div>

      <ul class="mt-14 grid gap-px bg-basalt/12 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="service in featured" :key="service.slug">
          <ServiceCard :service="service" class="h-full" />
        </li>
      </ul>
    </div>
  </section>
</template>
