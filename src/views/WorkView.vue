<script setup>
import useProjects from '@/composables/useProjects'
import PageHeader from '@/components/layout/PageHeader.vue'
import PlaceholderNotice from '@/components/ui/PlaceholderNotice.vue'
import ProjectCard from '@/components/ui/ProjectCard.vue'
import CtaBand from '@/components/home/CtaBand.vue'

const { categories, activeCategory, visible, hasPlaceholders } = useProjects()
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Our work"
      title="Finished jobs"
      lead="A sample of recent work around the Enchanted Circle — remodels, structural changes, and the trades that go into them."
    />

    <section class="bg-bone py-16 lg:py-20">
      <div class="shell">
        <PlaceholderNotice v-if="hasPlaceholders" what="projects" class="mb-10" />

        <!-- Category filter -->
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            class="type-label border px-4 py-2.5 transition-colors duration-200"
            :class="
              activeCategory === category
                ? 'border-basalt bg-basalt text-bone'
                : 'border-basalt/20 text-dusk hover:border-basalt/50 hover:text-basalt'
            "
            :aria-pressed="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <p class="type-label mt-8 text-dusk" aria-live="polite">
          {{ visible.length }} {{ visible.length === 1 ? 'project' : 'projects' }}
        </p>

        <ul class="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="project in visible" :key="project.id">
            <ProjectCard :project="project" />
          </li>
        </ul>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
