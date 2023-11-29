<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()
if (reviews.reviewWords.length > 0 && reviews.activeIndex)
  await navigateTo(`/review/${reviews.reviewWords[reviews.activeIndex]}`)
// todo: add type
const { data: userWords } = await getUserWords()
const newWords = userWords.value.filter(w => w.strength === 0).map(w => w.word)
reviews.setReviewWords(newWords)

const wordsLength = userWords.value.length
</script>

<template>
  <section class="mt-8 h-full flex flex-1 flex-col place-content-center items-center md:gap-10">
    <h1 class="mb-4 text-center text-xl md:text-5xl">
      Current Stats
    </h1>
    <div class="mb-4 text-center text-base md:text-3xl">
      <p>Words {{ userWords?.length }}</p>
      <p>You know {{ wordsLength - newWords.length }}</p>
      <p>New words {{ newWords.length }}</p>
    </div>
    <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl hover:shadow-accent" :to="`/review/${Array.from(reviews.reviewWords)[reviews.activeIndex]}`">
      <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
        Start Review
      </span>
    </NuxtLink>
  </section>
</template>
