<script setup lang="ts">
import type { JapaneseWord } from '~/types'

definePageMeta({
  layout: 'search-form-layout',
})
const route = useRoute()
const query = ref((route.query.q || '').toString())
const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

async function fetch(page: number) {
  if (!hasMoreItems.value)
    return

  if (page === 1)
    items.value = []

  const data = await searchDictionary(query.value, page)
  if (data.length === 0)
    hasMoreItems.value = false

  items.value.push(...data)

  count.value = items.value.length
}

watch(
  () => route.query.q,
  () => {
    items.value = []
    query.value = (route.query.q || '').toString()
    fetch(1)
  },
)
</script>

<template>
  <section class="mt-10">
    <div v-if="!items.length">
      loading...
    </div>
    <SearchResults :items="items" :fetch="fetch" :count="count" />
  </section>
</template>
