<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import projects from '@/data/work.json'
import manifest from '@/assets/work/manifest.json'
import useServices from '@/composables/useServices'
import { openContactModal } from '@/composables/useContactModal'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

/**
 * Before-and-after photos, one job at a time.
 *
 * ── Why side by side and not a drag-to-reveal slider ──
 *
 * The reveal slider only works when both photos were shot from the same spot,
 * so the wipe lines up. These weren't: they are job-site phone photos, taken
 * weeks apart from wherever there was room to stand, and one pair is even
 * portrait-then-landscape. Wiped over each other they read as a glitch.
 * Two frames next to each other let each photo be what it is.
 *
 * The pair spans the full width of the shell, and dissolves at the bottom into
 * a band carrying the job's name and the controls. Frames are 4:5 up to `lg` and square from there:
 * at full width a 4:5 pair would be taller than a laptop screen. Most of the
 * photos are portrait, so the square costs them a little top and bottom; a
 * `focus` in src/data/work.json moves the crop where the middle isn't the
 * point.
 *
 * ── Phones ──
 *
 * Two frames side by side at 375px are postage stamps, and stacked they are a
 * screen and a half of scrolling per job. So below `sm` there is one frame and
 * a Before/After switch. Flipping the same frame between the two is the
 * clearest way to see the change on a small screen anyway.
 *
 * ── Autoplay, and when it stops ──
 *
 * The jobs advance on their own every few seconds, but a carousel that moves
 * while someone is looking at it is taking the photo out of their hands. So
 * it only runs when nobody could be in the middle of something:
 *
 *   - It stops for good the moment someone navigates themselves — arrows,
 *     thumbnails, swipe, arrow keys, or the phone's Before/After switch.
 *     They are looking at something now, and it stays where they left it.
 *   - It holds while the mouse is over the photos, while keyboard focus is
 *     anywhere in the carousel, while the photos are mostly off screen, and
 *     while the tab is in the background.
 *   - It never runs for anyone who has asked their system for reduced motion.
 *
 * ── No pause button, by request ──
 *
 * WCAG 2.2.2 asks for a way to stop anything that moves on its own for more
 * than five seconds. There was a pause/play button and it was taken out at
 * the owner's request. What remains is that any manual navigation stops the
 * rotation for good — pressing an arrow is the stop control. If an
 * accessibility review flags this, the button is the fix: `playing` is still
 * the state it would toggle.
 *
 * Photos come from `npm run photos` — see scripts/optimize-photos.mjs.
 */

const files = Object.fromEntries(
  Object.entries(import.meta.glob('@/assets/work/*.webp', { eager: true, import: 'default' })).map(
    ([path, url]) => [path.split('/').pop(), url]
  )
)

/*
 * `sizes` has to describe the width the image is *drawn* at, not the width of
 * its frame. Under `object-fit: cover` a landscape photo in a 4:5 frame is
 * scaled to the frame's height, which makes it 1.33 times wider than a square
 * frame and 1.67 times wider than a 4:5 one. Using the frame width for those would pick the small file and render
 * it soft.
 */
const SIZES = {
  portrait: '(min-width: 80rem) 37rem, (min-width: 64rem) 30rem, (min-width: 40rem) 47vw, 100vw',
  landscape: '(min-width: 80rem) 49rem, (min-width: 64rem) 40rem, (min-width: 40rem) 78vw, 167vw',
}

function photo(id, side, meta) {
  const key = `${id}-${side}`
  const dims = manifest[key]
  const orientation = dims.height >= dims.width ? 'portrait' : 'landscape'
  return {
    src: files[`${key}-lg.webp`],
    srcset: `${files[`${key}-sm.webp`]} ${dims.sm}w, ${files[`${key}-lg.webp`]} ${dims.lg}w`,
    sizes: SIZES[orientation],
    alt: meta.alt,
    focus: meta.focus ?? '50% 50%',
  }
}

const { services } = useServices()
const tradeName = Object.fromEntries(services.map((s) => [s.slug, s.name]))

const jobs = projects.map((p) => ({
  ...p,
  tradeName: tradeName[p.trade],
  thumb: files[`${p.id}-thumb.webp`],
  before: photo(p.id, 'before', p.before),
  after: photo(p.id, 'after', p.after),
}))

const index = ref(0)
const job = computed(() => jobs[index.value])

/** Which photo a phone shows. Kept across jobs so the switch stays where it was left. */
const phoneSide = ref('after')

/** Manual navigation. Anything a person does to change the job stops autoplay. */
function go(to, { auto = false } = {}) {
  if (!auto) playing.value = false
  index.value = (to + jobs.length) % jobs.length
}

const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

function showSide(side) {
  playing.value = false
  phoneSide.value = side
}

/*
 * ── Autoplay ──
 *
 * `playing` is whether autoplay is still wanted — true until someone
 * navigates, or never for reduced motion.
 * `running` is whether the clock is actually ticking right now, which also
 * needs the carousel on screen, the tab visible, and nobody hovering or
 * keyboard-focused inside it. See the note at the top of this file.
 */
const AUTOPLAY_MS = 6000

const playing = ref(false)
const hovering = ref(false)
const focused = ref(false)
const inView = ref(false)
const pageVisible = ref(true)

const running = computed(
  () => playing.value && inView.value && pageVisible.value && !hovering.value && !focused.value
)

/*
 * A pause restarts the countdown from the top rather than resuming it, and the
 * progress bar on the current thumbnail restarts with it — `runId` is part of
 * that bar's key, so each fresh run redraws it from empty. A bar that resumed
 * at 70% over a timer that had quietly reset would be lying.
 */
const runId = ref(0)
let timer = null

watch([index, running], ([, isRunning], [, wasRunning]) => {
  clearTimeout(timer)
  if (!isRunning) return
  if (!wasRunning) runId.value++
  timer = setTimeout(() => go(index.value + 1, { auto: true }), AUTOPLAY_MS)
})

function onPointerEnter(event) {
  if (event.pointerType === 'mouse') hovering.value = true
}

function onPointerLeave(event) {
  if (event.pointerType === 'mouse') hovering.value = false
}

/*
 * Keyboard focus only. A mouse click also focuses the button it lands on, and
 * without the `:focus-visible` check, clicking play would pause the carousel
 * it had just started.
 */
function onFocusIn(event) {
  if (event.target.matches?.(':focus-visible')) focused.value = true
}

function onFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) focused.value = false
}

function onVisibilityChange() {
  pageVisible.value = document.visibilityState === 'visible'
}

/*
 * ── Arrow keys ──
 *
 * Handled on the whole carousel, so they work from the buttons, the switch or
 * the picker. If focus was on a thumbnail it follows the selection, otherwise
 * arrowing through the picker would leave focus on a job that is no longer
 * showing.
 */
const rail = ref(null)

async function onKeydown(event) {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
  event.preventDefault()
  const fromThumb = rail.value?.contains(document.activeElement)
  event.key === 'ArrowRight' ? next() : prev()
  if (fromThumb) {
    await nextTick()
    rail.value.querySelector('[aria-current="true"]')?.focus()
  }
}

/*
 * ── Swipe ──
 *
 * `touch-action: pan-y` on the stage leaves vertical scrolling to the browser
 * and hands horizontal drags to these handlers. A drag has to be mostly
 * sideways and cover 40px to count, so a slightly diagonal scroll doesn't
 * change the job out from under someone.
 */
let start = null

function onPointerDown(event) {
  start = { x: event.clientX, y: event.clientY }
}

function onPointerUp(event) {
  if (!start) return
  const dx = event.clientX - start.x
  const dy = event.clientY - start.y
  start = null
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return
  dx < 0 ? next() : prev()
}

/*
 * ── Keeping the next job ready ──
 *
 * The stage cross-fades, and a fade into a photo that hasn't downloaded yet is
 * a fade into an empty frame. Warming the neighbours on either side means the
 * next tap in either direction lands on a photo that's already there, without
 * downloading all 24 up front.
 */
function warm(i) {
  const j = jobs[(i + jobs.length) % jobs.length]
  for (const p of [j.before, j.after]) {
    const img = new Image()
    img.sizes = p.sizes
    img.srcset = p.srcset
  }
}

/*
 * The picker scrolls sideways below `lg`. Keep the current job in view by
 * scrolling the rail itself — `scrollIntoView` would also scroll the page,
 * yanking it down to the rail whenever someone tapped "next" above it.
 *
 * The reduced-motion check is needed here even though main.css already turns
 * smooth scrolling off: an explicit `behavior: 'smooth'` beats the stylesheet.
 */
function centreThumb() {
  const el = rail.value?.querySelector('[aria-current="true"]')
  if (!el || rail.value.scrollWidth <= rail.value.clientWidth) return
  const left = el.offsetLeft - rail.value.clientWidth / 2 + el.clientWidth / 2
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  rail.value.scrollTo({ left, behavior: still ? 'auto' : 'smooth' })
}

watch(
  index,
  async (i) => {
    warm(i + 1)
    warm(i - 1)
    await nextTick()
    centreThumb()
  },
  { flush: 'post' }
)

/*
 * The first neighbours, once the section is about to scroll into view. Not on
 * page load: most visitors are here for a phone number, and there is no reason
 * to spend their data on photos of job number twelve before they get near it.
 */
const section = ref(null)
const stage = ref(null)
let observer = null
let viewObserver = null

onMounted(() => {
  playing.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  onVisibilityChange()
  document.addEventListener('visibilitychange', onVisibilityChange)

  if (!('IntersectionObserver' in window)) return
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return
      warm(index.value + 1)
      warm(index.value - 1)
      observer.disconnect()
    },
    { rootMargin: '300px 0px' }
  )
  observer.observe(section.value)

  // Autoplay only counts down while most of the photos are actually on screen.
  viewObserver = new IntersectionObserver(
    ([entry]) => (inView.value = entry.intersectionRatio >= 0.5),
    { threshold: [0, 0.5, 1] }
  )
  viewObserver.observe(stage.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  viewObserver?.disconnect()
  clearTimeout(timer)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <section
    id="work"
    ref="section"
    class="on-dark scroll-mt-(--header-h) bg-pitch py-12 text-snow sm:py-20 lg:py-28"
    aria-roledescription="carousel"
    aria-label="Before and after photos"
  >
    <div class="shell" @keydown="onKeydown" @focusin="onFocusIn" @focusout="onFocusOut">
      <SectionHeading
        tone="light"
        eyebrow="Our work"
        title="As we found it, as we left it"
        :lead="`${jobs.length} jobs, photographed at the start and at the finish.`"
      />

      <!-- Phone-only switch. From `sm` up both photos are on screen. -->
      <div class="mt-8 mb-3 grid grid-cols-2 sm:hidden" role="group" aria-label="Show photo">
        <button
          v-for="side in ['before', 'after']"
          :key="side"
          type="button"
          class="h-12 border text-base font-medium capitalize transition-colors duration-200"
          :class="
            phoneSide === side
              ? 'border-snow bg-snow text-pitch'
              : 'border-snow/25 text-snow/75 hover:text-snow'
          "
          :aria-pressed="phoneSide === side"
          @click="showSide(side)"
        >
          {{ side }}
        </button>
      </div>

      <!--
        The stage. Full width of the shell, and edge to edge on a phone, where
        the gutter would otherwise take a tenth of an already narrow photo.
      -->
      <div class="-mx-5 sm:mx-0 sm:mt-12 lg:mt-16">
        <div
          ref="stage"
          class="relative touch-pan-y select-none"
          @pointerenter="onPointerEnter"
          @pointerleave="onPointerLeave"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="start = null"
        >
          <Transition name="work-fade" mode="out-in">
            <div
              :key="job.id"
              class="grid gap-1 sm:grid-cols-2 sm:gap-2"
              role="group"
              aria-roledescription="slide"
              :aria-label="`${index + 1} of ${jobs.length}: ${job.title}`"
            >
              <figure
                v-for="side in ['before', 'after']"
                :key="side"
                class="relative aspect-[4/5] overflow-hidden bg-spruce lg:aspect-square"
                :class="phoneSide !== side && 'max-sm:hidden'"
              >
                <img
                  :src="job[side].src"
                  :srcset="job[side].srcset"
                  :sizes="job[side].sizes"
                  :alt="job[side].alt"
                  :style="{ objectPosition: job[side].focus }"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
                <!--
                  Ember is light on an edge, never a fill — so the finished job
                  is the one that catches it.
                -->
                <span
                  v-if="side === 'after'"
                  class="absolute inset-x-0 top-0 h-[3px] bg-ember"
                  aria-hidden="true"
                />
                <figcaption
                  class="absolute top-3 left-3 bg-pitch/85 px-3 py-1.5 text-sm font-semibold text-snow capitalize sm:top-4 sm:left-4"
                >
                  {{ side }}
                </figcaption>
              </figure>
            </div>
          </Transition>

          <!--
            The photos' bottom edge dissolving into the band below. Outside
            the transition, so it holds steady while the photos change.
          -->
          <div
            class="work-dissolve pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-20"
            aria-hidden="true"
          />
        </div>

        <!--
          The caption band, under the photos: the job's name, then the
          controls, then the one action. Order holds at every width — below
          `lg` the title takes its own line and the controls wrap beneath it.

          None of this is inside the transition. The arrows have to survive a
          change of job, or a keyboard user who presses one loses focus.
        -->
        <div
          class="work-band flex flex-wrap items-center gap-x-6 gap-y-4 px-5 pt-3 pb-8 sm:px-6 sm:pt-4 lg:flex-nowrap lg:px-8 lg:pb-10"
        >
          <h3
            class="type-display basis-full text-xl text-balance text-snow sm:text-2xl lg:flex-1 lg:basis-auto lg:text-3xl"
          >
            {{ job.title }}
          </h3>

          <div class="flex items-center gap-2">
            <p class="mr-2 text-[0.9375rem] text-snow/80 tabular-nums" aria-hidden="true">
              {{ index + 1 }} of {{ jobs.length }}
            </p>
            <button
              type="button"
              class="grid h-12 w-12 shrink-0 place-items-center border border-snow/40 text-snow transition-colors duration-200 hover:bg-snow hover:text-pitch"
              aria-label="Previous job"
              @click="prev"
            >
              <AppIcon name="arrowLeft" :size="20" />
            </button>
            <button
              type="button"
              class="grid h-12 w-12 shrink-0 place-items-center border border-snow/40 text-snow transition-colors duration-200 hover:bg-snow hover:text-pitch"
              aria-label="Next job"
              @click="next"
            >
              <AppIcon name="arrowRight" :size="20" />
            </button>
          </div>

          <BaseButton
            variant="outlineLight"
            class="shrink-0 max-sm:w-full sm:ml-auto lg:ml-0"
            @click="openContactModal(job.tradeName)"
          >
            Ask about a job like this
          </BaseButton>
        </div>
      </div>

      <!-- Announces the change for screen readers, once, without the photo alt text. -->
      <p class="sr-only" :aria-live="running ? 'off' : 'polite'">
        Job {{ index + 1 }} of {{ jobs.length }}: {{ job.title }}
      </p>

      <!--
        The picker. Twelve after-shots in a row: a scan of the whole body of
        work, and a way to jump straight to the kitchen without tapping through
        eleven other jobs. Scrolls sideways below `lg`.
      -->
      <ol
        ref="rail"
        class="work-rail relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-12 lg:overflow-visible lg:pb-0"
        aria-label="Pick a job"
      >
        <li v-for="(item, i) in jobs" :key="item.id" class="shrink-0">
          <button
            type="button"
            class="relative block aspect-square w-16 overflow-hidden bg-spruce sm:w-20 lg:w-full"
            :aria-label="item.title"
            :aria-current="i === index ? 'true' : undefined"
            @click="go(i)"
          >
            <img
              :src="item.thumb"
              alt=""
              width="176"
              height="176"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-opacity duration-200"
              :class="i === index ? 'opacity-100' : 'opacity-45 hover:opacity-80'"
            />
            <!--
              The current job's rim doubles as the countdown: while autoplay
              runs it fills left to right, and the next job arrives when it
              is full. Stopped, it is simply a full rim.
            -->
            <span
              v-if="i === index"
              :key="`${index}-${runId}`"
              class="absolute inset-x-0 top-0 h-[3px] origin-left bg-ember"
              :class="running && 'work-progress'"
              :style="running ? { animationDuration: `${AUTOPLAY_MS}ms` } : undefined"
              aria-hidden="true"
            />
          </button>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
/*
 * ── The caption band ──
 *
 * A faint warmth under the photos that settles into the dark ground of the
 * section — the alpenglow idea the palette comes from, kept to an ember
 * glow rather than a flare. Full-strength orange here pulled the eye away from
 * the photos, which are the point.
 *
 * `--work-glow` is 30% `ember-dark` in `pitch`: warm enough to read as the
 * brand colour, dark enough to stay behind the work.
 *
 * Two pieces make one gradient. `.work-dissolve` sits over the bottom of the
 * photos and ends in solid glow; `.work-band` sits beneath them and starts
 * from the same solid glow. Both ends are fully opaque, so the seam where they
 * meet cannot show, and the band ends in `pitch` — the section's own
 * background — so it has no bottom edge either.
 *
 * Every word in the band sits on glow shading into `pitch`, both darker than
 * `ember-dark`, so snow type clears 8.6:1 everywhere with no photo behind it.
 */
.work-dissolve,
.work-band {
  --work-glow: color-mix(in srgb, var(--color-ember-dark) 30%, var(--color-pitch));
}

.work-dissolve {
  background: linear-gradient(
    to bottom,
    transparent 0%,
    color-mix(in srgb, var(--work-glow) 35%, transparent) 55%,
    var(--work-glow) 100%
  );
}

.work-band {
  background: linear-gradient(to bottom, var(--work-glow) 0%, var(--color-pitch) 70%);
}

/* A thin rail on the dark ground, not the OS default's grey slab. */
.work-rail {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--color-snow) 25%, transparent) transparent;
}

.work-progress {
  animation: work-progress linear both;
}

@keyframes work-progress {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

.work-fade-enter-active,
.work-fade-leave-active {
  transition: opacity 160ms ease-out;
}

.work-fade-enter-from,
.work-fade-leave-to {
  opacity: 0;
}
</style>
