<script setup lang="ts">
const route = useRoute('words-word')
const wordParam = decodeURIComponent(route.params.word)

useHead({
  title: computed(() => `${route.query.q} - japanese meaning · nequjp`),
})

const [{ data: word }, { data: savedWord }] = await Promise.all([searchDictionarySingle(wordParam), findWord(wordParam)])

useHead({
  title: `${wordParam} - details and examples · nequjp`,
})
</script>

<template>
  <h1 class="my-4 text-center text-2xl md:my-8.5 md:text-4xl">
    Information for {{ wordParam }}
  </h1>
  <section v-if="word?.japanese" class="my-6 md:mt-10">
    <WordCardTemplate :item="word" :main-word="wordParam">
      <template v-if="word.tags.length" #additional>
        <div class="mt-6 md:mt-10">
          <h3 class="mb-1 leading-tight text-neutral-5">
            Additional information
          </h3>
          <span>{{ word.tags.join(', ') }}</span>
          <div>
            <p v-for="(value, key) in word.attribution" :key="key">
              <a v-if="value && value.toString().startsWith('http')" class="mt-4 inline-flex border-b border-b-transparent leading-tight text-accent transition hover:border-accent" :href="value.toString()" target="_blank">Learn more on {{ key }}</a>
            </p>
          </div>
        </div>
      </template>
      <template #aside>
        <!-- todo: add toast -->
        <div class="flex flex-col items-end gap-2">
          <div v-if="savedWord">
            <p v-if="savedWord.strength === 0" class="text-accent">
              New
            </p>
            <p v-else-if="savedWord.strength === 1" class="text-accent-lightgreen">
              Learning
            </p>
            <p v-else-if="savedWord.strength === -1" class="text-accent-red">
              Failed
            </p>
            <p v-else class="text-accent-darkgreen">
              Never Forget
            </p>
          </div>
          <SaveButton :saved-word="savedWord" :word="wordParam" />
        </div>
      </template>
    </WordCardTemplate>
  </section>
  <section class="mt-6 md:mt-10">
    <Examples :word="wordParam" />
  </section>
</template>
