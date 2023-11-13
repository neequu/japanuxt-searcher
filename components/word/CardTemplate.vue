<script setup lang="ts">
import type { JapaneseWord } from '~/types'

const props = defineProps<{
  item: JapaneseWord
  mainWord: string
}>()
const jlpt = props.item.jlpt?.[props.item.jlpt?.length - 1] || ''
const { copy, copied } = useClipboard()
</script>

<template>
  <article class="flex gap-4 border border-neutral-6 rounded-xl px-10 py-8 text-xl">
    <ruby class="grid grid-cols-[repeat(2,minmax(0,min-content))] w-25 items-start gap-x-1 whitespace-normal break-anywhere text-5xl line-height-[1]">
      <div class="flex flex-col items-center gap-5">
        {{ mainWord }}
        <button type="button" class="text-2xl outline-none transition hover:scale-105" :title="`Copy ${mainWord} to clipboard`" @click="copy(mainWord)">
          <div :class="[copied ? 'i-tdesign:component-checkbox' : 'i-tdesign:copy']" />
        </button>
      </div>
      <rt v-if="item.japanese[0].reading !== (item.japanese[0].word ?? item.slug)" class="line-height-[1]">{{ item.japanese[0].reading }}</rt>
    </ruby>
    <div class="pb-8">
      <h2 class="mb-2 text-base text-neutral-5">
        Meanings
      </h2>
      <div v-for="(sense, idx) in item.senses" :key="idx" class="">
        <div class="text-xl font-700 text-neutral-5">
          <p v-if="sense.parts_of_speech.join(', ') !== item.senses[idx && idx - 1].parts_of_speech.join(', ') || idx === 0" class="my-1">
            {{ sense.parts_of_speech.join(', ') }}
          </p>
        </div>
        <div>
          <div class="flex gap-1">
            <p>{{ idx + 1 }}.</p>
            <p>{{ sense.english_definitions.join('; ') }} <span class="italic text-neutral-5">{{ sense.tags.join(', ') }}</span></p>
          </div>
        </div>
      </div>
      <slot name="additional" />
    </div>
    <div class="ml-auto flex flex-col items-center justify-between">
      <div class="flex flex-col gap-2 text-center text-base line-height-[1] text-white">
        <NuxtLink v-if="jlpt.length" :to="`/decks/${jlpt}`" class="border-b border-transparent rounded-sm bg-neutral-8 bg-opacity-40 p-2 outline-none transition focus-visible:border-blueGray hover:bg-opacity-80">
          {{ jlpt }}
        </NuxtLink>
        <p v-if="item.is_common">
          common word
        </p>
      </div>
      <slot name="aside" />
    </div>
  </article>
</template>

<style lang="scss" scoped>

</style>
