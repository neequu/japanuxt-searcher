<script setup lang="ts">
import type { Database } from '~/supabase'

const props = defineProps<{
  savedWord: Database['public']['Tables']['user_words']['Row'] | undefined
  word: string
}>()
const isAdded = ref(!!props.savedWord)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

async function changeWordState() {
  // ts-ignore isAdded covers this
  const res: any = isAdded.value ? await deleteWord(props.word, props.savedWord.id) : await saveWord(props.word)

  if (res.error) {
    activeClass.value = isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`
    return
  }
  // todo: add toast
  isAdded.value = !isAdded.value
  // clear cache if used is not on the learn page
  if (useRoute().name !== 'learn')
    clearNuxtData(['userWords'])
    // revalidate cache
  await refreshNuxtData(['userWords', 'word'])
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
  changeWordState()
}
</script>

<template>
  <button aria-label="save word" type="button" class="border-b border-transparent text-xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray md:text-2xl" @click="addWord">
    <div :class="activeClass" />
  </button>
</template>
