<script setup lang="ts">
import { useReviewStore } from '@/stores/review'

const reviews = useReviewStore()

if (reviews.reviewWords?.length === 0)
  await navigateTo('/review')

const reviewLength = reviews.reviewWords.length
reviews.setActiveIndex(0)
reviews.setReviewWords([])
</script>

<template>
  <section class="mt-8 h-full flex flex-1 flex-col place-content-center items-center md:gap-10">
    <h1 class="mb-4 text-center text-xl md:text-5xl">
      Good job!
    </h1>
    <div class="mb-4 text-center text-base md:text-3xl">
      <p>You went through {{ reviewLength }} words</p>
    </div>
    <div class="flex gap-4">
      <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl hover:shadow-accent" to="/learn">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Learn More
        </span>
      </NuxtLink>
      <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-3xl hover:shadow-accent" to="/">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Go Home
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
