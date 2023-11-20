<script setup lang="ts">
import type { Example } from '~/types'

const props = defineProps<{
  word: string
}>()
// const supabase = useSupabaseClient()

async function subscribe() {
  const { url } = await $fetch('/api/stripe/subscribe')

  navigateTo(url, {
    external: true,
  })
}
const STEP = 10
const isSubscribed = ref(true)
const currentStep = ref(STEP)

const hasMoreItems = ref(true)

const results = ref<Example>()
const visibleExamples = ref<Example['examples']>([])
async function getData() {
  const { data }: { data: any } = await useFetch(`https://api.immersionkit.com/look_up_dictionary?keyword=${props.word}`)
  results.value = data.value?.data[0]
  visibleExamples.value = data.value?.data[0].examples.slice(0, currentStep.value)
}

const audioUrl = ref('')
const audio = computed(() => new Audio(audioUrl.value))
function playAudio(url: string) { audioUrl.value = url; audio.value.play() }

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
</script>

<template>
  <button @click="() => { getData();isSubscribed = true }">
    subscribe
  </button>
  <div v-if="!isSubscribed" class="relative overflow-hidden rounded">
    <NuxtImg width="600" format="webp" src="/examples-preview.jpg" />
    <NuxtImg width="600" format="webp" src="/examples-preview2.jpg" />
    <div class="absolute inset-0 bg-dark bg-opacity-50 backdrop-blur-4">
      <div class="grid mx-auto h-full place-content-center text-center text-lg md:text-xl">
        <div class="i-tdesign:lock-on mx-auto" />
        <!-- todo: add stripe link -->
        <button class="" @click="subscribe">
          Pay to see examples
        </button>
      </div>
    </div>
  </div>
  <template v-else>
    <div v-if="results">
      <div class="flex flex-col flex-wrap items-center justify-center border border-neutral-6 rounded-xl p-2 sm:flex-row sm:p-5">
        <button :class="{ 'text-accent': activeTab === 'All' }" class="flex items-center gap-1 border-b border-transparent px-3 py-2 outline-none transition focus-visible:border-blueGray md:px-6 md:py-3 md:text-2xl sm:text-lg hover:border-blueGray!" @click="activeTab = 'All'">
          <p>All</p>
          <span>({{ Object.values(results.category_count).reduce((a, b) => a + b, 0) }})</span>
        </button>
        <button v-for="(k, cat) in results.category_count" :key="cat" @click="activeTab = cat">
          <div v-if="k > 0" :class="{ 'text-accent': activeTab === cat }" class="flex items-center gap-1 border-b border-transparent px-3 py-2 outline-none transition focus-visible:border-blueGray md:px-6 md:py-3 md:text-2xl sm:text-lg hover:border-blueGray!">
            <p class="capitalize">
              {{ cat }}
            </p>
            <span>({{ k }})</span>
          </div>
        </button>
      </div>
      <div class="mt-4 flex items-center justify-end">
        <label
          class="relative flex cursor-pointer items-center rounded-full p-3"
          for="blur"
          data-ripple-dark="true"
        >
          <input
            id="blur"
            v-model="blurredTranslations"
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none border border-blue-gray-200 rounded-md transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 checked:border-accent before:rounded-full before:bg-blue-gray-500 checked:bg-accent before:opacity-0 before:transition-opacity before:-translate-x-2/4 before:-translate-y-2/4 checked:before:bg-accent hover:before:opacity-10"
          >
          <div class="pointer-events-none absolute left-2/4 top-2/4 text-white opacity-0 transition-opacity -translate-x-2/4 -translate-y-2/4 peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </label>
        <label
          class="mt-px cursor-pointer select-none font-light"
          for="blur"
        >
          Blurred translations
        </label>
      </div>
      <article v-for="(example, idx) in visibleExamples" :key="idx" class="my-4 flex flex-col gap-4 border border-neutral-6 rounded-xl p-5 md:flex-row">
        <NuxtImg v-if="example.image_url" width="320" height="170" class="rounded-md object-cover shadow" format="webp" :src="example.image_url" />
        <div class="flex flex-1 flex-col justify-between justify-between gap-6 sm:flex-row">
          <!-- <p class="text-2xl">{{ example.word_list.join('') }}</p> -->
          <div>
            <p class="mb-2 text-lg sm:text-2xl">
              <button class="translate-y-1/5 transition hover:text-white" @click="playAudio(example.sound_url)">
                <div class="i-tdesign:play-circle-filled" />
              </button>
              {{ example.sentence }}
            </p>
            <p class="text-sm sm:text-base" :class="{ 'blur-sm hover:blur-none transition': blurredTranslations }">
              {{ example.translation }}
            </p>
          </div>
          <p class="text-right text-sm font-italic text-white sm:text-base">
            {{ example.deck_name }}
          </p>
        </div>
      </article>
      <div ref="tailEl" />
    </div>
    <div v-else class="i-tdesign:loading mx-auto animate-spin text-3xl md:text-7xl" />
  </template>
</template>

<style lang="scss" scoped>

</style>
