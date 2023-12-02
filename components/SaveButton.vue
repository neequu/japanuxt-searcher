<script setup lang="ts">
import type { Database } from '~/supabase'

const props = defineProps<{
  savedWord: Database['public']['Tables']['user_words']['Row'] | undefined
  word: string
}>()
const isAdded = ref(!!props.savedWord)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

async function updateWordState() {
  const res: any = isAdded.value
    // @ts-expect-error isAdded covers this
    ? await deleteWord(props.word, props.savedWord.id)
    : await saveWord(props.word)

  return res
}

// Display messages
function handleError(errorMsg: string) {
  activeClass.value = isAdded.value
    ? `i-tdesign:bookmark-minus`
    : `i-tdesign:bookmark-add`
    // todo: add toast
}
function showToast() {
  // todo: add toast
  // isAdded.value ?  :
}

// Handle cache
async function clearCache() {
  // clear cache if used is not on the learn page
  if (useRoute().name !== 'learn')
    clearNuxtData(['userWords'])
  // revalidate cache of user words
  await refreshNuxtData(['userWords'])
  clearNuxtData([props.word])
}

async function changeWordState() {
  const res = await updateWordState()

  if (res.error)
    return handleError(res.error)
  showToast()
  isAdded.value = !isAdded.value
  await clearCache()
}

async function addWord() {
  // change class so user can remove word
  if (isAdded.value)
    activeClass.value = `i-tdesign:bookmark-add`
  // or to add word
  else
    activeClass.value = `i-tdesign:bookmark-checked`

  changeWordState()
}
</script>

<template>
  <button @click="() => showSuccessMessage(word)">
    click
  </button>
  <button aria-label="save word" type="button" class="border-b border-transparent text-xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray md:text-2xl" @click="addWord">
    <div :class="activeClass" />
  </button>
</template>
