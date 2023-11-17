<script setup lang="ts">
import type { Example } from '~/types'

const props = defineProps<{
  word: string
}>()
// const supabase = useSupabaseClient()

async function subscribe() {
  const { url, session } = await $fetch('/api/stripe/subscribe')

  navigateTo(url, {
    external: true,
  })
}

const isSubscribed = ref(false)
const results = ref<Example>()
async function getData() {
  const { data }: { data: any } = useFetch(`https://api.immersionkit.com/look_up_dictionary?keyword=${props.word}`)
  results.value = data.value?.data[0]
}
const audioUrl = ref('')
const audio = computed(() => new Audio(audioUrl.value))

function playAudio(url: string) {
  audioUrl.value = url
  audio.value.play()
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
  <div v-else>
    <pre v-if="results">
      {{ results }}
      <p v-for="(k, cat) in results.category_count" :key="cat">
        {{ cat }}
        {{ k }}
        </p>
        <div v-for="(example, idx) in results.examples" :key="idx">
          {{ example.category }}
          {{ example.deck_name }}
          <NuxtImg v-if="example.image_url" format="webp" :src="example.image_url" />
          <!-- <p>{{ example.sentence }}</p> -->
          <p>{{ example.word_list.join('') }}</p>
          <p>{{ example.translation }}</p>
          <button @click="playAudio(example.sound_url)">
            <div class="i-tdesign:play-circle-filled" />
          </button>
        </div>
    </pre>

    <div v-else class="i-tdesign:loading animate-spin text-7xl" />
  </div>
</template>

<style lang="scss" scoped>

</style>
