<script setup lang="ts">
import type { JapaneseWord } from '~/types'

defineProps<{
  item: JapaneseWord
}>()
</script>

<template>
  <article class="flex items-start border border-neutral-6 rounded-xl p-8">
    <ruby class="grid grid-cols-[repeat(2,minmax(0,min-content))] w-100px items-start gap-x-2px whitespace-normal break-anywhere text-5xl line-height-[1]">
      {{ item.japanese[0].word ?? item.slug }}<rt v-if="item.japanese[0].reading !== (item.japanese[0].word ?? item.slug)" class="line-height-[1]">{{ item.japanese[0].reading }}</rt>
    </ruby>
    <div>
      <div class="mb-6 text-neutral-5">
        <h2>
          Meanings
        </h2>
        <p>
          {{ item.senses[0].parts_of_speech.join(', ') }}
        </p>
        <p>
          {{ item.senses[0].tags.join(', ') }}
        </p>
      </div>
      <div v-for="(sense, idx) in item.senses" :key="idx">
        <div class="flex gap-1">
          <span>{{ idx + 1 }}.</span> <p>{{ sense.english_definitions.join('; ') }}</p>
        </div>
      </div>
    </div>
    <div class="ml-auto flex flex-col gap-1 text-center">
      <p v-if="item.jlpt.length">
        {{ item.jlpt[1] ?? item.jlpt[0] }}
      </p>
      <p v-if="item.is_common">
        common word
      </p>
    </div>
  </article>

  <!-- IDK

  <div v-for="thing in item">
    {{ thing }}
  </div> -->
</template>

<style lang="scss" scoped>

</style>
