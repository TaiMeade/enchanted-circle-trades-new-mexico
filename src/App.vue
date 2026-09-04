<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ContactModal from '@/components/contact/ContactModal.vue'
</script>

<template>
  <!--
    <v-app> is here so Vuetify's overlays (snackbar, menus) have a mount target.
    Its own background and min-height are neutralised in styles/main.css — every
    visible surface on this site is Tailwind's.
  -->
  <v-app>
    <!--
      ── The logo cut-outs ──

      The logo ships as a JPEG, so it has no alpha and its white ground renders
      as a square. These two filters turn darkness into opacity — alpha becomes
      1 − luminance — which drops the ground and leaves the drawing sitting on
      whatever is behind it.

      `feColorMatrix` writes the alpha row; `ink` passes the original colors
      through (black strokes, ember dots), `white` replaces every channel with
      1. The transfer function that follows does two jobs: it floors JPEG
      ringing around the strokes to fully transparent, so no ghost square
      survives, and it lifts the ember dots — mid-luminance, so only ~0.56
      opaque on their own — back to solid.

      ── Two details that are load-bearing, and both look like noise ──

      1. The alpha row reads `… 1 0`, not `… 0 1`. Writing the +1 as the
         constant instead of as the coefficient on incoming alpha gives the
         same answer for every pixel of the image and the wrong one everywhere
         else: a filter's region is padded 10% past the source, that padding
         arrives as transparent black, and `1 − luminance(0,0,0)` is 1. The
         mark rendered inside a fat opaque frame. Taking alpha from alpha means
         transparent input stays transparent.
      2. The region is pinned to the object's own box, so nothing can paint
         outside the image in the first place.

      Defined here, once, rather than in LogoMark.vue: an id has to be unique
      per document, and the mark renders three times on a page.
    -->
    <svg class="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="logo-cut-ink"
          color-interpolation-filters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -0.2126 -0.7152 -0.0722 1 0"
          />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0.25 0.7 1 1 1 1 1" />
          </feComponentTransfer>
        </filter>

        <filter
          id="logo-cut-white"
          color-interpolation-filters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1
                    0 0 0 0 1
                    0 0 0 0 1
                    -0.2126 -0.7152 -0.0722 1 0"
          />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0 0.25 0.7 1 1 1 1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>

    <a
      href="#main"
      class="type-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-pitch focus:px-5 focus:py-3 focus:text-snow"
    >
      Skip to content
    </a>

    <AppHeader />

    <!-- Offset for the fixed header. -->
    <main id="main" class="pt-(--header-h)">
      <RouterView />
    </main>

    <AppFooter />

    <!--
      Mounted once, here, so a single instance serves every "get an estimate"
      button on the site. It teleports itself to <body> when opened.
      Kept after AppHeader so that opening it from the mobile menu resolves in
      the right order — the menu's scroll lock releases before the modal's.
    -->
    <ContactModal />
  </v-app>
</template>
