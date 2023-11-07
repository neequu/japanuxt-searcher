<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const route = useRoute()
const router = useRouter()
const query = ref((route.query.q || '').toString())
const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

function search() {
  router.replace({ query: { q: query.value } })
  count.value = undefined
  items.value = []

  fetch()
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
    <form @submit.prevent="search">
      <input id="search" v-model="query" type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:font-300 placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
    </form>
  </section>
  <!-- <p class="mb-5 flex justify-end text-neutral-5">
    {{ count }} results on this page
  </p> -->
  <div v-if="count === 0">
    no results
  </div>
  <section v-else class="mt-10 flex flex-1 flex-col">
    <AutoLoadGrid :items="items" :fetch="fetch" :count="count" />
  </section>
</template>
