<script setup>
import { computed } from 'vue'

import site from '@/config/site'
import useServices from '@/composables/useServices'
import AppIcon from '@/components/ui/AppIcon.vue'
import LogoMark from '@/components/ui/LogoMark.vue'
import VigaRule from '@/components/ui/VigaRule.vue'

const { services } = useServices()

// Derived from services.json, never a second hand-maintained list.
const footerServices = services.slice(0, 6)

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
  <footer class="on-dark bg-ink text-bone">
    <div class="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
      <!-- Brand -->
      <div class="lg:pr-6">
        <div class="flex items-center gap-3">
          <LogoMark :size="32" />
          <span class="type-display text-lg leading-none">
            Enchanted Circle
            <span class="text-adobe-light">Trades</span>
          </span>
        </div>

        <p class="mt-5 text-[0.9375rem] leading-relaxed text-pretty text-bone/60">
          {{ site.description }}
        </p>

        <ul v-if="socialLinks.length" class="mt-6 flex gap-3">
          <li v-for="link in socialLinks" :key="link.key">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center border border-bone/20 text-bone/70 transition-colors hover:border-adobe hover:text-adobe-light"
              :aria-label="`${site.shortName} on ${link.label}`"
            >
              <AppIcon :name="link.key" :size="19" />
            </a>
          </li>
        </ul>
      </div>

      <!-- Services -->
      <nav aria-labelledby="footer-services">
        <h2 id="footer-services" class="type-label text-bone/55">Services</h2>
        <VigaRule class="mt-4 mb-5 text-bone/25" width="2.5rem" />
        <ul class="space-y-3">
          <li v-for="service in footerServices" :key="service.slug">
            <RouterLink
              :to="{ name: 'service-detail', params: { slug: service.slug } }"
              class="text-[0.9375rem] text-bone/70 transition-colors hover:text-adobe-light"
            >
              {{ service.name }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'services' }"
              class="type-label inline-flex items-center gap-2 text-adobe-light"
            >
              All services
              <AppIcon name="arrowRight" :size="13" />
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Service area -->
      <nav aria-labelledby="footer-area">
        <h2 id="footer-area" class="type-label text-bone/55">Where we work</h2>
        <VigaRule class="mt-4 mb-5 text-bone/25" width="2.5rem" />
        <ul class="space-y-3 text-[0.9375rem] text-bone/70">
          <li v-for="town in site.serviceArea" :key="town.name">{{ town.name }}</li>
        </ul>
        <p class="mt-4 text-sm text-bone/55">and {{ site.nearbyAreas.slice(0, 3).join(', ') }}</p>
      </nav>

      <!-- Contact -->
      <div>
        <h2 class="type-label text-bone/55">Get in touch</h2>
        <VigaRule class="mt-4 mb-5 text-bone/25" width="2.5rem" />

        <ul class="space-y-4 text-[0.9375rem]">
          <li>
            <a
              :href="site.phoneHref"
              class="flex items-start gap-3 text-bone transition-colors hover:text-adobe-light"
            >
              <AppIcon name="phone" :size="18" class="mt-0.5 text-adobe" />
              {{ site.phone }}
            </a>
          </li>
          <li>
            <a
              :href="`mailto:${site.email}`"
              class="flex items-start gap-3 break-all text-bone/70 transition-colors hover:text-adobe-light"
            >
              <AppIcon name="email" :size="18" class="mt-0.5 text-adobe" />
              {{ site.email }}
            </a>
          </li>
          <li class="flex items-start gap-3 text-bone/70">
            <AppIcon name="location" :size="18" class="mt-0.5 text-adobe" />
            <span>
              <span v-if="site.address.street">
                {{ site.address.street }}
                <br />
              </span>
              {{ site.address.locality }}
            </span>
          </li>
          <li class="flex items-start gap-3 text-bone/70">
            <AppIcon name="clock" :size="18" class="mt-0.5 text-adobe" />
            <span>
              Mon–Fri {{ site.hours.weekdays }}
              <br />
              Sat {{ site.hours.saturday }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-bone/10">
      <div
        class="shell flex flex-col gap-3 py-6 text-sm text-bone/55 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
        <p v-if="site.credentials.licensed">
          {{ site.credentials.statement }}
          <span v-if="site.credentials.licenseNumber">
            License #{{ site.credentials.licenseNumber }}
          </span>
        </p>
      </div>
    </div>
  </footer>
</template>
