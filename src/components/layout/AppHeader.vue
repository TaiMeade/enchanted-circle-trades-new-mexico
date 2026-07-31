<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import site from '@/config/site'
import useFocusTrap from '@/composables/useFocusTrap'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import LogoMark from '@/components/ui/LogoMark.vue'

const links = [
  { label: 'Services', to: { name: 'services' } },
  { label: 'Our work', to: { name: 'work' } },
  { label: 'Reviews', to: { name: 'reviews' } },
  { label: 'Contact', to: { name: 'contact' } },
]

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const menuPanel = ref(null)

useFocusTrap(menuPanel, menuOpen, () => (menuOpen.value = false))

// The home hero is dark and full-bleed, so the header sits on top of it
// unpainted until the page scrolls. Every other route starts solid.
const overHero = computed(() => route.name === 'home' && !scrolled.value && !menuOpen.value)

function handleScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

watch(
  () => route.fullPath,
  () => (menuOpen.value = false)
)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      overHero
        ? 'on-dark bg-transparent text-bone'
        : 'border-b border-basalt/10 bg-bone/92 text-basalt backdrop-blur-md'
    "
  >
    <div class="shell flex h-18 items-center justify-between gap-6 lg:h-20">
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center gap-3"
        :aria-label="`${site.name} — home`"
      >
        <LogoMark :size="30" />
        <span class="type-display text-base leading-none tracking-tight sm:text-lg">
          <span class="sm:hidden">{{ site.abbr }}</span>
          <span class="hidden sm:inline">Enchanted Circle</span>
          <span class="hidden sm:inline" :class="overHero ? 'text-adobe-light' : 'text-adobe-deep'">
            Trades
          </span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-9 lg:flex" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="type-label relative py-2 transition-colors duration-200"
          :class="overHero ? 'text-bone/70 hover:text-bone' : 'text-basalt/70 hover:text-basalt'"
          active-class="nav-active"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-5 lg:flex">
        <a
          :href="site.phoneHref"
          class="type-label flex items-center gap-2 transition-colors"
          :class="
            overHero ? 'text-bone hover:text-adobe-light' : 'text-basalt hover:text-adobe-deep'
          "
        >
          <AppIcon name="phone" :size="15" />
          {{ site.phone }}
        </a>
        <BaseButton
          :to="{ name: 'contact' }"
          :variant="overHero ? 'outlineLight' : 'solid'"
          size="sm"
        >
          Free estimate
        </BaseButton>
      </div>

      <button
        type="button"
        class="-mr-2 p-2 lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="26" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        ref="menuPanel"
        class="on-dark fixed inset-x-0 top-18 bottom-0 z-50 overflow-y-auto bg-ink text-bone lg:hidden"
      >
        <nav class="shell flex flex-col py-8" aria-label="Main">
          <RouterLink
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            class="type-display border-b border-bone/10 py-5 text-2xl text-bone"
            active-class="text-adobe-light!"
          >
            {{ link.label }}
          </RouterLink>

          <a
            :href="site.phoneHref"
            class="type-display flex items-center gap-3 border-b border-bone/10 py-5 text-2xl text-bone"
          >
            <AppIcon name="phone" :size="22" class="text-adobe-light" />
            {{ site.phone }}
          </a>

          <BaseButton :to="{ name: 'contact' }" size="lg" class="mt-8" block arrow>
            Get a free estimate
          </BaseButton>

          <p class="type-label mt-8 text-bone/55">
            Serving the Enchanted Circle · {{ site.address.locality }}
          </p>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* The current page reads at full strength; the rest sit back. */
.nav-active {
  color: inherit;
}

/* Active route marker: a viga tick under the label, not a full underline. */
.nav-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0.75rem;
  height: 2px;
  background-color: currentColor;
}
</style>
