<script setup lang="ts">
const { data: userWords } = await getUserWords()
</script>

<template>
  <section class="mt-8">
    <h1 class="mb-4 text-xl md:text-3xl">
      Your stats
    </h1>
    <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/review">
      <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
        Review Words
      </span>
    </NuxtLink>
    {{ userWords }}
  </section>
</template>
