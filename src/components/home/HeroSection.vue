<script setup>
import site from '@/config/site'
import useServices from '@/composables/useServices'
import { openContactModal } from '@/composables/useContactModal'
import BaseButton from '@/components/ui/BaseButton.vue'
import VigaRule from '@/components/ui/VigaRule.vue'

const { services } = useServices()
</script>

<template>
  <!-- Pulled up under the fixed transparent header. -->
  <section class="on-dark relative -mt-18 overflow-hidden bg-ink text-bone lg:-mt-20">
    <!--
      A quiet echo of the service-area ring, bleeding off the right edge. The
      ring itself is the page's one loud moment; this just rhymes with it.
    -->
    <svg
      class="pointer-events-none absolute -top-40 -right-56 h-[46rem] w-[46rem] text-bone/[0.045] sm:-right-40 lg:-right-24"
      viewBox="0 0 400 400"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" stroke-width="1.5" />
      <circle cx="200" cy="200" r="128" fill="none" stroke="currentColor" stroke-width="1.5" />
      <circle cx="200" cy="200" r="76" fill="none" stroke="currentColor" stroke-width="1.5" />
    </svg>

    <div
      class="shell relative flex min-h-[38rem] flex-col justify-center pt-32 pb-16 lg:min-h-[44rem] lg:pt-40 lg:pb-20"
    >
      <p class="type-label rise text-adobe-light" style="--delay: 0ms">
        Northern New Mexico · Since {{ site.foundedYear }}
      </p>

      <VigaRule class="rise mt-5 text-bone/30" width="4.5rem" style="--delay: 60ms" />

      <h1
        class="type-display mt-7 text-display-lg sm:text-display-xl lg:text-[7rem] lg:leading-[0.85]"
      >
        <span class="rise block" style="--delay: 120ms">One crew.</span>
        <span class="rise block text-adobe-light" style="--delay: 220ms">Every trade.</span>
      </h1>

      <p
        class="rise mt-8 max-w-xl text-lg leading-relaxed text-pretty text-bone/70"
        style="--delay: 340ms"
      >
        Remodels, plumbing, electrical, carpentry, and the long list of smaller things that need
        doing — handled by one crew, around the Enchanted Circle.
      </p>

      <div class="rise mt-10 flex flex-wrap items-center gap-4" style="--delay: 420ms">
        <BaseButton size="lg" arrow @click="openContactModal()">Get a free estimate</BaseButton>
        <BaseButton :href="site.phoneHref" variant="outlineLight" size="lg" icon="phone">
          {{ site.phone }}
        </BaseButton>
      </div>
    </div>

    <!--
      The trade list is the hero's real content, so it gets its own band rather
      than being buried in the paragraph above. Rendered from services.json.
    -->
    <div class="relative border-t border-bone/10">
      <ul class="shell flex flex-wrap items-center gap-x-8 gap-y-3 py-5">
        <li
          v-for="service in services"
          :key="service.slug"
          class="type-label flex items-center gap-2.5 text-bone/55"
        >
          <span class="h-2.5 w-0.5 bg-adobe" aria-hidden="true" />
          {{ service.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.rise {
  animation: rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rise {
    animation: none;
  }
}
</style>
