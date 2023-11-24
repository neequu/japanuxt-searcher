<script setup lang="ts">
const { data: userWords } = await useFetch('/api/supabase/user-words') || []
const learningWordsLength = userWords.value?.filter(w => w.learning).length || 0
const wordsLength = userWords.value?.length || 0

// function updateLevel(lvl: number, word: string) {
//   $fetch('/api/supabase/user-words/change-level', {
//     method: 'post',
//     body: { lvl, word },
//   })
// }
</script>

<template>
  <section class="mt-5">
    <h1 class="text-2xl sm:text-4xl">
      Your learning progress
    </h1>
    <p>Words {{ wordsLength }}</p>
    <p>Learning {{ learningWordsLength }}</p>
    <p>You know {{ wordsLength - learningWordsLength }}</p>
  </section>

  <section class="mt-5">
    <article class="border border-neutral-6 rounded-xl p-3 text-sm sm:p-6 sm:text-base">
      Saved Words
    </article>
    <template v-if="userWords?.length">
      <div v-for="w in userWords" :key="w.word" class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3">
        <NuxtLink :to="`/words/${w.word}`" class="self-center text-2xl sm:text-3xl">
          {{ w.word }}
        </NuxtLink>
        <!-- {{ w.strength }} -->
        <div class="flex flex-col items-end gap-5">
          <p v-if="w.strength === 0" class="text-accent">
            New
          </p>
          <p v-else class="text-green">
            Learning
          </p>
          <SaveButton :word="w.word" :saved-word="w" />
          <!-- <div class="grid">
            <button class="text-green" @click="updateLevel(1, w.word)">
              know
            </button>
            <button class="text-red" @click="updateLevel(0, w.word)">
              don't know
            </button>
          </div> -->
        </div>
      </div>
    </template>
  </section>
</template>
