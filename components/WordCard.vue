<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  item: JapaneseWord
}>()

const partsOfSpeech = props.item.senses[0].parts_of_speech
const tags = props.item.senses[0].tags
// const jlpt = props.item?.jlpt.map(t => t.split('-').join(' '))
</script>

<template>
  <article class="flex items-start border border-neutral-6 rounded-xl px-10 py-6">
    <ruby class="grid grid-cols-[repeat(2,minmax(0,min-content))] w-100px items-start gap-x-2px whitespace-normal break-anywhere text-5xl line-height-[1]">
      {{ item.japanese[0].word ?? item.slug }}<rt v-if="item.japanese[0].reading !== (item.japanese[0].word ?? item.slug)" class="line-height-[1]">{{ item.japanese[0].reading }}</rt>
    </ruby>
    <div>
      <div class="mb-3 text-neutral-5">
        <h2>
          Meanings
        </h2>
        <p>
          {{ partsOfSpeech.join(', ') }}
          <span v-if="tags.length">
            {{ tags.join(', ') }}
          </span>
        </p>
      </div>
      <div v-for="(sense, idx) in item.senses" :key="idx">
        <div class="flex gap-1">
          <span>{{ idx + 1 }}.</span> <p>{{ sense.english_definitions.join('; ') }}</p>
        </div>
      </div>
    </div>
    <div class="ml-auto flex flex-col gap-2 text-center line-height-[1] text-white">
      <p v-if="item.jlpt.length" class="rounded-sm bg-accent bg-opacity-80 py-1 shadow">
        <NuxtLink to="/search">
          {{ item.jlpt[item.jlpt.length - 1] }}
        </NuxtLink>
      </p>
      <p v-if="item.is_common" class="">
        common word
      </p>
    </div>
  </article>
</template>
