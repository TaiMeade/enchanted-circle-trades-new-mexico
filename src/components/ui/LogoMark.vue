<script setup>
/**
 * The business's logo: a circular badge with the name set around the ring, Zia
 * symbols at the cardinal points, and crossed tools at the centre.
 *
 * ── Why the file lives in `public/` ──
 * index.html points the browser tab icon and the Apple touch icon at the same
 * image, and a hashed build asset under `src/assets/` is not reachable from
 * there. Keeping it in `public/` means one file serves all three. The cost is
 * that the URL has to carry the deploy base by hand — the site is served from
 * a GitHub Pages subpath, not from the domain root — which is what `BASE_URL`
 * is doing below.
 *
 * Decorative at every call site: each one already names the business in
 * adjacent text or on the link itself, so announcing it again is noise.
 */
defineProps({
  /**
   * Square size in px. Sets the `width`/`height` attributes, which fix the
   * aspect ratio for layout and act as the rendered width unless a caller
   * passes a width class — `h-auto` below keeps it square either way, and
   * preflight's `max-width: 100%` stops it overflowing a narrow column (pass
   * `max-w-none` alongside a width class when the mark is meant to bleed).
   *
   * Do not go far below 40: the ring text and the tool line-art turn to mush,
   * and at that point the badge is only a texture.
   */
  size: { type: Number, default: 44 },

  /**
   * Which way the artwork reads.
   *
   *   ink    black line-art with the ember dots intact — for light grounds.
   *   white  the same drawing in solid white — for dark grounds.
   *
   * Both are cut out of the source image's white ground, so the mark sits on
   * whatever is behind it rather than on a square. See the style block.
   */
  tone: {
    type: String,
    default: 'ink',
    validator: (v) => ['ink', 'white'].includes(v),
  },
})

const src = `${import.meta.env.BASE_URL}logo.jpg`
</script>

<template>
  <img
    :src="src"
    :width="size"
    :height="size"
    :class="tone === 'white' ? 'logo-white' : 'logo-ink'"
    alt=""
    aria-hidden="true"
    class="h-auto shrink-0 object-contain"
  />
</template>

<style scoped>
/*
 * ── Cutting line-art out of a JPEG ──
 *
 * The source has no alpha channel: its own white ground renders as a square.
 * That reads as a stamp at 44px in the header and as a wall at 26rem behind
 * the hero, and on the green footer it is just wrong.
 *
 * So both tones run through an SVG filter (defined once, in App.vue) that
 * turns darkness into opacity: alpha becomes 1 − luminance, so the white
 * ground falls away and the drawing stays. `ink` keeps the original colors —
 * black strokes, ember dots. `white` throws the same coverage in solid white.
 *
 * A filter rather than the `mix-blend-mode: screen` this used to do, because
 * blending only reaches back as far as the nearest stacking context. That made
 * the mark unusable inside the fixed, backdrop-blurred header, and made the
 * hero's markup order load-bearing in a way no one would guess from reading
 * it. A filter produces real transparency and composites like any other image.
 *
 * If a browser drops the filter the fallback is the raw square — visible, but
 * not broken.
 */
.logo-ink {
  filter: url('#logo-cut-ink');
}

.logo-white {
  filter: url('#logo-cut-white');
}
</style>
