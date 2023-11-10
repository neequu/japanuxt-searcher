<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  item: JapaneseWord
}>()
const mainWord = computed(() => props.item.japanese[0].word ?? props.item.slug)
</script>

<template>
  <WordCardTemplate :item="item" :main-word="mainWord">
    <template #aside>
      <NuxtLink :to="`/words/${mainWord}`" class="border-b border-transparent text-center text-accent outline-none outline-none transition focus-visible:border-blueGray hover:border-accent!">
        See More
      </NuxtLink>
    </template>
  </WordCardTemplate>
</template>
