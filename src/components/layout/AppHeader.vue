<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import site from '@/config/site'
import useFocusTrap from '@/composables/useFocusTrap'
import useScrollSpy from '@/composables/useScrollSpy'
import { openContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import LogoMark from '@/components/ui/LogoMark.vue'

/*
 * The site is one page, so these are in-page anchors rather than routes. They
 * are still RouterLinks pointing at `{ path: '/', hash }` rather than plain
 * <a href="#trades"> for one reason: from the 404 page there is no #trades to
 * scroll to, and this form navigates home first and then scrolls. A bare anchor
 * would silently do nothing there.
 *
 * Contact is a button — it opens the modal instead of navigating.
 */
const links = [
  { label: 'What we do', hash: '#trades' },
  { label: 'How it works', hash: '#how' },
  { label: 'Where we work', hash: '#area' },
  { label: 'Questions', hash: '#faq' },
]

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const menuPanel = ref(null)

const activeSection = useScrollSpy(links.map((link) => link.hash.slice(1)))

useFocusTrap(menuPanel, menuOpen, () => (menuOpen.value = false))

// The hero is dark and full-bleed, so the header sits on it unpainted until
// the page scrolls. The 404 route starts solid.
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

/*
 * Both the mobile menu and the modal lock body scroll and manage focus. Letting
 * the menu finish closing before the modal opens keeps those two hand-offs from
 * racing — otherwise the menu's teardown can strip the scroll lock the modal
 * just applied.
 */
async function openContactFromMenu() {
  menuOpen.value = false
  await nextTick()
  openContactModal()
}

/** Anchor taps inside the mobile menu have to close it themselves. */
function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="
      overHero
        ? 'on-dark bg-transparent text-snow'
        : 'border-b border-spruce/12 bg-snow/92 text-spruce backdrop-blur-md'
    "
  >
    <div class="shell flex h-(--header-h) items-center justify-between gap-6">
      <RouterLink
        :to="{ name: 'home' }"
        class="flex items-center gap-3 py-2"
        :aria-label="`${site.name} — home`"
      >
        <!--
          White line-art while the header floats on the hero; ink once it lands
          on the light bar.

          `size` only fixes the square aspect ratio for layout — the width
          classes are what actually size it, so it can step per breakpoint. See
          the note on the ladder below.
        -->
        <LogoMark
          :size="120"
          :tone="overHero ? 'white' : 'ink'"
          class="w-20 sm:w-28 lg:w-11 xl:w-22"
        />
        <!--
          The full name at every width. It used to collapse to "ECT" below `sm`
          — three letters that mean nothing to someone who has just arrived
          from a search result and is still checking they are in the right
          place.

          ── Why the size ladder goes up, down, then up again ──

          The mark and the name are as large as each viewport can actually hold,
          and the binding constraint changes twice on the way up.

          Below `lg` the bar carries only the logo and the menu button, so the
          width is nearly all ours: the name goes to 40px at `sm` and folds to
          two lines under a 120px mark.

          At `lg` the nav, the phone number and the CTA all arrive on this row
          and the budget collapses. Measured in the browser, not estimated: the
          nav wants 440px and the phone-plus-button 308px, and because the shell
          caps at 78rem every viewport from 1280 up has the same 1168px to
          spend. That leaves 372px for the mark and the name together — which is
          why the desktop step is an 88px mark with 26px type (368px) and not
          the 36px type that reads well in isolation (473px).

          Overshooting it does not overflow. Flex just shrinks the nav and the
          phone until their labels wrap to two lines, which looks broken rather
          than tight, so treat 372px as a hard ceiling.

          `lg` itself (1024–1279) gets no increase at all. The shell is only
          960px wide there and the 1x header already spends 1075, which is why
          the nav labels wrap at that width today — before any of this. Folding
          the name to two lines from `lg` up claws back about 37px of that,
          which is the most this step can honestly do.

          Below `sm` the name wraps freely, to three stacked lines on a narrow
          phone: set solid, "ENCHANTED CIRCLE" will not fit beside an 80px mark
          at 375px, and the longest word is the floor because it cannot break.
          The clamp is sized so that floor clears the menu button at 320px and
          the two-line fold comes back on its own by about 480px. From `sm` up
          there is room for that fold outright, and `whitespace-nowrap` is what
          makes it land between "Circle" and "Trades" rather than mid-name.

          `sm` is the widest the mark ever gets — 112px, with 36px type. It is
          capped by the 640px end of its own range, not by the roomy end: the
          bar has only the menu button for company here, which is what buys the
          jump.

          The `{{ ' ' }}` is a real space, not a stray one. Vue's whitespace
          condensing deletes a text node that is only whitespace and a newline,
          so writing the two spans on separate lines would render the words
          jammed together.
        -->
        <span
          class="type-display text-[clamp(1.375rem,5.5vw,2rem)] leading-[1.05] sm:text-4xl lg:text-lg xl:text-[1.625rem]"
        >
          <span class="whitespace-normal sm:whitespace-nowrap lg:block">Enchanted Circle</span>
          {{ ' ' }}
          <span :class="overHero ? 'text-ember-light' : 'text-ember-deep'" class="lg:block">Trades</span>
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="{ path: '/', hash: link.hash }"
          class="relative flex min-h-11 items-center text-[0.9375rem] font-medium transition-colors duration-200"
          :class="[
            overHero ? 'text-snow/75 hover:text-snow' : 'text-stone hover:text-spruce',
            activeSection === link.hash.slice(1) && 'nav-active',
          ]"
          :aria-current="activeSection === link.hash.slice(1) ? 'true' : undefined"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-5 lg:flex">
        <a
          :href="site.phoneHref"
          class="flex min-h-11 items-center gap-2 font-medium transition-colors"
          :class="
            overHero ? 'text-snow hover:text-ember-light' : 'text-spruce hover:text-ember-deep'
          "
        >
          <AppIcon name="phone" :size="18" />
          {{ site.phone }}
        </a>
        <BaseButton :variant="overHero ? 'outlineLight' : 'solid'" @click="openContactModal()">
          Free estimate
        </BaseButton>
      </div>

      <button
        type="button"
        class="-mr-2 p-3 lg:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <AppIcon :name="menuOpen ? 'close' : 'menu'" :size="26" />
      </button>
    </div>

    <!--
      ── Teleported on purpose. Do not move this back inside <header>. ──

      The header carries `backdrop-blur-md` whenever it is not over the hero,
      and `menuOpen` is one of the things that turns that state on. A
      backdrop-filter makes an element the containing block for `position:
      fixed` descendants, so a menu nested here resolved its `top`/`bottom`
      against the header's own height instead of the viewport and computed to
      exactly zero height: open, focus-trapped, scroll-locked, and invisible.

      Teleporting it to <body> puts it outside that containing block. It sits at
      z-40, under the header's z-50, so the close button stays on top of it.
    -->
    <Teleport to="body">
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
          class="on-dark fixed inset-x-0 top-(--header-h) bottom-0 z-40 overflow-y-auto bg-pitch text-snow lg:hidden"
        >
          <nav class="shell flex flex-col py-6" aria-label="Main">
            <RouterLink
              v-for="link in links"
              :key="link.label"
              :to="{ path: '/', hash: link.hash }"
              class="type-display border-b border-snow/10 py-5 text-2xl text-snow"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>

            <a
              :href="site.phoneHref"
              class="type-display flex items-center gap-3 border-b border-snow/10 py-5 text-2xl text-snow"
            >
              <AppIcon name="phone" :size="22" class="text-ember-light" />
              {{ site.phone }}
            </a>

            <BaseButton size="lg" class="mt-8" block arrow @click="openContactFromMenu">
              Get a free estimate
            </BaseButton>

            <p class="mt-8 text-snow/65">
              Serving all of Taos County · {{ site.address.locality }}
            </p>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<style scoped>
.nav-active {
  color: inherit;
}

/* Current section marker: a single peak under the label, matching RidgeRule. */
.nav-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0.875rem;
  height: 7px;
  background-color: currentColor;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
</style>
