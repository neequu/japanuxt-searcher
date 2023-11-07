<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const route = useRoute()
const query = ref((route.query.q || '').toString())
const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

async function fetch(page: number) {
  if (!hasMoreItems.value)
    return

  // if (page === 1)
  // items.value = []

  const data = await searchDictionary(query.value, page)
  if (data.length === 0)
    hasMoreItems.value = false

  items.value.push(...data)

  count.value = items.value.length
}

// watch(
//   () => route.query.q,
//   () => {
//     items.value = []
//     query.value = (route.query.q || '').toString()
//     fetch(1)
//   },
// )
</script>

<template>
  <section class="mt-2">
    <form @submit.prevent="">
      <input id="search" v-model="query" type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:font-300 placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
    </form>
  </section>
  <section class="mt-10 flex flex-1 flex-col">
    <SearchResults v-if="query" :items="items" :fetch="fetch" :count="count" />
    <p v-else>
      Please enter something
    </p>
  </section>
</template>
