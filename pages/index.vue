<script setup lang="ts">
import type { Database } from '~/supabase'

const query = ref('')
function search() {
  navigateTo(`/search?q=${query.value}`)
}

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const { data: isSubscribed } = user.value ? await supabase.from('subscriptions').select().eq('user_id', user.value.id) : false
</script>

<template>
  {{ isSubscribed }}
  <section class="mt-2">
    <SearchForm v-model="query" :on-submit="search" />
  </section>
  <section class="flex flex-wrap items-center justify-center gap-4 py-2 sm:justify-evenly sm:gap-0 md:py-3">
    <NuxtLink class="border-b border-transparent outline-none transition focus-visible:border-blueGray link" to="/quiz">
      Quiz
    </NuxtLink>
    <NuxtLink class="border-b border-transparent outline-none transition focus-visible:border-blueGray link" to="/quiz">
      Leaderboard
    </NuxtLink>
  </section>
  <section class="grid mt-4 gap-3 md:mt-8 md:gap-6">
    <p class="text-xl md:text-4xl">
      Welcome back!
    </p>
    <p class="md:text-2xl">
      You have 15 due vocabulary and 60 new vocabulary available for review.
    </p>
    <NuxtLink class="group mx-auto mt-2 w-fit border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/learn">
      <div class="border-b border-transparent text-center transition-300 group-focus-visible:border-blueGray">
        Start Learning
      </div>
    </NuxtLink>
  </section>
  <section class="grid mt-6 gap-3 md:mt-28 md:gap-6">
    <p class="text-xl md:text-4xl">
      Consider upgrading your account! ヽ(✿ﾟ▽ﾟ)ノ
    </p>
    <p class="md:text-2xl">
      This website is a clone (kinda) of jpdb.io. Used as a demonstration of skills with nuxt3 and other tools. Click the link below to check out Stripe functionality.
    </p>
    <p class="md:text-2xl">
      You can click on a button below to check out stripe functionality and test buying a subscription.
    </p>
    <NuxtLink class="group mx-auto mt-2 w-fit border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/learn">
      <div class="flex gap-2 border-b border-transparent text-center group-focus-visible:border-blueGray">
        Start Paying
        <div class="i-tdesign:money" />
      </div>
    </NuxtLink>
  </section>
</template>
