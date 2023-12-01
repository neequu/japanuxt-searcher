<script setup lang="ts">
import type { Database } from '~/supabase'

const props = defineProps<{
  savedWord: Database['public']['Tables']['user_words']['Row'] | undefined
  word: string
}>()
const isAdded = ref(props.savedWord?.learning)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

async function changeWordState() {

}

async function addWord() {
  // change class so user can remove word
  if (isAdded.value) {
    activeClass.value = `i-tdesign:bookmark-add`
  }
  // or to add word
  else {
    activeClass.value = `i-tdesign:bookmark-checked`
    setTimeout(() => {
      activeClass.value = `i-tdesign:bookmark-minus`
    }, 1500)
  }
  // delete or save word
  if (isAdded.value) {
    const res = await deleteWord(props.word, props.savedWord.id)
    // todo: add toast
    if (res.error) {
      activeClass.value = `i-tdesign:bookmark-minus`
      return
    }
    isAdded.value = !isAdded.value
    // clear cache if used is not on the learn page
    if (useRoute().name !== 'learn')
      clearNuxtData(['userWords'])
    // revalidate cache
    await refreshNuxtData(['userWords', 'word'])
  }
  else {
    const res = await saveWord(props.word)
    // todo: add toast
    if (res.error) {
      activeClass.value = `i-tdesign:bookmark-add`
      return
    }
    isAdded.value = !isAdded.value
    // clear cache if used is not on the learn page
    if (useRoute().name !== 'learn')
      clearNuxtData(['userWords'])
    // revalidate cache
    await refreshNuxtData(['userWords', 'word'])
  }
}
</script>

<template>
  <button aria-label="save word" type="button" class="border-b border-transparent text-xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray md:text-2xl" @click="addWord">
    <div :class="activeClass" />
  </button>
</template>
