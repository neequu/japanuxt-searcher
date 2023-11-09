<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

defineProps<{
  onSubmit: () => void
}>()
// const vFocus = {
//   mounted: (el: HTMLElement) => el.focus(),
// }
const input = ref<HTMLInputElement>()

onKeyDown('/', (e) => {
  e.preventDefault()
  input.value?.focus()
})
const modelValue = defineModel()
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input id="search" ref="input" v-model="modelValue" vFocus type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
  </form>
</template>

<style lang="scss" scoped>

</style>
