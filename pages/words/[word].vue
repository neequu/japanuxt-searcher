<script setup lang="ts">
const route = useRoute('words-word')
const wordParam = decodeURIComponent(route.params.word)

const [{ data: word }, { data: savedWord }] = await Promise.all([searchDictionarySingle(wordParam), findWord(wordParam)])

useHead({
  title: `${wordParam} - details and examples`,
})
</script>

<template>
  <h1 class="my-4 text-center text-xl md:my-8.5 md:text-4xl">
    Information for {{ wordParam }}
  </h1>
  <template v-if="word?.japanese">
    <section class="my-6 md:mt-10">
      <WordCardTemplate :item="word" :main-word="wordParam">
        <template #additional>
          <div v-if="word.tags.length" class="mt-6 md:mt-10">
            <h3 class="mb-1 font-bold leading-tight text-neutral-5 sm:mb-2">
              Additional information
            </h3>
            <span>{{ word.tags.join(', ') }}</span>
            <div>
              <p v-for="(value, key) in word.attribution" :key="key">
                <a v-if="value && value.toString().startsWith('http')" class="mt-4 inline-flex border-b border-b-transparent leading-tight text-accent transition hover:border-accent" :href="value.toString()" target="_blank">Learn more on {{ key }}</a>
              </p>
            </div>
          </div>
          <div v-if="savedWord?.last_reviewed">
            <p class="mb-1 mt-6 font-bold leading-tight text-neutral-5 sm:mb-2">
              Reviews
            </p>
            <div class="flex flex-col gap-1">
              <p>Last review: {{ getFormattedDate(savedWord.last_reviewed) }}</p>
              <p v-if="savedWord.next_review_date" class="text-accent">
                Next review: {{ getFormattedDate(savedWord.next_review_date) }}
              </p>
            </div>
          </div>
        </template>
        <template #aside>
          <div class="flex flex-col items-center gap-2">
            <div v-if="savedWord?.id" class="flex flex-col items-center text-center">
              <p v-if="savedWord.strength === 0" class="text-accent">
                New
              </p>
              <p v-else-if="savedWord.strength === 2" class="text-accent-lightgreen">
                Learning
              </p>
              <p v-else-if="savedWord.strength === 1" class="text-accent-red">
                Failed
              </p>
              <p v-else class="text-accent-darkgreen">
                Never&nbsp;Forget
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
  <div v-else class="mt-10 text-center md:text-xl">
    No information found :( Please search for something else.
    <button aria-label="return" class="border-b border-transparent text-accent outline-none transition focus-visible:border-blueGray hover:border-blueGray" type="button" @click="$router.back">
      Go Back
    </button>
  </div>
</template>
