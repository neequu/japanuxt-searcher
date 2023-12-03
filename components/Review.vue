<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()
const isLoading = ref(false)

async function nextReview() {
  const isLastWord = reviews.activeIndex === reviews.reviewWords.length - 1

  if (isLastWord) {
    await refreshNuxtData('userWords')
    await navigateTo(`/review/end`)
    return
  }
  const nextWord = reviews.reviewWords[reviews.activeIndex + 1]
  if (nextWord)
    reviews.setActiveIndex(reviews.activeIndex + 1)
  await refreshNuxtData('userWords')
}

async function updateLevel(lvl: number, word: string) {
  isLoading.value = true
  await $fetch('/api/supabase/user-words/change-level', {
    method: 'post',
    body: { lvl, word },
  })

  isLoading.value = false
  nextReview()
}
</script>

<template>
  <section class="grid h-full place-content-center gap-4 text-center md:gap-8">
    <Transition name="review">
      <h1 :key="reviews.activeIndex" lang="jp" class="text-3xl md:text-7xl">
        {{ reviews.reviewWords[reviews.activeIndex] }}
      </h1>
    </Transition>
    <div class="flex flex-wrap place-content-center gap-2 md:gap-4">
      <button :disabled="isLoading" class="group border border-green rounded-xl px-5 py-2 text-green outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent-lightgreen disabled:filter-brightness-60" @click="updateLevel(2, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Know
        </span>
      </button>
      <button :disabled="isLoading" class="group border border-accent-red rounded-xl px-5 py-2 text-accent-red outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent-red disabled:filter-brightness-60" @click="updateLevel(1, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Don't Know
        </span>
      </button>
      <button :disabled="isLoading" class="group border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent disabled:filter-brightness-60" @click="updateLevel(3, reviews.reviewWords[reviews.activeIndex])">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Never Forget
        </span>
      </button>
    </div>
  </section>
</template>

<style>
.review-enter-active,
.review-leave-active {
  transition: filter 1000ms ease;
}

.review-enter-from,
.review-leave-to {
  filter: blur(1rem);
  position: absolute;
  top: -100000px;
}
</style>
