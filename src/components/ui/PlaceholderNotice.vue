<script setup>
import AppIcon from './AppIcon.vue'

/**
 * Shown wherever seeded sample content is still on screen.
 *
 * Reviews and project entries ship with `"placeholder": true` so the layout can
 * be built and reviewed before the real content arrives. This notice keeps that
 * sample content from ever reading as genuine customer feedback or as work the
 * business has actually done. It disappears on its own once the placeholder
 * entries are replaced — there is nothing to remember to turn off.
 */
defineProps({
  what: { type: String, required: true },
})
</script>

<template>
  <div
    class="flex items-start gap-3 border-l-2 border-adobe bg-adobe/8 px-4 py-3 text-sm text-dusk"
    role="note"
  >
    <AppIcon name="alert" :size="18" class="mt-0.5 text-adobe-deep" />
    <p>
      <span class="font-semibold text-basalt">Sample content.</span>
      The {{ what }} below are placeholders while real ones are collected. Nothing here reflects
      actual customer feedback or completed jobs.
    </p>
  </div>
</template>
