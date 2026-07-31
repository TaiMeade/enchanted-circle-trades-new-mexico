<script setup>
/**
 * The viga rule.
 *
 * In adobe construction the vigas — the round roof beams — project through the
 * exterior wall at regular intervals, so the building's structure is legible
 * from outside as a row of evenly spaced ends. This divider borrows that rhythm.
 *
 * Used as a structural separator between a heading and its content. It is a
 * rule, not an ornament — if it isn't dividing anything, leave it out.
 */
defineProps({
  /** Rule width. Full-width rules read as section breaks; short ones as accents. */
  width: { type: String, default: '4rem' },
})
</script>

<template>
  <div class="viga h-2.5" :style="{ width }" aria-hidden="true" />
</template>

<style scoped>
.viga {
  /* Beam ends: a 2px tick every 9px, inheriting the parent's text color. */
  background-image: repeating-linear-gradient(to right, currentColor 0 2px, transparent 2px 9px);
}
</style>
