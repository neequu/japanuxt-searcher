<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()

if (!reviews.reviewWords || reviews.reviewWords.length === 0)
  await navigateTo('/review')

async function redirectReview() {
  const isLastWord = reviews.activeIndex === reviews.reviewWords.length - 1

  if (isLastWord) {
    await navigateTo(`/review/end`)
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
  <section class="grid h-full place-content-center gap-4 text-center md:gap-8">
    <h1 class="text-3xl md:text-7xl">
      {{ reviews.reviewWords[reviews.activeIndex] }}
    </h1>
    <div class="flex flex-wrap place-content-center gap-2 md:gap-4">
      <button class="group hover:shadow-accent4 border border-green rounded-xl px-5 py-2 text-green outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl" @click="updateLevel(1, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Know
        </span>
      </button>
      <button class="group border-accent3 text-accent3 hover:shadow-accent3 border rounded-xl px-5 py-2 outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl" @click="updateLevel(0, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Don't Know
        </span>
      </button>
      <button class="group border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl hover:shadow-accent" @click="updateLevel(2, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Never Forget
        </span>
      </button>
    </div>
  </section>
</template>
