<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const route = useRoute('decks-deck')
const { deck } = route.params
const formatedDeckName = deck.toUpperCase().split('-').join(' ')

const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

async function fetch(page: number) {
  if (!deck.startsWith('jlpt')) {
    count.value = 0
    return
  }
  if (!hasMoreItems.value)
    return
  const { data: words } = await searchDictionary(deck)

  if (words.value.length === 0)
    hasMoreItems.value = false

  if (page > 1)
    items.value.push(...words.value)
  else
    items.value = words.value

  count.value = items.value.length
}

useHead({
  title: computed(() => `${formatedDeckName} - JLPT Deck · nequjp`),
})
</script>

<template>
  <section class="mt-8">
    <div v-if="count === 0" class="md:text-2xl sm:text-lg">
      Deck was not found!
    </div>
    <div v-else>
      <h1 class="mb-4 text-xl md:text-3xl">
        Showing {{ formatedDeckName }} deck
      </h1>
      <AutoLoadGrid :fetch="fetch" :items="items" :count="count" :has-more-items="hasMoreItems" />
    </div>
  </section>
</template>
