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
    <div class="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-3">
          <LogoMark :size="30" />
          <span class="type-display text-lg leading-none">
            Enchanted Circle
            <span class="text-ember-light">Trades</span>
          </span>
        </div>
        <p class="mt-6 leading-relaxed text-pretty text-snow/65">{{ site.description }}</p>

        <ul v-if="socialLinks.length" class="mt-7 flex gap-3">
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
        <ul class="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-snow/65">
          <li v-for="service in services" :key="service.slug">{{ service.name }}</li>
        </ul>
      </div>

      <!-- Towns -->
      <div>
        <h2 class="type-label text-ember-light">Where we work</h2>
        <ul class="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-snow/65">
          <li v-for="town in site.serviceArea" :key="town">{{ town }}</li>
        </ul>
        <p class="mt-4 text-sm leading-relaxed text-snow/55">
          And about {{ site.radius.miles }} miles beyond, with a travel fee.
        </p>
      </div>

      <!-- Contact -->
      <div>
        <h2 class="type-label text-ember-light">Get in touch</h2>
        <ul class="mt-5 space-y-2 text-snow/65">
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
              Mon–Sat {{ site.hours.weekdays }}
              <br />
              Sunday {{ site.hours.sunday.toLowerCase() }}
              <br />
              <span class="text-snow/55">Holiday hours vary</span>
            </span>
          </li>
        </ul>

        <button
          type="button"
          class="mt-5 flex min-h-11 items-center font-medium text-ember-light underline underline-offset-4 transition-colors hover:text-snow"
          @click="openContactModal()"
        >
          Get a free estimate
        </button>
      </div>
    </div>

    <div class="border-t border-snow/10">
      <!--
        No license or insurance line here. See the note in src/config/site.js —
        this business is not licensed in New Mexico yet, and the site says so
        openly in the "Who you're hiring" section rather than staying quiet.
      -->
      <div
        class="shell flex flex-col gap-2 py-6 text-sm text-snow/55 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.legalName }}.</p>
        <p>Owner-operated by {{ site.owner }}.</p>
      </div>
    </div>
  </footer>
</template>
