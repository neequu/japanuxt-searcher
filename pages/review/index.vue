<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()
const { data: userWords } = await getUserWords()
const dueWords = userWords.value.filter(w => w.strength !== 2 && (w.next_review_date == null || new Date(w.next_review_date) < new Date()))
reviews.setReviewWords(dueWords.map(w => w.word))

const wordsLength = userWords.value.length
const reviewSession = ref(false)
onMounted(() => {
  if (reviews.reviewWords.length > 0 && reviews.activeIndex)
    reviewSession.value = true
})

useHead({
  title: `Review · nequjp`,
})
</script>

<template>
  <Review v-if="reviewSession" />
  <section v-else class="mt-8 h-full flex flex-1 flex-col items-center md:place-content-center md:gap-4">
    <h1 class="mb-4 text-center text-xl md:text-3xl">
      Current Stats
    </h1>
    <div class="mb-4 text-center md:text-2xl">
      <p>Words {{ userWords?.length }}</p>
      <p>Learning {{ wordsLength - dueWords.length }}</p>
      <p>Due words {{ dueWords.length }}</p>
    </div>
    <button v-if="dueWords.length" class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" @click="reviewSession = true">
      <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
        Review {{ dueWords.length === 1 ? `${dueWords.length} word` : `${dueWords.length} words` }}
      </span>
    </button>
    <div v-else class="grid mt-4 place-items-center gap-4">
      <p class="text-center md:text-2xl">
        Good job! You don't have any words for review at the moment
      </p>
      <div class="flex gap-4">
        <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/decks">
          <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
            JLPT Decks
          </span>
        </NuxtLink>
        <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/">
          <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
            Go Home
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
