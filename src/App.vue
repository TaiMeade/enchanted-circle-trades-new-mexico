<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<template>
  <!--
    <v-app> is here so Vuetify's overlays (snackbar, menus) have a mount target.
    Its own background and min-height are neutralised in styles/main.css — every
    visible surface on this site is Tailwind's.
  -->
  <v-app>
    <a
      href="#main"
      class="type-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:bg-basalt focus:px-5 focus:py-3 focus:text-bone"
    >
      Skip to content
    </a>

    <AppHeader />

    <!-- Offset for the fixed header. -->
    <main id="main" class="pt-18 lg:pt-20">
      <RouterView />
    </main>

    <AppFooter />
  </v-app>
</template>
