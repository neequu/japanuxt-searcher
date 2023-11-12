<script setup lang="ts">
const route = useRoute('words-word')
const wordParam = route.params.word

const [savedWord, word] = await Promise.all([findWord(wordParam), searchDictionarySingle(wordParam)])

const isAdded = ref(savedWord?.learning)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

const remove = () => isAdded.value = false

const throttledSave = useDebounceFn(
  async () => await saveWord(wordParam),
  1000,
)

const throttledRemove = useDebounceFn(
  remove,
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
  {{ savedWord }}
  <h1 class="my-8.5 text-center text-4xl">
    Information for {{ wordParam }}
  </h1>
  <section class="mt-10">
    <!-- todo: add dynamic label and hover -->
    <WordCardTemplate :item="word" :main-word="wordParam">
      <template #additional>
        <div class="mt-10">
          <h3 class="mb-1 text-neutral-5">
            Additional information
          </h3>
          <span class="">{{ word.tags.join(', ') }}</span>
          <div>
            <p v-for="(value, key) in word.attribution" :key="key">
              <template v-if="value && value.toString().startsWith('http')">
                <a class="border-b border-b-transparent text-accent transition hover:border-accent" :href="value.toString()" target="_blank">Learn more on {{ key }}</a>
              </template>
            </p>
          </div>
        </div>
      </template>
      <template #aside>
        <button type="button" class="border-b border-transparent text-3xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray" @click="addWord">
          <div :class="activeClass" />
        </button>
      </template>
    </WordCardTemplate>
  </section>
  <section class="mt-10">
    <Examples />
  </section>
</template>