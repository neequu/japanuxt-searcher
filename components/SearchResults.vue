<script setup lang="ts">
const { query } = defineProps<{
  query: string
}>()

const results = await searchDictionary(query)
// const results = { data: [{ slug: '家', is_common: true, tags: [], jlpt: ['jlpt-n5'], japanese: [{ word: '家', reading: 'いえ' }], senses: [{ english_definitions: ['house', 'residence', 'dwelling'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }, { english_definitions: ['family', 'household'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }, { english_definitions: ['lineage', 'family name'], parts_of_speech: ['Noun'], links: [], tags: [], restrictions: [], see_also: [], antonyms: [], source: [], info: [] }], attribution: { jmdict: true, jmnedict: false, dbpedia: false } }] }
</script>

<template>
  <div class="grid gap-10">
    <WordCard v-for="res in results.data" :key="res.slug" :item="res" />
  </div>
</template>

<style lang="scss" scoped>

</style>
