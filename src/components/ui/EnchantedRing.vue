<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

import site from '@/config/site'

/**
 * The Enchanted Circle service-area ring.
 *
 * The byway is an 83-mile loop formed by US-64, NM-38, and NM-522, and the
 * service area really is that circle — so this is a diagram of the actual
 * geography, not a decorative circle with evenly spaced dots on it. Each town
 * sits at its true compass bearing from the centre of the loop (the bearings
 * live in src/config/site.js), which is why the spacing is uneven.
 *
 * The ring is drawn as SVG and hidden from assistive technology; the towns are
 * real HTML buttons positioned over it, so keyboard and screen-reader users get
 * proper controls rather than SVG shapes pretending to be interactive.
 */

const VIEW = 400
const CENTER = VIEW / 2
const RING_R = 128
const TICK_OUT = 16
/** Label orbit, as a percentage of the square container. */
const LABEL_ORBIT = 40

const CIRCUMFERENCE = 2 * Math.PI * RING_R

const toRad = (bearing) => (bearing * Math.PI) / 180

const towns = computed(() =>
  site.serviceArea.map((town) => {
    const rad = toRad(town.bearing)
    const sin = Math.sin(rad)
    const cos = Math.cos(rad)
    return {
      ...town,
      // SVG coordinates for the dot and its outward tick.
      dot: { x: CENTER + sin * RING_R, y: CENTER - cos * RING_R },
      tick: {
        x1: CENTER + sin * RING_R,
        y1: CENTER - cos * RING_R,
        x2: CENTER + sin * (RING_R + TICK_OUT),
        y2: CENTER - cos * (RING_R + TICK_OUT),
      },
      // Percentage coordinates for the HTML label overlay.
      label: { left: 50 + sin * LABEL_ORBIT, top: 50 - cos * LABEL_ORBIT },
    }
  })
)

const active = ref(null)
const drawn = ref(false)
const root = ref(null)

let observer = null

onMounted(() => {
  if (!root.value) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        drawn.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.35 }
  )
  observer.observe(root.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div ref="root">
    <!-- Ring: needs room to breathe, so it only renders at sm and up. -->
    <div class="relative mx-auto hidden aspect-square w-full max-w-lg sm:block">
      <svg
        :viewBox="`0 0 ${VIEW} ${VIEW}`"
        class="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <!-- Faint full circle so the loop reads before the stroke animates in. -->
        <circle
          :cx="CENTER"
          :cy="CENTER"
          :r="RING_R"
          fill="none"
          stroke="currentColor"
          stroke-width="1"
          class="text-bone/12"
        />

        <!-- The byway itself, drawn on first scroll into view. -->
        <circle
          :cx="CENTER"
          :cy="CENTER"
          :r="RING_R"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          class="ring-road text-adobe"
          :class="{ 'is-drawn': drawn }"
          :style="{ '--circumference': CIRCUMFERENCE }"
        />

        <g v-for="town in towns" :key="town.name">
          <line
            :x1="town.tick.x1"
            :y1="town.tick.y1"
            :x2="town.tick.x2"
            :y2="town.tick.y2"
            stroke="currentColor"
            stroke-width="1.5"
            class="transition-colors duration-200"
            :class="active === town.name ? 'text-adobe' : 'text-bone/25'"
          />
          <circle
            :cx="town.dot.x"
            :cy="town.dot.y"
            :r="active === town.name ? 9 : 6"
            class="transition-all duration-200"
            :class="active === town.name ? 'fill-adobe' : 'fill-bone'"
          />
        </g>
      </svg>

      <!-- Centre readout. Swaps to the focused town, falls back to the summary. -->
      <div
        class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-16 text-center"
      >
        <Transition mode="out-in" name="readout">
          <div v-if="active" :key="active">
            <p class="type-display text-2xl text-bone">{{ active }}</p>
            <p class="mt-2 text-sm text-bone/55">
              {{ towns.find((t) => t.name === active)?.note }}
            </p>
          </div>
          <div v-else key="summary">
            <p class="type-display text-5xl leading-none text-bone">83</p>
            <p class="type-label mt-3 text-bone/55">Miles of loop</p>
            <p class="mt-4 text-xs leading-relaxed text-bone/55">US-64 · NM-38 · NM-522</p>
          </div>
        </Transition>
      </div>

      <!-- Town controls, positioned at each town's real bearing. -->
      <button
        v-for="town in towns"
        :key="town.name"
        type="button"
        class="type-label absolute px-2 py-1 whitespace-nowrap transition-colors duration-200"
        :class="active === town.name ? 'text-adobe-light' : 'text-bone/70 hover:text-bone'"
        :style="{
          left: `${town.label.left}%`,
          top: `${town.label.top}%`,
          transform: 'translate(-50%, -50%)',
        }"
        :aria-pressed="active === town.name"
        @mouseenter="active = town.name"
        @mouseleave="active = null"
        @focus="active = town.name"
        @blur="active = null"
      >
        {{ town.name }}
        <span class="sr-only">— {{ town.note }}</span>
      </button>
    </div>

    <!-- Below sm the radial layout is unreadable, so the same data is a list. -->
    <ul class="divide-y divide-bone/12 border-y border-bone/12 sm:hidden">
      <li
        v-for="town in towns"
        :key="town.name"
        class="flex items-baseline justify-between gap-4 py-4"
      >
        <span class="type-display text-lg text-bone">{{ town.name }}</span>
        <span class="text-right text-sm text-bone/55">{{ town.note }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.ring-road {
  stroke-dasharray: calc(var(--circumference) * 1px);
  stroke-dashoffset: calc(var(--circumference) * 1px);
  /* Start at the top of the circle so the loop draws clockwise from north. */
  transform: rotate(-90deg);
  transform-origin: center;
  transition: stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.ring-road.is-drawn {
  stroke-dashoffset: 0;
}

.readout-enter-active,
.readout-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.readout-enter-from,
.readout-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
