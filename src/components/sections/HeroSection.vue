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
    class="on-dark relative isolate mt-[calc(var(--header-h)*-1)] flex min-h-[30rem] flex-col justify-end overflow-hidden bg-linear-to-b from-pitch to-spruce text-snow sm:min-h-[36rem] lg:min-h-[44rem]"
  >
    <!-- The horizon, at the foot of the section and behind the copy. -->
    <RidgeMountains class="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-56 lg:h-72" />

    <div
      class="shell relative pt-28 pb-40 sm:pt-32 sm:pb-60 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pt-40 lg:pb-72"
    >
      <div>
        <!--
          The eyebrow, headline and lead, as one positioned block so the badge
          below can hang off its foot. See the note on the badge.
        -->
        <div class="relative">
          <!--
          ── The badge as sky, on small screens ──

          Below `lg` the badge cannot sit beside the headline — there is no
          beside — and stacking it above the phone number would push the two
          things this hero exists for under the fold. So it goes behind
          instead: centred on the column, near enough full width, at an opacity
          where it reads as weather on the gradient rather than as a logo
          competing with the type. It costs no vertical space, which is the
          whole point.

          It hangs off the foot of the copy rather than sitting at a fixed
          distance from the top of the section, and that is the whole trick.
          The headline and lead wrap to different line counts at every width,
          so a fixed `top` that looks right on a 390px phone drops the ring
          straight through the "Get a free estimate" label at 600px — measured,
          not guessed. The gap between the foot of the lead and that button is
          constant, so anchoring here keeps roughly 25px of clearance at every
          width in the range.

          `-z-10` puts it under the type without depending on the `rise`
          animation to do it: `rise` animates a transform, which would stack
          these siblings above it as a side effect, but that stops being true
          under `prefers-reduced-motion` and the mark would land on top of the
          buttons. The `isolate` on the section is what makes the negative
          index safe — without a stacking context there, it would slide under
          the section's own gradient and vanish.

          `max-w-none` is required because preflight caps images at 100% of a
          column this one is not in; the width caps at 92vw so the ring never
          touches the edge of a narrow screen.
        -->
          <LogoMark
            tone="white"
            :size="384"
            class="pointer-events-none absolute -bottom-30 left-1/2 -z-10 w-[min(24rem,92vw)] max-w-none -translate-x-1/2 opacity-[0.11] sm:-bottom-28 sm:w-[26rem] lg:hidden"
          />

          <p class="rise type-label text-ember-light" style="--delay: 0ms">
            {{ site.address.city }} County, New Mexico
          </p>

          <h1
            class="rise text-display sm:text-display-lg type-display mt-4 max-w-4xl text-balance sm:mt-6 lg:text-display-xl xl:text-[7.5rem] xl:leading-[0.84]"
            style="--delay: 80ms"
          >
            Every trade.
            <br />
            One call.
          </h1>

          <p
            class="rise mt-5 max-w-xl leading-relaxed text-pretty text-snow/75 sm:mt-8 sm:text-lg"
            style="--delay: 200ms"
          >
            Remodels, plumbing, electrical, carpentry — and the long list of smaller things that
            need doing. Run through one crew instead of five.
          </p>
        </div>

        <div
          class="rise mt-7 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center sm:gap-3"
          style="--delay: 300ms"
        >
          <BaseButton :href="site.phoneHref" size="lg" icon="phone">
            {{ site.phone }}
          </BaseButton>
          <BaseButton variant="outlineLight" size="lg" arrow @click="openContactModal()">
            Get a free estimate
          </BaseButton>
        </div>

        <p
          class="rise mt-5 flex items-start gap-2.5 text-[0.9375rem] text-snow/65 sm:mt-8 sm:text-base"
          style="--delay: 380ms"
        >
          <AppIcon name="clock" :size="18" class="mt-0.5 shrink-0 text-ember-light sm:h-5 sm:w-5" />
          <span>Call and you'll hear back {{ site.responseTime }}.</span>
        </p>
      </div>

      <!--
        The full-size badge, for the one breakpoint with room for it beside the
        headline. Below `lg` its job is done by the watermark above.

        It holds still while the rest of the hero rises: `rise` animates a
        transform, and a stamp that drifts is not a stamp.
      -->
      <LogoMark tone="white" :size="352" class="hidden w-[clamp(17rem,22vw,22rem)] lg:block" />
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
