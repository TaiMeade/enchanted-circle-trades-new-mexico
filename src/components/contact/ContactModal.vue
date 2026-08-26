<script setup>
import { defineAsyncComponent, h, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import site from '@/config/site'
import useFocusTrap from '@/composables/useFocusTrap'
import { useContactModal } from '@/composables/useContactModal'
import AppIcon from '@/components/ui/AppIcon.vue'
import RidgeRule from '@/components/ui/RidgeRule.vue'

/*
 * The form drags in Vuetify's form components and the EmailJS SDK — together
 * about 100 kB gzipped, which is more than the rest of the site's JavaScript
 * put together. While it lived on its own route the router code-split it out of
 * the initial load; as a modal mounted in App.vue it would land in the main
 * bundle instead and be paid for by every visitor on every page.
 *
 * So it is loaded on demand, and the chunk is warmed during idle time after
 * mount (below) so the modal still opens instantly in practice.
 */
const loadForm = () => import('@/components/contact/ContactForm.vue')

const ContactForm = defineAsyncComponent({
  loader: loadForm,
  // Only shown if the chunk somehow hasn't arrived within 200ms — on a warmed
  // cache the form is already there and this never renders.
  delay: 200,
  loadingComponent: () => h('p', { class: 'py-12 text-center text-sm text-stone' }, 'Loading…'),
})

onMounted(() => {
  const warm = () => loadForm()
  if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 3000 })
  else setTimeout(warm, 1500)
})

const { isOpen, presetService, closeContactModal } = useContactModal()

const panel = ref(null)

/**
 * The service picker is a Vuetify select, and its menu renders in Vuetify's own
 * overlay container outside this panel. Escape while that menu is open should
 * close the menu only — Vuetify already does that — so bail out here rather
 * than tearing down the whole modal underneath it.
 */
function handleEscape() {
  if (document.querySelector('.v-overlay--active')) return
  closeContactModal()
}

// Escape to close, Tab held inside, focus returned to the button that opened
// it, and the page behind locked from scrolling — same trap the mobile menu uses.
useFocusTrap(panel, isOpen, handleEscape)

/*
 * The modal isn't a route, so the browser's back button navigates the page
 * underneath it while the overlay stays put. Closing on any route change keeps
 * the overlay from outliving the page it was opened from.
 */
const route = useRoute()
watch(() => route.fullPath, closeContactModal)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-100 flex overflow-y-auto overscroll-contain bg-pitch/80 p-4 backdrop-blur-sm sm:p-6"
        @click.self="closeContactModal"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          class="panel m-auto w-full max-w-2xl bg-snow shadow-2xl"
        >
          <!-- Dark header, so the modal reads as part of the page's night side. -->
          <div
            class="on-dark relative bg-pitch px-7 py-7 pr-16 text-snow sm:px-10 sm:py-8 sm:pr-20"
          >
            <button
              type="button"
              class="absolute top-4 right-4 p-3 text-snow/70 transition-colors hover:text-ember-light sm:top-5 sm:right-5"
              aria-label="Close"
              @click="closeContactModal"
            >
              <AppIcon name="close" :size="24" />
            </button>

            <p class="type-label text-ember-light">Contact</p>
            <RidgeRule class="mt-3 mb-4 text-snow/35" width="3rem" />
            <h2 id="contact-modal-title" class="type-display text-2xl sm:text-3xl">
              Get a free estimate
            </h2>
            <p class="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-pretty text-snow/70">
              Tell us what needs doing and you'll get a written estimate back — no charge, no
              obligation.
            </p>
          </div>

          <!--
            The body is `granite`, not `snow`, so the snow-surfaced fields read
            as boxes you type into rather than dissolving into the panel behind
            them. Same alternation the page sections use.
          -->
          <div class="bg-granite px-7 py-8 sm:px-10 sm:py-9">
            <ContactForm :service="presetService" />
          </div>

          <div
            class="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-spruce/12 bg-granite px-7 py-4 text-sm text-stone sm:px-10"
          >
            <span>Mon–Sat {{ site.hours.weekdays }}</span>
            <a
              :href="`mailto:${site.email}`"
              class="break-all transition-colors hover:text-ember-deep"
            >
              {{ site.email }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active {
  transition: opacity 240ms var(--ease-out-quint);
}

.modal-leave-active {
  transition: opacity 160ms ease-in;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .panel {
  transition: transform 340ms var(--ease-out-quint);
}

.modal-enter-from .panel {
  transform: translateY(1.25rem);
}
</style>
