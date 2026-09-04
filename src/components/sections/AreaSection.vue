<script setup>
import site from '@/config/site'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'
</script>

<template>
  <section id="area" class="on-dark scroll-mt-(--header-h) bg-spruce py-12 text-snow sm:py-20 lg:py-28">
    <div class="shell grid gap-8 sm:gap-14 lg:grid-cols-2 lg:gap-20">
      <div>
        <SectionHeading
          eyebrow="Where we work"
          tone="light"
          title="All of Taos County"
          :lead="site.radius.note"
        />

        <p class="mt-5 flex items-start gap-2.5 text-[0.9375rem] text-snow/65 sm:mt-8 sm:text-base">
          <AppIcon
            name="location"
            :size="18"
            class="mt-0.5 shrink-0 text-ember-light sm:h-5 sm:w-5"
          />
          <span>Based in {{ site.address.locality }}.</span>
        </p>

        <BaseButton variant="outlineLight" class="mt-6 sm:mt-9" arrow @click="openContactModal()">
          Check your address
        </BaseButton>
      </div>

      <!--
        A plain list of towns. The old ring diagram plotted five of them at
        their compass bearings, which was a nice drawing of a service area that
        is no longer the service area — and a list is what someone scanning for
        their own town actually wants.

        Two columns everywhere: ten towns one per row is half a phone screen
        spent on names that are two words long.
      -->
      <ul class="grid grid-cols-2 gap-px self-start bg-snow/12">
        <li
          v-for="town in site.serviceArea"
          :key="town"
          class="flex items-center gap-2.5 bg-spruce px-3 py-3 sm:gap-3 sm:px-5 sm:py-4"
        >
          <span class="h-3 w-0.5 shrink-0 bg-ember" aria-hidden="true" />
          <span class="text-[0.9375rem] sm:text-[1.0625rem]">{{ town }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
