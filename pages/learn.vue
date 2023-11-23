<script setup lang="ts">
const userWords = await $fetch('/api/supabase/user-words') || []
const learningWords = userWords.filter(w => w.learning).length
</script>

<template>
  <section class="mt-5 md:mt-10">
    <p>Words {{ userWords.length }}</p>
    <p>Learning {{ learningWords }}</p>
    <p>You know {{ userWords.length - learningWords }}</p>
  </section>
  <section class="grid mt-5 gap-5 md:mt-10">
    <article class="border border-neutral-6 rounded-xl p-3 text-sm sm:p-6 sm:text-base">
      Saved Words
    </article>
    <div v-for="w in userWords" :key="w.word">
      {{ w.word }}
      {{ w.strength }}
      <p v-if="w.strength === 0" class="text-accent">
        New
      </p>
      <p v-else class="text-green">
        Learning
      </p>
    </div>
  </section>
</template>
