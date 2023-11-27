<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()

if (reviews.reviewWords?.length === 0)
  await navigateTo('/review')

async function redirectReview() {
  const isLastWord = reviews.activeIndex === reviews.reviewWords.length - 1

  if (isLastWord) {
    await navigateTo(`/review/end`)
    reviews.setActiveIndex(0)
    reviews.setReviewWords([])
    return
  }
  const nextWord = reviews.reviewWords[reviews.activeIndex + 1]
  if (nextWord) {
    reviews.setActiveIndex(reviews.activeIndex + 1)
    await navigateTo(`/review/${nextWord}`)
  }
}

async function updateLevel(lvl: number, word: string) {
  await $fetch('/api/supabase/user-words/change-level', {
    method: 'post',
    body: { lvl, word },
  })

  redirectReview()
}
</script>

<template>
  {{ reviews }}
  size {{ reviews.reviewWords.length }}
  <section class="text-center">
    <h1 class="text-5xl">
      {{ reviews.reviewWords[reviews.activeIndex] }}
    </h1>
    <div class="grid">
      <button class="text-#0f9" @click="updateLevel(1, reviews.reviewWords[reviews.activeIndex])">
        know
      </button>
      <button class="text-#f44" @click="updateLevel(0, reviews.reviewWords[reviews.activeIndex])">
        don't know
      </button>
      <button class="text-#0a0" @click="updateLevel(2, reviews.reviewWords[reviews.activeIndex])">
        never forget
      </button>
    </div>
  </section>
</template>
