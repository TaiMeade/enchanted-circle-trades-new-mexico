<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import RidgeMountains from '@/components/ui/RidgeMountains.vue'
</script>

<template>
  <!--
    The sky, then the range. Pulled up under the fixed transparent header.
    The gradient runs dark at the top to lighter at the horizon, which is what
    puts the ridge in silhouette without needing a photograph.
  -->
  <section
    class="on-dark relative -mt-18 flex min-h-[36rem] flex-col justify-end overflow-hidden bg-linear-to-b from-pitch to-spruce text-snow lg:-mt-20 lg:min-h-[44rem]"
  >
    <div class="shell relative z-10 pt-32 pb-56 sm:pb-64 lg:pt-40 lg:pb-72">
      <p class="rise type-label text-ember-light" style="--delay: 0ms">
        {{ site.address.city }} County, New Mexico
      </p>

      <h1
        class="rise text-display sm:text-display-lg type-display mt-6 max-w-4xl text-balance lg:text-display-xl xl:text-[7.5rem] xl:leading-[0.84]"
        style="--delay: 80ms"
      >
        Every trade.
        <br />
        One call.
      </h1>

      <p
        class="rise mt-8 max-w-xl text-lg leading-relaxed text-pretty text-snow/75"
        style="--delay: 200ms"
      >
        Remodels, plumbing, electrical, HVAC, carpentry, concrete, fencing — and the long list of
        smaller things that need doing. Run through one crew instead of five.
      </p>

      <div
        class="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        style="--delay: 300ms"
      >
        <BaseButton :href="site.phoneHref" size="lg" icon="phone">
          {{ site.phone }}
        </BaseButton>
        <BaseButton variant="outlineLight" size="lg" arrow @click="openContactModal()">
          Get a free estimate
        </BaseButton>
      </div>

      <p class="rise mt-8 flex items-start gap-2.5 text-snow/65" style="--delay: 380ms">
        <AppIcon name="clock" :size="20" class="mt-0.5 shrink-0 text-ember-light" />
        <span>Call and you'll hear back {{ site.responseTime }}.</span>
      </p>
    </div>

    <!--
      The horizon. Sits at the foot of the section, behind the content, and is
      the one place on the page where orange appears as light rather than ink.
    -->
    <RidgeMountains class="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-56 lg:h-72" />
  </section>
</template>

<style scoped>
.rise {
  animation: rise 0.7s var(--ease-out-quint) both;
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
