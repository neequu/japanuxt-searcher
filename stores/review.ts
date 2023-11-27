import { defineStore } from 'pinia'

export const useReviewStore = defineStore('review', () => {
  const activeIndex = ref(0)
  const reviewWords = ref<string[]>([])

  function setActiveIndex(index: number) {
    activeIndex.value = index
  }

  function setReviewWords(words: string[]) {
    reviewWords.value = words as any
  }

  return { setActiveIndex, activeIndex, setReviewWords, reviewWords }
}, { persist: {
  storage: persistedState.localStorage,
} })
