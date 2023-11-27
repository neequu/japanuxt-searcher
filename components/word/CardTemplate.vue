<script setup lang="ts">
import type { JapaneseWord } from '~/types'

defineProps<{
  item: JapaneseWord
  mainWord: string
}>()
const { copy, copied } = useClipboard()
</script>

<template>
  <article class="grid grid-cols-[min-content_1fr] border border-neutral-6 rounded-xl px-5 py-4 sm:flex sm:flex-row md:px-10 sm:px-5 sm:py-8 sm:text-xl">
    <ruby class="grid grid-cols-[repeat(2,minmax(0,min-content))] w-12 items-start gap-x-1 whitespace-normal break-anywhere text-3xl leading-none sm:w-40 md:text-5xl sm:text-4xl">
      <div class="flex flex-col items-center gap-2 sm:gap-5">
        {{ mainWord }}
        <button aria-label="copy text" type="button" class="text-lg outline-none transition hover:scale-105 sm:text-2xl" :title="`Copy ${mainWord} to clipboard`" @click="copy(mainWord)">
          <div :class="[copied ? 'i-tdesign:component-checkbox' : 'i-tdesign:copy']" />
        </button>
      </div>
      <rt v-if="item.japanese?.[0].reading !== (item.japanese?.[0].word ?? item.slug)" class="leading-none">{{ item.japanese?.[0].reading }}</rt>
    </ruby>
    <div class="pb-8 pl-4 md:pl-0">
      <h2 class="text-base text-neutral-5 sm:mb-2">
        Meanings
      </h2>
      <div v-for="(sense, idx) in item.senses" :key="idx">
        <div class="font-700 text-neutral-5 sm:text-xl">
          <p v-if="sense.parts_of_speech?.join(', ') !== item.senses[idx && idx - 1].parts_of_speech?.join(', ') || idx === 0" class="my-1">
            {{ sense.parts_of_speech?.join(', ') }}
          </p>
        </div>
        <div>
          <div class="flex gap-1">
            <p>{{ idx + 1 }}.</p>
            <p>{{ sense.english_definitions?.join('; ') }} <span class="italic text-neutral-5">{{ sense.tags?.join(', ') }}</span></p>
          </div>
        </div>
      </div>
      <slot name="additional" />
    </div>
    <div class="col-span-2 ml-auto flex flex-col justify-between sm:items-center">
      <div class="hidden text-base leading-none text-white sm:flex sm:flex-col sm:items-center sm:items-stretch sm:gap-2 sm:text-center">
        <p v-if="item.is_common">
          common word
        </p>
        <template v-if="item.jlpt?.length">
          <NuxtLink v-for="jlpt in item.jlpt" :key="jlpt" :to="`/decks/${jlpt}`" class="border-b border-transparent rounded-sm bg-neutral-8 bg-opacity-40 p-2 outline-none transition focus-visible:border-blueGray hover:bg-opacity-80">
            <span>{{ jlpt }}</span>
          </NuxtLink>
        </template>
      </div>
      <slot name="aside" />
    </div>
  </article>
</template>

<style lang="scss" scoped>

</style>
