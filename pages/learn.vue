<script setup lang="ts">
const userWords = await $fetch('/api/supabase/user-words') || []
const learningWords = userWords.filter(w => w.learning).length
</script>

<template>
  <section class="mt-5">
    <h1 class="text-4xl">
      Your learning progress
    </h1>
    <p>Words {{ userWords.length }}</p>
    <p>Learning {{ learningWords }}</p>
    <p>You know {{ userWords.length - learningWords }}</p>
  </section>
  <section class="mt-5 md:mt-10">
    <article class="border border-neutral-6 rounded-xl p-3 text-sm sm:p-6 sm:text-base">
      Saved Words
    </article>
    <div v-for="w in userWords" :key="w.word" class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3">
      <NuxtLink :to="`/words/${w.word}`" class="self-center text-3xl">
        {{ w.word }}
      </NuxtLink>
      <!-- {{ w.strength }} -->
      <div class="flex flex-col gap-5">
        <p v-if="w.strength === 0" class="text-accent">
          New
        </p>
        <p v-else class="text-green">
          Learning
        </p>
        <SaveButton :word="w.word" :saved-word="w" />
      </div>
    </div>
  </section>
</template>
