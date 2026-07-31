<script setup>
import { computed, watchEffect } from 'vue'

import site from '@/config/site'
import useServices from '@/composables/useServices'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import ServiceCard from '@/components/ui/ServiceCard.vue'
import CtaBand from '@/components/home/CtaBand.vue'

const props = defineProps({
  slug: { type: String, required: true },
})

const { services, getBySlug } = useServices()

const service = computed(() => getBySlug(props.slug))

const related = computed(() => services.filter((item) => item.slug !== props.slug).slice(0, 3))

watchEffect(() => {
  document.title = service.value
    ? `${service.value.name} | ${site.shortName}`
    : `Service not found | ${site.shortName}`
})
</script>

<template>
  <div v-if="service">
    <PageHeader eyebrow="Services" :title="service.name" :lead="service.summary">
      <BaseButton
        :to="{ name: 'services' }"
        variant="outlineLight"
        size="sm"
        icon="arrowLeft"
        class="mt-10"
      >
        All services
      </BaseButton>
    </PageHeader>

    <section class="bg-bone py-20 lg:py-24">
      <div class="shell grid gap-14 lg:grid-cols-[1fr_minmax(0,24rem)] lg:gap-20">
        <div>
          <p class="text-lg leading-relaxed text-pretty text-basalt/85">
            {{ service.description }}
          </p>

          <h2 class="type-label mt-12 text-adobe-deep">What that covers</h2>
          <ul class="mt-6 divide-y divide-basalt/10 border-y border-basalt/10">
            <li
              v-for="item in service.bullets"
              :key="item"
              class="flex items-start gap-4 py-4 text-[0.9375rem] text-basalt/85"
            >
              <AppIcon name="check" :size="18" class="mt-0.5 text-adobe-deep" />
              {{ item }}
            </li>
          </ul>
        </div>

        <aside class="border border-basalt/12 bg-sand p-8 lg:sticky lg:top-28 lg:self-start">
          <h2 class="type-display text-xl leading-tight text-balance text-basalt">
            Need {{ service.name.toLowerCase() }}?
          </h2>
          <p class="mt-4 text-[0.9375rem] leading-relaxed text-pretty text-dusk">
            Send over the details and you'll get a free written estimate back.
          </p>
          <BaseButton :to="{ name: 'contact' }" class="mt-7" block arrow>
            Get a free estimate
          </BaseButton>
          <BaseButton :href="site.phoneHref" variant="outline" class="mt-3" icon="phone" block>
            {{ site.phone }}
          </BaseButton>
        </aside>
      </div>
    </section>

    <section class="bg-sand py-20 lg:py-24">
      <div class="shell">
        <SectionHeading eyebrow="Also offered" title="Other trades" />
        <ul class="mt-12 grid gap-px bg-basalt/12 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in related" :key="item.slug">
            <ServiceCard :service="item" class="h-full" />
          </li>
        </ul>
      </div>
    </section>

    <CtaBand />
  </div>

  <!-- Unknown slug: stay on the route and offer a way back. -->
  <div v-else>
    <PageHeader
      eyebrow="Not found"
      title="No such service"
      :lead="`We couldn't find a service called “${slug}”. It may have been renamed.`"
    >
      <BaseButton :to="{ name: 'services' }" variant="outlineLight" class="mt-10" arrow>
        Browse all services
      </BaseButton>
    </PageHeader>
  </div>
</template>
