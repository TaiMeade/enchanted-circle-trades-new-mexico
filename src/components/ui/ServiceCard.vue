<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  service: { type: Object, required: true },
})
</script>

<template>
  <RouterLink
    :to="{ name: 'service-detail', params: { slug: service.slug } }"
    class="group relative flex flex-col bg-bone p-7 transition-colors duration-200 hover:bg-sand sm:p-8"
  >
    <!-- Corner tick: the card's own small structural marker. -->
    <span
      class="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-transparent transition-colors duration-200 group-hover:border-adobe"
      aria-hidden="true"
    />

    <AppIcon
      :name="service.icon"
      :size="30"
      class="mb-6 text-adobe-deep transition-transform duration-300 ease-out-quint group-hover:-translate-y-0.5"
    />

    <h3 class="type-display text-xl leading-none text-balance text-basalt">
      {{ service.name }}
    </h3>

    <p class="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-pretty text-dusk">
      {{ service.summary }}
    </p>

    <span class="type-label mt-6 inline-flex items-center gap-2 text-adobe-deep" aria-hidden="true">
      Details
      <AppIcon
        name="arrowRight"
        :size="14"
        class="transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
      />
    </span>
  </RouterLink>
</template>
