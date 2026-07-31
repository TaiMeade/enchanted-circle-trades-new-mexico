<script setup>
import useProjects from '@/composables/useProjects'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PlaceholderNotice from '@/components/ui/PlaceholderNotice.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'

const { featured, hasPlaceholders } = useProjects()
</script>

<template>
  <section class="bg-sand py-20 lg:py-28">
    <div class="shell">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Recent work" title="Jobs we've finished" />
        <BaseButton :to="{ name: 'work' }" variant="outline" class="shrink-0" arrow>
          See all work
        </BaseButton>
      </div>

      <PlaceholderNotice v-if="hasPlaceholders" what="projects" class="mt-10" />

      <ul class="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="project in featured.slice(0, 4)" :key="project.id">
          <ProjectCard :project="project" />
        </li>
      </ul>
    </div>
  </section>
</template>
