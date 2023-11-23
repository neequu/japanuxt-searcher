<script setup lang="ts">
import type { Database } from '~/supabase'

const props = defineProps<{
  savedWord: Database['public']['Tables']['user_words']['Row']
  word: string
}>()
const isAdded = ref(props.savedWord.learning)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

const throttledSave = useDebounceFn(
  async () => await saveWord(props.word),
  1000,
)

const throttledRemove = useDebounceFn(
  async () => await deleteWord(props.word),
  1000,
)
function addWord() {
  // todo: add toast
  // remove word
  if (isAdded.value) {
    activeClass.value = `i-tdesign:bookmark-add`
  }
  // add word
  else {
    activeClass.value = `i-tdesign:bookmark-checked`
    setTimeout(() => {
      activeClass.value = `i-tdesign:bookmark-minus`
    }, 1500)
  }
  !isAdded.value ? throttledSave() : throttledRemove()
  isAdded.value = !isAdded.value
}
</script>

<template>
  <button aria-label="save word" type="button" class="border-b border-transparent text-xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray md:text-3xl" @click="addWord">
    <div :class="activeClass" />
  </button>
</template>

<style lang="scss" scoped>

</style>
