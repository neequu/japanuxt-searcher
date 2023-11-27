<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()

const userWords = ref<any>([])
const isLoading = ref(false)
async function fetch() {
  isLoading.value = true
  const words = await getUserWords()
  userWords.value = words
  isLoading.value = false
  // const learningWords = words.filter(w => w.strength === 0).map(w => w.word)
  const learningWords = words.map(w => w.word)
  reviews.setReviewWords(learningWords)
}

fetch()
</script>

<template>
  <div>
    <NuxtLink :to="`/review/${Array.from(reviews.reviewWords)[reviews.activeIndex]}`">
      go to
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>

</style>
