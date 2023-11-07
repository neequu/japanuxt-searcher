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
    // if (props.count != null && props.items.length >= props.count)
      // return
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
  <!-- <div v-if="items && items.length"> -->
  <p class="mb-5 flex justify-end text-neutral-5">
    {{ count }} results on this page
  </p>
  <!-- </div> -->
  <div class="grid gap-10">
    <WordCard v-for="(item, idx) in items" :key="idx" :item="item" />
  </div>

  <div ref="tailEl" />
  <!-- <ScrollBottom /> -->
</template>
