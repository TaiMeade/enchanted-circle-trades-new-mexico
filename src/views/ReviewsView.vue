<script setup>
import useReviews from '@/composables/useReviews'
import PageHeader from '@/components/layout/PageHeader.vue'
import PlaceholderNotice from '@/components/ui/PlaceholderNotice.vue'
import ReviewCard from '@/components/ui/ReviewCard.vue'
import StarRating from '@/components/ui/StarRating.vue'
import CtaBand from '@/components/home/CtaBand.vue'

const { reviews, total, averageRating, hasPlaceholders } = useReviews()
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Reviews"
      title="What customers say"
      lead="Feedback from homeowners around the Enchanted Circle."
    >
      <div class="mt-10 flex items-center gap-5 border-t border-bone/15 pt-8">
        <StarRating :rating="averageRating" :size="26" :labelled="false" />
        <p class="type-label text-bone/60">
          <span class="text-xl text-bone">{{ averageRating }}</span>
          out of 5 · {{ total }} reviews
        </p>
      </div>
    </PageHeader>

    <section class="bg-bone py-20 lg:py-24">
      <div class="shell">
        <PlaceholderNotice v-if="hasPlaceholders" what="reviews" class="mb-12" />

        <ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="review in reviews" :key="review.id">
            <ReviewCard :review="review" />
          </li>
        </ul>
      </div>
    </section>

    <CtaBand />
  </div>
</template>
