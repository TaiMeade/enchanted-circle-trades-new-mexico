<script setup>
import useReviews from '@/composables/useReviews'
import SectionHeading from '@/components/layout/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import PlaceholderNotice from '@/components/ui/PlaceholderNotice.vue'
import ReviewCard from '@/components/ui/ReviewCard.vue'
import StarRating from '@/components/ui/StarRating.vue'

const { averageRating, total, featured, hasPlaceholders } = useReviews()
</script>

<template>
  <section class="bg-bone py-20 lg:py-28">
    <div class="shell">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow="Reviews" title="What customers say" />

        <div class="flex shrink-0 items-center gap-4">
          <StarRating :rating="averageRating" :size="20" :labelled="false" />
          <p class="type-label text-dusk">
            <span class="text-base text-basalt">{{ averageRating }}</span>
            / 5 · {{ total }} reviews
          </p>
        </div>
      </div>

      <PlaceholderNotice v-if="hasPlaceholders" what="reviews" class="mt-10" />

      <ul class="mt-12 grid gap-6 md:grid-cols-3">
        <li v-for="review in featured(3)" :key="review.id">
          <ReviewCard :review="review" />
        </li>
      </ul>

      <BaseButton :to="{ name: 'reviews' }" variant="outline" class="mt-12" arrow>
        Read all reviews
      </BaseButton>
    </div>
  </section>
</template>
