<script setup>
import {
  FAR_CREST,
  FAR_CREST_LENGTH,
  FAR_RIDGE,
  NEAR_RIDGE,
  RIDGE_VIEWBOX,
} from '@/design/ridgeline'

/**
 * The horizon at the foot of the hero.
 *
 * Two ridges and a lit crest. The far ridge sits lighter than the sky behind it
 * — that is what distance does to a mountain — and the near ridge is the
 * darkest thing on the page. The light lands on the far crest only: alpenglow
 * catches the high peaks, never the mass below them.
 *
 * The draw-on is a plain CSS animation rather than a class toggled after mount.
 * The class approach needs requestAnimationFrame to land the starting offset
 * before transitioning it, and rAF does not run in a background tab — so a page
 * opened in a background tab rendered the ridge with no light on it at all.
 * A keyframe animation just runs.
 */
const glowId = `ridge-glow-${Math.random().toString(36).slice(2, 9)}`
</script>

<template>
  <svg
    class="block w-full"
    :viewBox="RIDGE_VIEWBOX"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
    focusable="false"
    :style="{ '--crest-length': FAR_CREST_LENGTH }"
  >
    <!--
      The gradient is the part that makes this read as light. A single even
      stroke along the whole crest looks like a chart line drawn over a
      mountain; fading it in and out puts the sun somewhere.

      `ember` is decoration-only by contract (3.71:1 on light), which is exactly
      what it is doing here — catching an edge, never carrying text.
    -->
    <defs>
      <linearGradient :id="glowId" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="var(--color-ember)" stop-opacity="0" />
        <stop offset="0.16" stop-color="var(--color-ember)" stop-opacity="0.45" />
        <stop offset="0.34" stop-color="var(--color-ember)" stop-opacity="0.95" />
        <stop offset="0.62" stop-color="var(--color-ember)" stop-opacity="0.5" />
        <stop offset="0.9" stop-color="var(--color-ember)" stop-opacity="0" />
      </linearGradient>
    </defs>

    <path :d="FAR_RIDGE" class="fill-spruce-light" />

    <!-- Soft bloom, then a fine rim on the same line. -->
    <path
      :d="FAR_CREST"
      class="crest"
      fill="none"
      :stroke="`url(#${glowId})`"
      stroke-width="16"
      stroke-linejoin="round"
      stroke-linecap="round"
      opacity="0.3"
    />
    <path
      :d="FAR_CREST"
      class="crest"
      fill="none"
      :stroke="`url(#${glowId})`"
      stroke-width="2.5"
      stroke-linejoin="round"
      stroke-linecap="round"
    />

    <path :d="NEAR_RIDGE" class="fill-pitch" />
  </svg>
</template>

<style scoped>
.crest {
  stroke-dasharray: var(--crest-length);
  animation: draw-crest 1.8s var(--ease-out-quint) both;
}

@keyframes draw-crest {
  from {
    stroke-dashoffset: var(--crest-length);
  }
  to {
    stroke-dashoffset: 0;
  }
}

/*
  The global reduced-motion rule clamps animation-duration to 0.01ms, which
  lands on the same finished frame. Dropping the dash outright is clearer about
  the intent: the light is simply already there.
*/
@media (prefers-reduced-motion: reduce) {
  .crest {
    animation: none;
    stroke-dasharray: none;
  }
}
</style>
