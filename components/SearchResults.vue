<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const { query } = defineProps<{
  query: string
}>()
const items = ref<JapaneseWord[]>([])
const count = ref<undefined | number>()
async function fetch(page: number) {
  if (!query)
    return
  const { data: results } = await searchDictionary(query, page)
  items.value.push(...results)
  count.value = items.value.length ?? count.value
}
// const results = { data: [{ slug: '家', is_common: true, tags: [], jlpt: ['jlpt-n5'], japanese: [{ word: '家', reading: 'いえ' }], senses: [{ english_definitions: ['house', 'residence', 'dwelling'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }, { english_definitions: ['family', 'household'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }, { english_definitions: ['lineage', 'family name'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }], attribution: { jmdict: true, jmnedict: false, dbpedia: false } }] }
</script>

<template>
  <p v-if="count" class="mb-5 flex justify-end text-neutral-5">
    {{ items.length }} results on this page
  </p>
  <div v-if="items.length" class="grid gap-10">
    <WordCard v-for="res in items" :key="res.slug" :item="res" />
  </div>
</template>

<style lang="scss" scoped>

</style>
