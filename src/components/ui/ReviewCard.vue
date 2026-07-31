<script setup>
import StarRating from './StarRating.vue'

defineProps({
  review: { type: Object, required: true },
  tone: { type: String, default: 'dark', validator: (v) => ['dark', 'light'].includes(v) },
})
</script>

<template>
  <figure
    class="flex h-full flex-col border p-7"
    :class="tone === 'light' ? 'border-bone/15 bg-slate' : 'border-basalt/12 bg-bone'"
  >
    <StarRating :rating="review.rating" :size="17" />

    <blockquote
      class="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-pretty"
      :class="tone === 'light' ? 'text-bone/80' : 'text-basalt/85'"
    >
      {{ review.text }}
    </blockquote>

    <figcaption
      class="mt-6 border-t pt-4"
      :class="tone === 'light' ? 'border-bone/15' : 'border-basalt/12'"
    >
      <p
        class="type-display text-sm leading-none"
        :class="tone === 'light' ? 'text-bone' : 'text-basalt'"
      >
        {{ review.author }}
      </p>
      <p class="type-label mt-2" :class="tone === 'light' ? 'text-bone/55' : 'text-dusk'">
        {{ review.location }} · {{ review.relativeDate }}
      </p>
    </figcaption>
  </figure>
</template>
