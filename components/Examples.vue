<script setup lang="ts">
import type { Example } from '~/types'

const props = defineProps<{
  word: string
}>()
const user = useSupabaseUser()

const STEP = 10
const currentStep = ref(STEP)
const isLoading = ref(false)

const hasMoreItems = ref(true)

const results = ref<Example>()
const visibleExamples = ref<Example['examples']>([])
async function getData() {
  isLoading.value = true
  try {
    const { data }: { data: Ref<{ data: Example[] }> } = await useFetch(`https://api.immersionkit.com/look_up_dictionary?keywod=${props.word}`, {
      getCachedData(key) {
        return useNuxtApp().payload.data[key] || useNuxtApp().static.data[key]
      },
    })
    results.value = data.value?.data[0]
    visibleExamples.value = data.value?.data[0].examples.slice(0, currentStep.value)
  }
  catch (e) {
    showErrorMessage(`Error fetching examples!`)
  }
  finally {
    isLoading.value = false
  }
}

const audioUrl = ref('')
const audio = computed(() => new Audio(audioUrl.value))
function playAudio(url: string) {
  audio.value.pause()
  audioUrl.value = url
  audio.value.play()
}

const activeTab = ref('All')

const filteredExamples = computed(() => {
  if (!results.value)
    return
  if (activeTab.value === 'All')
    return results.value.examples

  const filteredResultExamples = results.value.examples.filter(({ category }) => category === activeTab.value)
  return filteredResultExamples
})
watch(filteredExamples, () => {
  if (!filteredExamples.value)
    return
  currentStep.value = STEP
  visibleExamples.value = filteredExamples.value.slice(0, currentStep.value)
  hasMoreItems.value = true
})

const blurredTranslations = ref(true)
const tailEl = ref<HTMLDivElement>()
if (process.client) {
  useIntervalFn(() => {
    if (!tailEl.value)
      return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 700)
      loadMore()
  }, 500)
}

function loadMore() {
  if (!filteredExamples.value || !hasMoreItems.value)
    return

  const newStep = currentStep.value + STEP
  if (filteredExamples.value.length <= newStep)
    hasMoreItems.value = false

  visibleExamples.value.push(...filteredExamples.value.slice(currentStep.value, newStep))
  currentStep.value = newStep
}

const allResultCount = computed(() => Object.values(results.value?.category_count ?? {}).reduce((a, b) => a + b, 0))

async function checkSubscription() {
  if (!user.value)
    await navigateTo('/sign-in')
  getData()
}
</script>

<template>
  <div v-if="!results && !isLoading" class="flex justify-center">
    <button
      aria-label="subscribe" type="button"
      class="border-b border-transparent text-lg text-accent outline-none transition focus-visible:border-blueGray hover:border-accent!"
      @click="checkSubscription"
    >
      Show Examples
    </button>
  </div>
  <div v-else-if="results && allResultCount > 0">
    <div
      class="flex flex-col flex-wrap items-center justify-center border border-neutral-6 rounded-xl p-2 sm:flex-row sm:p-5"
    >
      <button
        aria-label="all results" type="button" :class="{ 'text-accent': activeTab === 'All' }"
        class="flex items-center gap-1 border-b border-transparent px-3 py-2 outline-none transition focus-visible:border-blueGray md:px-6 md:py-3 md:text-2xl sm:text-lg hover:border-blueGray!"
        @click="activeTab = 'All'"
      >
        <p>All</p>
        <span>({{ allResultCount }})</span>
      </button>
      <button
        v-for="(k, cat) in results.category_count" :key="cat" :aria-label="`$show only ${cat}`" type="button"
        @click="activeTab = cat"
      >
        <div
          v-if="k > 0" :class="{ 'text-accent': activeTab === cat }"
          class="flex items-center gap-1 border-b border-transparent px-3 py-2 outline-none transition focus-visible:border-blueGray md:px-6 md:py-3 md:text-2xl sm:text-lg hover:border-blueGray!"
        >
          <p class="capitalize">
            {{ cat }}
          </p>
          <span>({{ k }})</span>
        </div>
      </button>
    </div>
    <div class="mt-4 flex items-center justify-end">
      <label class="relative flex cursor-pointer items-center rounded-full p-3" for="blur" data-ripple-dark="true">
        <input
          id="blur" v-model="blurredTranslations" type="checkbox"
          class="peer relative h-5 w-5 cursor-pointer appearance-none border border-blue-gray-200 rounded-md transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 checked:border-accent before:rounded-full before:bg-blue-gray-500 checked:bg-accent before:opacity-0 before:transition-opacity before:-translate-x-2/4 before:-translate-y-2/4 checked:before:bg-accent hover:before:opacity-10"
        >
        <div
          class="pointer-events-none absolute left-2/4 top-2/4 text-white opacity-0 transition-opacity -translate-x-2/4 -translate-y-2/4 peer-checked:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
            stroke="currentColor" stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </label>
      <label class="mt-px cursor-pointer select-none font-light" for="blur">
        Blurred translations
      </label>
    </div>
    <article
      v-for="(example, idx) in visibleExamples" :key="idx"
      class="my-4 flex flex-col gap-4 border border-neutral-6 rounded-xl p-5 md:flex-row"
    >
      <NuxtImg
        v-if="example.image_url" width="320" height="170"
        class="self-center rounded-md object-cover shadow md:self-auto" format="webp" :src="example.image_url"
      />
      <div class="flex flex-1 flex-col justify-between justify-between gap-6 lg:flex-row">
        <div class="flex-1">
          <p class="mb-2 text-lg sm:text-2xl">
            <button
              class="mr-1 translate-y-1/4 text-neutral-700 transition dark:text-neutral-3 hover:filter-brightness-140"
              :aria-label="`play audio from ${example.deck_name}`" type="button" @click="playAudio(example.sound_url)"
            >
              <div class="i-tdesign:play-circle-filled" />
            </button>
            <span
              v-for="(example_word, id) in example.word_list" :key="id" class="transition hover:text-accent"
              :class="{ 'font-bold dark:text-cyan text-violet': example.word_index.includes(id) }"
            >
              <NuxtLink :to="`/words/${example_word}`">{{ example_word }}</NuxtLink>
            </span>
          </p>
          <p class="text-sm sm:text-base" :class="{ 'blur-sm hover:blur-none transition': blurredTranslations }">
            {{ example.translation }}
          </p>
        </div>
        <p class="self-center text-right text-sm font-italic sm:text-base dark:text-white">
          {{ example.deck_name }}
        </p>
      </div>
    </article>
    <div ref="tailEl" />
  </div>
  <div v-if="results && allResultCount === 0" class="text-center text-lg">
    No examples found
  </div>
  <div v-if="isLoading" class="i-tdesign:loading mx-auto mt-8 animate-spin text-3xl md:text-4xl" />
</template>
