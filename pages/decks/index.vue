<script setup lang="ts">
useHead({
  title: `JLPT Decks`,
})
</script>

<template>
  <h1 class="mt-8 text-xl md:text-3xl">
    JLPT Word Decks
  </h1>
  <NuxtLink to="decks/jlpt-n5" class="md:text-2xl">
    <span class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3 md:p-6">
      JLPT N5 Words
    </span>
  </NuxtLink>
  <NuxtLink to="decks/jlpt-n4" class="md:text-2xl">
    <span class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3 md:p-6">
      JLPT N4 Words
    </span>
  </NuxtLink>
  <NuxtLink to="decks/jlpt-n3" class="md:text-2xl">
    <span class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3 md:p-6">
      JLPT N3 Words
    </span>
  </NuxtLink>
  <NuxtLink to="decks/jlpt-n2" class="md:text-2xl">
    <span class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3 md:p-6">
      JLPT N2 Words
    </span>
  </NuxtLink>
  <NuxtLink to="decks/jlpt-n1" class="md:text-2xl">
    <span class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3 md:p-6">
      JLPT N1 Words
    </span>
  </NuxtLink>
</template>
