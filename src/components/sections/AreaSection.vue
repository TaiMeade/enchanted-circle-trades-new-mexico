<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'
</script>

<template>
  <section id="area" class="on-dark scroll-mt-20 bg-spruce py-20 text-snow lg:py-28">
    <div class="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHeading
          eyebrow="Where we work"
          tone="light"
          title="All of Taos County"
          :lead="site.radius.note"
        />

        <p class="mt-8 flex items-start gap-2.5 text-snow/65">
          <AppIcon name="location" :size="20" class="mt-0.5 shrink-0 text-ember-light" />
          <span>Based in {{ site.address.locality }}.</span>
        </p>

        <BaseButton variant="outlineLight" class="mt-9" arrow @click="openContactModal()">
          Check your address
        </BaseButton>
      </div>

      <!--
        A plain list of towns. The old ring diagram plotted five of them at
        their compass bearings, which was a nice drawing of a service area that
        is no longer the service area — and a list is what someone scanning for
        their own town actually wants.
      -->
      <ul class="grid grid-cols-1 gap-px self-start bg-snow/12 sm:grid-cols-2">
        <li
          v-for="town in site.serviceArea"
          :key="town"
          class="flex items-center gap-3 bg-spruce px-5 py-4"
        >
          <span class="h-3 w-0.5 shrink-0 bg-ember" aria-hidden="true" />
          <span class="text-[1.0625rem]">{{ town }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
