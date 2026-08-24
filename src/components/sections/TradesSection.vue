<script setup>
import useServices from '@/composables/useServices'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import TradeTile from '@/components/ui/TradeTile.vue'

const { services } = useServices()
</script>

<template>
  <section id="trades" class="scroll-mt-20 bg-granite py-20 lg:py-28">
    <div class="shell">
      <SectionHeading
        eyebrow="What we do"
        title="Twelve trades, one crew"
        lead="Most jobs need more than one trade, and that is usually where they stall — waiting on a plumber, then an electrician, then someone to patch the wall behind them. Pick the one you need and we'll start an estimate for it."
      />

      <!--
        gap-px over a tinted background paints hairline dividers between tiles
        without a border on every edge, so the grid reads as one block.
      -->
      <ul
        class="mt-12 grid gap-px border border-spruce/12 bg-spruce/12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 xl:grid-cols-4"
      >
        <li v-for="service in services" :key="service.slug">
          <TradeTile :service="service" />
        </li>
      </ul>

      <p class="mt-8 text-[0.9375rem] text-stone">
        Not on the list? Ask anyway — if it is work on a house, it is worth a call.
      </p>
    </div>
  </section>
</template>
