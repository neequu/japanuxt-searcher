<script setup lang="ts">
const { data: userWords } = await useFetch('/api/supabase/user-words') || []
const learningWordsLength = userWords.value?.filter(w => w.learning).length || 0
const wordsLength = userWords.value?.length || 0

function updateLevel(lvl: number, word: string) {
  $fetch('/api/supabase/user-words/change-level', {
    method: 'post',
    body: { lvl, word },
  })
}
</script>

<template>
  <section class="mt-8">
    <h1 class="mb-4 text-3xl">
      Your Learning Progress
    </h1>
    <div class="mb-4 text-xl">
      <p class="">
        Words {{ wordsLength }}
      </p>
      <p class="">
        Learning {{ learningWordsLength }}
      </p>
      <p class="">
        You know {{ wordsLength - learningWordsLength }}
      </p>
    </div>
    <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/review">
      <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
        Review Words
      </span>
    </NuxtLink>
  </section>

  <section class="mt-8">
    <h1 class="text-3xl">
      Saved Words
    </h1>
    <template v-if="userWords?.length">
      <div v-for="w in userWords" :key="w.word" class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3">
        <NuxtLink :to="`/words/${w.word}`" class="self-center text-2xl sm:text-3xl">
          {{ w.word }}
        </NuxtLink>
        <div class="flex flex-col items-end gap-5">
          <p v-if="w.strength === 0" class="text-accent">
            New
          </p>
          <p v-else class="text-green">
            Learning
          </p>
          <SaveButton :word="w.word" :saved-word="w" />
          <!-- <div class="grid">
            <button class="text-#0f9" @click="updateLevel(1, w.word)">
              know
            </button>
            <button class="text-#f44" @click="updateLevel(0, w.word)">
              don't know
            </button>
            <button class="text-#0a0" @click="updateLevel(2, w.word)">
              never forget
            </button>
          </div> -->
        </div>
      </div>
    </template>
  </section>
</template>
