<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import LogoMark from '@/components/ui/LogoMark.vue'
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
    <!--
      The horizon. Absolutely positioned at the foot of the section, so it sits
      where it always did — but it comes BEFORE the content in the markup now,
      which is what keeps it behind. That used to be a `z-10` on the content
      wrapper, and the badge below cannot live under one: `mix-blend-mode` only
      reaches back as far as the nearest stacking context, and a z-index would
      have isolated it from the gradient it needs to blend with. Paint order by
      document order costs nothing and creates no stacking context.
    -->
    <RidgeMountains class="pointer-events-none absolute inset-x-0 bottom-0 h-48 sm:h-56 lg:h-72" />

    <div
      class="shell relative pt-32 pb-56 sm:pb-64 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pt-40 lg:pb-72"
    >
      <div>
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
        The badge, knocked out of the gradient rather than sitting on a tile —
        see the style block in LogoMark.vue for how, and why it must not be
        wrapped in anything that creates a stacking context. That includes the
        `rise` animation the rest of the hero uses: its `transform` would make
        one. It holds still, which is what a stamp should do anyway.

        Desktop only. Below `lg` this would push the phone number and the
        estimate button below the fold, and on a trades site those two are the
        entire point of the hero. The mark is already in the header there.
      -->
      <LogoMark tone="knockout" :size="352" class="hidden w-[clamp(17rem,22vw,22rem)] lg:block" />
    </div>
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
