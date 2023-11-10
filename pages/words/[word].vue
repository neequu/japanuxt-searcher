<script setup lang="ts">
// const added = ref(false)
const bookmarkClass = ref('i-tdesign:bookmark-add')
const route = useRoute()
const { word: wordParam } = route.params

const data = await searchDictionary(wordParam)
const word = data[0]
function addWord() {
  saveWord(wordParam)
  // if (added.value) {
  //   bookmarkClass.value = 'i-tdesign:bookmark-add'
  //   added.value = false
  // }
  // else {
  //   bookmarkClass.value = 'i-tdesign:bookmark-checked'
  //   setTimeout(() => {
  //     bookmarkClass.value = 'i-tdesign:bookmark-minus'
  //   }, 440)
  //   added.value = true
  // }
}
</script>

<template>
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
                <a class="text-accent underline underline-dotted" :href="value.toString()" target="_blank">Learn more on {{ key }}</a>
              </template>
            </p>
          </div>
        </div>
      </template>
      <template #aside>
        <button type="button" class="border-b border-transparent text-3xl text-accent outline-none focus-visible:border-blueGray" @click="addWord">
          <div :class="bookmarkClass" />
        </button>
      </template>
    </WordCardTemplate>
  </section>
  <section class="mt-10">
    <Examples />
  </section>
</template>
