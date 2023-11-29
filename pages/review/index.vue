<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

// import type { Database } from '~/supabase'
const reviews = useReviewStore()
// todo add type
const { data: userWords } = await getUserWords()
const learningWords = userWords.value?.map(w => w.word)
reviews.setReviewWords(learningWords)

const learningWordsLength = userWords.value.filter(w => w.learning).length
const wordsLength = userWords.value.length
</script>

<template>
  {{ userWords }}
  <section class="mt-8">
    <h1 class="mb-4 text-3xl">
      Current Stats
    </h1>
    <div class="mb-4 text-xl">
      <p class="">
        Words {{ userWords?.length }}
      </p>
      <p class="">
        Learning {{ learningWordsLength }}
      </p>
      <p class="">
        You know {{ wordsLength - learningWordsLength }}
      </p>
    </div>
  </section>
  <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" :to="`/review/${Array.from(reviews.reviewWords)[reviews.activeIndex]}`">
    <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
      Start Review
    </span>
  </NuxtLink>
</template>
