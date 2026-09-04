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
 *
 * ── Two densities ──
 * Below `sm` the tile is icon and name only, two to a row. Twelve descriptions
 * stacked one per row ran to about eight phone screens of copy that nobody was
 * going to read on the way to the phone number — and the names of these trades
 * are not words anyone needs explained. The summaries come back the moment
 * there is a second column to put them in.
 */
defineProps({
  service: { type: Object, required: true },
})
</script>

<template>
  <button
    type="button"
    class="group flex h-full w-full flex-col bg-snow p-4 text-left transition-colors duration-200 hover:bg-granite active:bg-granite sm:px-6 sm:py-6 lg:px-7 lg:py-7"
    @click="openContactModal(service.name)"
  >
    <AppIcon :name="service.icon" :size="28" class="h-6 w-6 text-ember-deep sm:h-7 sm:w-7" />
    <h3 class="type-display mt-3 text-[0.9375rem] text-spruce sm:mt-5 sm:text-lg">
      {{ service.name }}
    </h3>
    <p class="mt-2 hidden text-[0.9375rem] leading-relaxed text-pretty text-stone sm:block">
      {{ service.summary }}
    </p>

    <!--
      Twelve tiles each shouting "Get an estimate" turns the grid into noise, so
      the affordance is a corner arrow that wakes up on hover and focus. The
      section lead says what tapping one does; screen readers get it from the
      button's own accessible name below.

      Hidden in the compact layout: with no summary under the name there is no
      corner for it to sit in, and it would be the tallest thing in the tile.
    -->
    <span
      class="mt-auto hidden items-center pt-6 text-spruce/35 transition-colors duration-200 group-hover:text-ember-deep group-focus-visible:text-ember-deep sm:flex"
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
