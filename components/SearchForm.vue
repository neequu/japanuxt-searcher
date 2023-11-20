<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

defineProps<{
  onSubmit: () => void
}>()
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}
const input = ref<HTMLInputElement>()

onKeyDown('/', (e) => {
  e.preventDefault()
  input.value?.focus()
  input.value?.select()
})
const modelValue = defineModel()
</script>

<template>
  <form class="flex" @submit.prevent="onSubmit">
    <input id="search" ref="input" v-model="modelValue" v-focus type="text" name="search" class="w-full border border-neutral-6 rounded-xl bg-transparent p-2 text-#aaa outline-none focus:border-accent md:p-4 md:text-2xl placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
    <button aria-label="search" type="button" class="hidden border border-neutral-6 rounded-xl px-2 text-neutral-5 outline-none transition sm:block focus-visible:border-accent md:px-4 focus-visible:text-white">
      <div class="i-tdesign:search text-2xl md:text-3xl" />
    </button>
  </form>
</template>
