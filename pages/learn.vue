<script setup lang="ts">
import type { Database } from '~/supabase'

const { data: userWords }: { data: Database['public']['Tables']['user_words']['Row'][] } = await getUserWords()
</script>

<template>
  <div>
    <section class="mt-8">
      <h1 class="mb-4 text-xl md:text-3xl">
        Continue Your Learning Progress
      </h1>
      <NuxtLink class="group mx-auto inline-flex border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/review">
        <span class="border-b border-transparent text-center group-focus-visible:border-blueGray">
          Review Words
        </span>
      </NuxtLink>
    </section>

    <section class="mt-8">
      <h1 class="text-xl md:text-3xl">
        Saved Words
      </h1>
      <template v-if="true">
        <div v-for="w in userWords" :key="w.word" class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3">
          <NuxtLink :to="`/words/${w.word}`" class="self-center text-2xl sm:text-3xl">
            {{ w.word }}
          </NuxtLink>
          <div class="flex flex-col items-end gap-5">
            <p v-if="w.strength === 0" class="text-accent">
              New
            </p>
            <p v-else-if="w.strength === 1" class="text-accent4">
              Learning
            </p>
            <p v-else class="text-accent2">
              Never Forget
            </p>
            <SaveButton :word="w.word" :saved-word="w" />
          </div>
        </div>
      </template>
      <div v-else class="mt-4 text-lg">
        You haven't saved anything yet
      </div>
    </section>
  </div>
</template>
