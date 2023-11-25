<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const route = useRoute('decks-deck')

const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
const hasMoreItems = ref(true)

async function fetch(page: number) {
  if (!hasMoreItems.value)
    return
  const data = await searchDictionary(route.params.deck)

  if (data.length === 0)
    hasMoreItems.value = false

  if (page > 1)
    items.value.push(...data)
  else
    items.value = data

  count.value = items.value.length
}

useHead({
  title: `${route.params.deck} - JLPT Deck · nequjp`,
})
</script>

<template>
  <div>
    <AutoLoadGrid :fetch="fetch" :items="items" :count="count" :has-more-items="hasMoreItems" />
  </div>
</template>

<style lang="scss" scoped>

</style>
