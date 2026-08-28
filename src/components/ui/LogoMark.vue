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
   * preflight's `max-width: 100%` stops it overflowing a narrow column.
   *
   * Do not go far below 40: the ring text and the tool line-art turn to mush,
   * and at that point the badge is only a texture.
   */
  size: { type: Number, default: 44 },

  /**
   * How the artwork meets the surface behind it. See the note on `.knockout`
   * in the style block — the short version is that `tile` is for light grounds
   * and `knockout` is for dark ones.
   */
  tone: {
    type: String,
    default: 'tile',
    validator: (v) => ['tile', 'knockout'].includes(v),
  },
})

const src = `${import.meta.env.BASE_URL}logo.jpg`
</script>

<template>
  <img
    :src="src"
    :width="size"
    :height="size"
    :class="tone === 'knockout' ? 'knockout' : 'bg-snow'"
    alt=""
    aria-hidden="true"
    class="h-auto shrink-0 object-contain"
  />
</template>

<style scoped>
/*
 * ── Putting black-on-white line-art on a dark ground ──
 *
 * The source is a JPEG, so there is no transparency: the artwork's own white
 * ground renders as a square. At 44px in the header that reads as a stamp and
 * is fine. At 260px on the hero's near-black gradient it would be a wall.
 *
 * So invert it — the lines go white, the ground goes black — and hue-rotate to
 * bring the orange dots back from the cyan that inverting turns them into.
 * `screen` then drops the black ground out completely: screened against black
 * a backdrop comes back untouched, and against white it comes back white. What
 * survives is white line-art with warm dots, sitting directly on the gradient.
 *
 * Two things this depends on, both of which the hero satisfies deliberately:
 *
 *   1. No ancestor between this image and the element painting the gradient may
 *      create a stacking context, or the blend isolates and there is nothing to
 *      blend with — the result would be a black square instead of a white one.
 *      HeroSection.vue carries a note about the `z-10` it had to drop.
 *   2. The hue-rotate is CSS's matrix approximation, not a true HSL rotation,
 *      so the dots land near `ember-light` rather than exactly on it. On a
 *      photograph that would matter; on six 8px dots it does not.
 *
 * If a browser ignores the blend mode the fallback is inverted art on a near
 * black square, which against `pitch` is very close to invisible anyway.
 *
 * None of this is needed the moment there is a transparent PNG or SVG export of
 * the same artwork: drop the file in, and this whole block goes away.
 */
.knockout {
  filter: invert(1) hue-rotate(180deg);
  mix-blend-mode: screen;
}
</style>
