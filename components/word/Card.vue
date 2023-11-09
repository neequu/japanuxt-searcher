<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  item: JapaneseWord
}>()
const mainWord = props.item.japanese[0].word ?? props.item.slug
const partsOfSpeech = props.item.senses[0].parts_of_speech
const tags = props.item.senses[0].tags
const jlpt = props.item.jlpt[props.item.jlpt.length - 1]

const added = ref(false)
const bookmarkClass = ref('i-tdesign:bookmark-add')
function changeAdded() {
  if (added.value) {
    bookmarkClass.value = 'i-tdesign:bookmark-add'
    added.value = false
  }
  else {
    bookmarkClass.value = 'i-tdesign:bookmark-checked'
    setTimeout(() => {
      bookmarkClass.value = 'i-tdesign:bookmark-minus'
    }, 440)
    added.value = true
  }
}
</script>

<template>
  <article class="flex border border-neutral-6 rounded-xl px-8 py-6 text-xl">
    <ruby class="grid grid-cols-[repeat(2,minmax(0,min-content))] w-25 items-start gap-x-1 whitespace-normal break-anywhere text-5xl line-height-[1]">
      {{ mainWord }}
      <rt v-if="item.japanese[0].reading !== (item.japanese[0].word ?? item.slug)" class="line-height-[1]">{{ item.japanese[0].reading }}</rt>
    </ruby>
    <div class="pb-8">
      <div class="mb-3 text-base text-neutral-5">
        <h2>
          Meanings
        </h2>
        <p class="text-xl font-600">
          {{ partsOfSpeech.join(', ') }}
          <span v-if="tags.length" class="text-base font-400 italic">
            {{ tags.join(', ') }}
          </span>
        </p>
      </div>
      <div v-for="(sense, idx) in item.senses" :key="idx" class="flex gap-4">
        <div class="flex gap-1">
          <p>{{ idx + 1 }}.</p> <p>{{ sense.english_definitions.join('; ') }}</p>
        </div>
        <p class="italic text-neutral-5">
          {{ sense.tags.join('') }}
        </p>
      </div>
    </div>
    <div class="ml-auto flex flex-col justify-between">
      <div class="flex flex-col gap-2 text-center text-base line-height-[1] text-white">
        <NuxtLink v-if="item.jlpt.length" :to="`/decks/${jlpt}`" class="border-b border-transparent rounded-sm bg-neutral-8 bg-opacity-40 p-2 outline-none transition focus-visible:border-blueGray hover:bg-opacity-80">
          {{ jlpt }}
        </NuxtLink>
        <p v-if="item.is_common">
          common word
        </p>
      </div>
      <div class="flex flex-col items-center gap-1 text-accent">
        <NuxtLink :to="`/decks/${mainWord}`" class="border-b border-transparent outline-none outline-none transition focus-visible:border-blueGray hover:border-accent!">
          See Examples
        </NuxtLink>
        <!-- todo: add dynamic label and hover -->
        <button aria-label="" type="button" class="border-b border-transparent text-2xl outline-none focus-visible:border-blueGray" @click="changeAdded">
          <div :class="bookmarkClass" />
        </button>
      </div>
    </div>
  </article>
</template>
