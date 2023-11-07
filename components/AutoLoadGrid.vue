<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  items: JapaneseWord[]
  fetch: (page: number) => Promise<void>
  count?: number
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

if (process.client) {
  loadingNext()
  useIntervalFn(() => {
    if (!tailEl.value || isLoading.value)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      loadingNext()
  }, 500)
}
else {
  await loadingNext()
}
</script>

<template>
  <WordGrid>
    <WordCardSkeleton />
    <WordCardSkeleton />
  </WordGrid>
  <p v-if="!items?.length" />
  <WordGrid v-else>
    <WordCard
      v-for="(item, idx) in items"
      :key="idx"
      :item="item"
    />
  </WordGrid>
  <div ref="tailEl" />
</template>
