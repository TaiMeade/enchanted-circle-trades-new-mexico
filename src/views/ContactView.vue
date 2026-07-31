<script setup>
import site from '@/config/site'
import AppIcon from '@/components/ui/AppIcon.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import VigaRule from '@/components/ui/VigaRule.vue'
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Contact"
      title="Get a free estimate"
      lead="Tell us what needs doing and you'll get a written estimate back — no charge, no obligation."
    />

    <section class="bg-sand py-20 lg:py-24">
      <div class="shell grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
        <ContactForm />

        <aside class="space-y-10">
          <div>
            <h2 class="type-label text-adobe-deep">Reach us directly</h2>
            <VigaRule class="mt-4 mb-6 text-basalt/25" width="2.5rem" />
            <ul class="space-y-5">
              <li>
                <a
                  :href="site.phoneHref"
                  class="group flex items-start gap-4 transition-colors hover:text-adobe-deep"
                >
                  <AppIcon name="phone" :size="20" class="mt-1 text-adobe-deep" />
                  <span>
                    <span
                      class="type-display block text-lg leading-none text-basalt group-hover:text-adobe-deep"
                    >
                      {{ site.phone }}
                    </span>
                    <span class="mt-1.5 block text-sm text-dusk">Fastest way to reach us</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  :href="`mailto:${site.email}`"
                  class="group flex items-start gap-4 transition-colors"
                >
                  <AppIcon name="email" :size="20" class="mt-1 text-adobe-deep" />
                  <span>
                    <span
                      class="block text-[0.9375rem] break-all text-basalt group-hover:text-adobe-deep"
                    >
                      {{ site.email }}
                    </span>
                    <span class="mt-1.5 block text-sm text-dusk">Photos welcome</span>
                  </span>
                </a>
              </li>
              <li class="flex items-start gap-4">
                <AppIcon name="location" :size="20" class="mt-1 text-adobe-deep" />
                <span>
                  <span class="block text-[0.9375rem] text-basalt">
                    <span v-if="site.address.street">
                      {{ site.address.street }}
                      <br />
                    </span>
                    {{ site.address.locality }}
                  </span>
                  <span class="mt-1.5 block text-sm text-dusk">
                    Serving the whole Enchanted Circle
                  </span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="type-label text-adobe-deep">Hours</h2>
            <VigaRule class="mt-4 mb-6 text-basalt/25" width="2.5rem" />
            <dl class="divide-y divide-basalt/10 border-y border-basalt/10 text-[0.9375rem]">
              <div class="flex justify-between gap-4 py-3">
                <dt class="text-dusk">Monday – Friday</dt>
                <dd class="text-basalt">{{ site.hours.weekdays }}</dd>
              </div>
              <div class="flex justify-between gap-4 py-3">
                <dt class="text-dusk">Saturday</dt>
                <dd class="text-basalt">{{ site.hours.saturday }}</dd>
              </div>
              <div class="flex justify-between gap-4 py-3">
                <dt class="text-dusk">Sunday</dt>
                <dd class="text-basalt">{{ site.hours.sunday }}</dd>
              </div>
            </dl>
            <p class="mt-4 text-sm leading-relaxed text-pretty text-dusk">
              {{ site.hours.note }}
            </p>
          </div>

          <div>
            <h2 class="type-label text-adobe-deep">Service area</h2>
            <VigaRule class="mt-4 mb-6 text-basalt/25" width="2.5rem" />
            <p class="text-[0.9375rem] leading-relaxed text-pretty text-dusk">
              {{ site.serviceArea.map((town) => town.name).join(', ') }}, plus
              {{ site.nearbyAreas.join(', ') }}.
            </p>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>
