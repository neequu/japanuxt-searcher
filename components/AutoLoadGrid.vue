<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  items: JapaneseWord[]
  fetch: (page: number) => Promise<void>
  count?: number
  hasMoreItems: boolean
}>()

const tailEl = ref<HTMLDivElement>()

let page = 0
const isLoading = ref(false)

async function loadingNext() {
  if (isLoading.value)
    return
  isLoading.value = true
  try {
    page += 1
    await props.fetch(page)
  }
  finally {
    isLoading.value = false
  }
}

loadingNext()

if (process.client) {
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value || !props.hasMoreItems)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 300)
      loadingNext()
  }, 500)
}
</script>

<template>
  <WordGrid v-if="hasMoreItems && items.length === 0 || isLoading">
    <WordCardSkeleton v-for="(_, idx) in 10" :key="idx" />
  </WordGrid>
  <WordGrid>
    <WordCard
      v-for="(item, idx) in items"
      :key="idx"
      :item="item"
    />
  </WordGrid>
  <div ref="tailEl" />
  <div v-if="items.length > 19 && isLoading" class="grid mt-5 place-content-center">
    <div class="i-tdesign:loading animate-spin text-2xl md:text-4xl" />
  </div>
  <p class="mt-5 text-right md:text-xl">
    Total results: {{ count }}
  </p>
</template>
