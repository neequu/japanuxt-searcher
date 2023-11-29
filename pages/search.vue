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
  // router.replace({ query: { q: query.value } })
  router.push({
    name: 'search',
    query: {
      q: query.value,
    },
  })
  count.value = undefined
  items.value = []
  hasMoreItems.value = true
}

async function fetch(page: number) {
  if (!hasMoreItems.value)
    return
  const { data: words } = await searchDictionary(query.value, page)

  if (words.value.length === 0)
    hasMoreItems.value = false

  if (page > 1)
    items.value.push(...words.value)
  else
    items.value = words.value

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
  <section class="my-6 md:my-10">
    <div v-if="count === 0" class="md:text-2xl sm:text-lg">
      No results found.
    </div>
    <AutoLoadGrid :key="currentSearch" :has-more-items="hasMoreItems" :items="items" :fetch="fetch" :count="count" />
  </section>
</template>
