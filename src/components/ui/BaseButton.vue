<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import AppIcon from './AppIcon.vue'

const props = defineProps({
  /** Internal route — renders a RouterLink. */
  to: { type: [String, Object], default: null },
  /** External or protocol link (tel:, mailto:) — renders an anchor. */
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
  variant: {
    type: String,
    default: 'solid',
    validator: (v) => ['solid', 'outline', 'outlineLight', 'ghost'].includes(v),
  },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg'].includes(v) },
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
  solid: 'bg-adobe-deep text-bone hover:bg-adobe',
  outline: 'border border-basalt/25 text-basalt hover:bg-basalt hover:text-bone',
  outlineLight: 'border border-bone/30 text-bone hover:bg-bone hover:text-ink',
  ghost: 'text-adobe-deep hover:text-adobe px-0!',
}

const sizes = {
  sm: 'h-9 px-4 text-[0.6875rem]',
  md: 'h-11 px-6 text-xs',
  lg: 'h-14 px-8 text-[0.8125rem]',
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
    class="type-label group inline-flex items-center justify-center gap-2.5 transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45"
    :class="[variants[variant], sizes[size], block && 'w-full']"
  >
    <AppIcon v-if="icon" :name="icon" :size="16" />
    <slot />
    <AppIcon
      v-if="arrow"
      name="arrowRight"
      :size="16"
      class="transition-transform duration-200 ease-out-quint group-hover:translate-x-1"
    />
  </component>
</template>
