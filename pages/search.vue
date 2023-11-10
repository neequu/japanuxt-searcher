<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const route = useRoute()
const router = useRouter()

const query = ref((route.query.q || '').toString())
const currentSearch = ref(query.value)

const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

function search() {
  if (!query.value.trim())
    return
  currentSearch.value = query.value
  router.replace({ query: { q: query.value } })
  count.value = undefined
  items.value = []
  hasMoreItems.value = true
}

async function fetch(page = 1) {
  if (!hasMoreItems.value)
    return
  const data = await searchDictionary(query.value, page)

  if (data.length === 0)
    hasMoreItems.value = false

  if (page > 1)
    items.value.push(...data)
  else
    items.value = data

  count.value = items.value.length
}

useHead({
  title: computed(() => `${route.query.q} - japanese meaning · nequjp`),
})
</script>

<template>
  <section class="mt-2">
    <SearchForm v-model="query " :on-submit="search" />
  </section>
  <section class="mt-10 pb-10">
    <div v-if="count === 0" class="text-2xl">
      No results found.
    </div>
    <AutoLoadGrid :key="currentSearch" :items="items" :fetch="fetch" :count="count" />
  </section>
</template>
