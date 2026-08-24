<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import AppIcon from './AppIcon.vue'

/**
 * ── On the label treatment ──
 *
 * Buttons here are set in body type at 16px, sentence case. They used to use
 * `type-label` — 12px uppercase with 0.16em tracking — which looks sharp and is
 * genuinely hard work to read for anyone who isn't already comfortable on the
 * web. This site's visitors are homeowners, frequently older, often arriving
 * with a problem. Legibility beats styling on the one element they have to
 * find. `type-label` is for eyebrows now.
 *
 * Both sizes clear a 48px touch target.
 */
const props = defineProps({
  /** Internal route — renders a RouterLink. */
  to: { type: [String, Object], default: null },
  /** External link, in-page anchor, or protocol link (tel:, mailto:). */
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  variant: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline', 'outlineLight', 'ghost'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['md', 'lg'].includes(v) },
  /** Icon key rendered before the label. */
  icon: { type: String, default: '' },
  /** Show a trailing arrow that nudges right on hover. */
  arrow: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
})

const tag = computed(() => {
  if (props.to) return RouterLink
  if (props.href) return 'a'
  return 'button'
})

const variants = {
  // Hover darkens. Going lighter, toward `ember`, would put the label at
  // 3.71:1 — see the note on emberDark in design/tokens.js.
  solid: 'bg-ember-deep text-snow hover:bg-ember-dark',
  outline: 'border border-spruce/30 text-spruce hover:bg-spruce hover:text-snow',
  outlineLight: 'border border-snow/35 text-snow hover:bg-snow hover:text-pitch',
  ghost: 'text-ember-deep underline underline-offset-4 hover:text-ember-dark px-0!',
}

const sizes = {
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-[1.0625rem]',
}
</script>

<template>
  <component
    :is="tag"
    :to="to || undefined"
    :href="href || undefined"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="disabled || undefined"
    class="group inline-flex items-center justify-center gap-2.5 text-center font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45"
    :class="[variants[variant], sizes[size], block && 'w-full']"
  >
    <AppIcon v-if="icon" :name="icon" :size="20" />
    <slot />
    <AppIcon
      v-if="arrow"
      name="arrowRight"
      :size="18"
      class="transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
    />
  </component>
</template>
