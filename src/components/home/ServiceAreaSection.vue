<script setup>
import site from '@/config/site'
import BaseButton from '@/components/ui/BaseButton.vue'
import EnchantedRing from '@/components/ui/EnchantedRing.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'
</script>

<template>
  <section class="on-dark bg-ink py-20 text-bone lg:py-28">
    <div class="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHeading
          eyebrow="Where we work"
          tone="light"
          title="The whole Enchanted Circle"
          lead="The byway loops 83 miles through five towns, and that loop is the service area. Each marker sits at the town's real bearing from the middle of the circle — so the shape on the right is the actual drive, not a decoration."
        />

        <p class="mt-8 text-[0.9375rem] leading-relaxed text-pretty text-bone/55">
          Also covering
          {{ site.nearbyAreas.slice(0, -1).join(', ') }}, and
          {{ site.nearbyAreas[site.nearbyAreas.length - 1] }}. Just outside the loop? Ask anyway —
          it often still works out.
        </p>

        <BaseButton :to="{ name: 'contact' }" variant="outlineLight" class="mt-10" arrow>
          Check your address
        </BaseButton>
      </div>

      <EnchantedRing />
    </div>
  </section>
</template>
