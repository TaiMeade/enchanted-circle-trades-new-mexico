<script setup>
import PlaceholderPattern from './PlaceholderPattern.vue'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <article class="group flex flex-col">
    <div class="relative aspect-4/3 overflow-hidden bg-basalt">
      <img
        v-if="project.images.length"
        :src="project.images[0]"
        :alt="`${project.title} — ${project.location}`"
        loading="lazy"
        decoding="async"
        width="800"
        height="600"
        class="h-full w-full object-cover transition-transform duration-500 ease-out-quint group-hover:scale-[1.03]"
      />
      <PlaceholderPattern v-else :seed="project.id" />

      <span
        class="type-label absolute top-0 left-0 bg-basalt/90 px-3 py-2 text-bone backdrop-blur-sm"
      >
        {{ project.category }}
      </span>

      <span
        v-if="project.placeholder"
        class="type-label absolute right-0 bottom-0 bg-adobe px-3 py-2 text-bone"
      >
        Sample
      </span>
    </div>

    <h3 class="type-display mt-5 text-lg leading-none text-balance text-basalt">
      {{ project.title }}
    </h3>

    <p class="type-label mt-2.5 text-dusk">{{ project.location }} · {{ project.year }}</p>

    <p class="mt-3 text-[0.9375rem] leading-relaxed text-pretty text-dusk">
      {{ project.summary }}
    </p>
  </article>
</template>
