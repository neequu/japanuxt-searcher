<script setup lang="ts">
import type { JapaneseWord } from '~/types'

defineProps<{
  item: JapaneseWord
}>()
</script>

<template>
  <div class="flex">
    <div>
      <ruby class="cursor-default text-5xl write-vertical-left">
        {{ item.slug }}<rt>{{ item.japanese[0].reading }}</rt>
      </ruby>
      <p v-if="item.jlpt.length">
        {{ item.jlpt[0] }}
        <span v-if="item.is_common">Common word</span>
      </p>
    </div>
    <div>
      <h2>Meanings</h2>
      <div v-for="part in item.senses[0].parts_of_speech" :key="part">
        {{ part }}
      </div>
      <div v-for="tag in item.tags" :key="tag">
        {{ tag }}
      </div>
      <div v-for="(sense, idx) in item.senses" :key="idx">
        <div class="flex gap-1">
          <span>{{ idx + 1 }}.</span> <p>{{ sense.english_definitions.join('; ') }}</p>
        </div>
        <div v-for="tag in sense.tags" :key="tag">
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
