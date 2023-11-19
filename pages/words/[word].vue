<script setup lang="ts">
const route = useRoute('words-word')
const wordParam = decodeURIComponent(route.params.word)

useHead({
  title: computed(() => `${route.query.q} - japanese meaning · nequjp`),
})

// const [word, { data: savedWord }] = await Promise.all([searchDictionarySingle(wordParam), useFetch(`/api/supabase/user-words/${wordParam}`)])
const [word, { data: savedWord }] = await Promise.all([searchDictionarySingle(wordParam), findWord(wordParam)])

const isAdded = ref(savedWord.value?.learning)
const activeClass = ref(isAdded.value ? `i-tdesign:bookmark-minus` : `i-tdesign:bookmark-add`)

const throttledSave = useDebounceFn(
  async () => await saveWord(wordParam),
  1000,
)

const throttledRemove = useDebounceFn(
  async () => await deleteWord(wordParam),
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

useHead({
  title: `${wordParam} - details and examples · nequjp`,
})

const showExamples = ref(false)
</script>

<template>
  <h1 class="my-4 text-center text-2xl md:my-8.5 md:text-4xl">
    Information for {{ wordParam }}
  </h1>
  <section class="my-6 md:mt-10">
    <WordCardTemplate :item="word" :main-word="wordParam">
      <template #additional>
        <div class="mt-6 md:mt-10">
          <h3 class="text-neutral-5 md:mb-1">
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
        <!-- todo: add toast -->
        <button type="button" class="border-b border-transparent text-xl text-accent outline-none transition hover:scale-105 focus-visible:border-blueGray md:text-3xl" @click="addWord">
          <div :class="activeClass" />
        </button>
      </template>
    </WordCardTemplate>
  </section>
  <button @click="showExamples = !showExamples">
    show examples
  </button>
  <section v-if="showExamples" class="mt-6 md:mt-10">
    <Examples :word="wordParam" />
  </section>
</template>
