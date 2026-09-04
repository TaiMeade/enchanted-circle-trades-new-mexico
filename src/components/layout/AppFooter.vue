<script setup>
import { computed } from 'vue'

import site from '@/config/site'
import useServices from '@/composables/useServices'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import LogoMark from '@/components/ui/LogoMark.vue'

const { services } = useServices()

/*
 * Social links are empty in config until the business has accounts. Filtering
 * on href means the row disappears entirely rather than rendering dead icons —
 * nothing to remember to switch on later.
 */
const socialLinks = computed(() =>
  [
    { key: 'facebook', label: 'Facebook', href: site.social.facebook },
    { key: 'instagram', label: 'Instagram', href: site.social.instagram },
    { key: 'google', label: 'Google', href: site.social.google },
  ].filter((link) => link.href)
)

const year = new Date().getFullYear()
</script>

<template>
  <footer class="on-dark bg-spruce text-snow">
    <!--
      Two columns on a phone rather than four blocks stacked. The two list
      columns — trades and towns — are short lines of the same shape, so they
      pair off naturally and halve the footer's height; the brand block and the
      contact block need the full width and say so.
    -->
    <div
      class="shell grid grid-cols-2 gap-x-6 gap-y-9 py-12 md:grid-cols-2 md:gap-10 md:py-16 lg:grid-cols-4 lg:py-20"
    >
      <!-- Brand -->
      <div class="col-span-2 md:col-span-1">
        <div class="flex items-center gap-3">
          <LogoMark tone="white" :size="44" />
          <span class="type-display text-lg leading-none">
            Enchanted Circle
            <span class="text-ember-light">Trades</span>
          </span>
        </div>
        <p class="mt-4 leading-relaxed text-pretty text-snow/65 sm:mt-6">{{ site.description }}</p>

        <ul v-if="socialLinks.length" class="mt-5 flex gap-3 sm:mt-7">
          <li v-for="link in socialLinks" :key="link.key">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-11 w-11 items-center justify-center border border-snow/20 transition-colors hover:border-ember-light hover:text-ember-light"
            >
              <AppIcon :name="link.key" :size="20" :label="link.label" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Trades -->
      <div>
        <h2 class="type-label text-ember-light">What we do</h2>
        <ul
          class="mt-4 grid gap-y-2 text-[0.9375rem] text-snow/65 sm:mt-5 md:grid-cols-2 md:gap-x-6 md:gap-y-2.5 md:text-base"
        >
          <li v-for="service in services" :key="service.slug">{{ service.name }}</li>
        </ul>
      </div>

      <!-- Towns -->
      <div>
        <h2 class="type-label text-ember-light">Where we work</h2>
        <ul
          class="mt-4 grid gap-y-2 text-[0.9375rem] text-snow/65 sm:mt-5 md:grid-cols-2 md:gap-x-6 md:gap-y-2.5 md:text-base"
        >
          <li v-for="town in site.serviceArea" :key="town">{{ town }}</li>
        </ul>
        <p class="mt-3 text-sm leading-relaxed text-snow/55 sm:mt-4">
          And about {{ site.radius.miles }} miles beyond, with a travel fee.
        </p>
      </div>

      <!-- Contact -->
      <div class="col-span-2 md:col-span-1">
        <h2 class="type-label text-ember-light">Get in touch</h2>
        <ul class="mt-4 space-y-1.5 text-snow/65 sm:mt-5 sm:space-y-2">
          <li>
            <a
              :href="site.phoneHref"
              class="flex min-h-11 items-center gap-3 text-lg text-snow transition-colors hover:text-ember-light"
            >
              <AppIcon name="phone" :size="20" class="text-ember-light" />
              {{ site.phone }}
            </a>
          </li>
          <li>
            <a
              :href="`mailto:${site.email}`"
              class="flex min-h-11 items-center gap-3 transition-colors hover:text-ember-light"
            >
              <AppIcon name="email" :size="20" class="shrink-0 text-ember-light" />
              <span class="break-all">{{ site.email }}</span>
            </a>
          </li>
          <li class="flex items-start gap-3">
            <AppIcon name="location" :size="20" class="mt-0.5 shrink-0 text-ember-light" />
            <span>
              <template v-if="site.address.street">
                {{ site.address.street }}
                <br />
              </template>
              {{ site.address.locality }}
            </span>
          </li>
          <li class="flex items-start gap-3">
            <AppIcon name="clock" :size="20" class="mt-0.5 shrink-0 text-ember-light" />
            <span>
              Mon–Sat {{ site.hours.weekdays }} · Sunday {{ site.hours.sunday.toLowerCase() }}
              <br />
              <span class="text-snow/55">Holiday hours vary</span>
            </span>
          </li>
        </ul>

        <button
          type="button"
          class="mt-4 flex min-h-11 items-center font-medium text-ember-light underline underline-offset-4 transition-colors hover:text-snow sm:mt-5"
          @click="openContactModal()"
        >
          Get a free estimate
        </button>
      </div>
    </div>

    <div class="border-t border-snow/10">
      <div
        class="shell flex flex-col gap-1 py-5 text-sm text-snow/55 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:py-6"
      >
        <p>© {{ year }} {{ site.legalName }}.</p>
        <p>Owner-operated by {{ site.owner }}.</p>
      </div>
    </div>
  </footer>
</template>
