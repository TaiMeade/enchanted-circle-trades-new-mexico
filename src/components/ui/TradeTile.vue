<script setup>
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * One trade.
 *
 * Tapping it opens the estimate form with that trade already chosen — the tile
 * knows the answer, so the visitor shouldn't be asked it again. It is a real
 * <button> rather than a card with a click handler so it lands in the tab order
 * and announces itself correctly.
 */
defineProps({
  service: { type: Object, required: true },
})
</script>

<template>
  <button
    type="button"
    class="group flex h-full w-full flex-col bg-snow p-6 text-left transition-colors duration-200 hover:bg-granite lg:p-7"
    @click="openContactModal(service.name)"
  >
    <AppIcon :name="service.icon" :size="28" class="text-ember-deep" />
    <h3 class="type-display mt-5 text-lg text-spruce">{{ service.name }}</h3>
    <p class="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-stone">
      {{ service.summary }}
    </p>

    <!--
      Twelve tiles each shouting "Get an estimate" turns the grid into noise, so
      the affordance is a corner arrow that wakes up on hover and focus. The
      section lead says what tapping one does; screen readers get it from the
      button's own accessible name below.
    -->
    <span
      class="mt-auto flex items-center pt-6 text-spruce/35 transition-colors duration-200 group-hover:text-ember-deep group-focus-visible:text-ember-deep"
      aria-hidden="true"
    >
      <AppIcon
        name="arrowRight"
        :size="20"
        class="transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
      />
    </span>
    <span class="sr-only">— get a free estimate for {{ service.name.toLowerCase() }}</span>
  </button>
</template>
