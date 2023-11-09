<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

const query = ref('')
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}
onKeyDown('/', (e) => {
  console.log(e)
})
</script>

<template>
  <section class="mt-2">
    <form @submit.prevent="$router.push(`/search?q=${query}`)">
      <input id="hero-search" v-model="query" v-focus type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
    </form>
  </section>
  <section class="flex items-center justify-evenly py-3">
    <NuxtLink class="border-b border-transparent outline-none transition focus-visible:border-blueGray link" to="/quiz">
      Quiz
    </NuxtLink>
    <NuxtLink class="border-b border-transparent outline-none transition focus-visible:border-blueGray link" to="/quiz">
      Leaderboard
    </NuxtLink>
  </section>
  <section class="grid mt-8 gap-6">
    <p class="text-4xl">
      Welcome back!
    </p>
    <p class="text-2xl">
      You have 15 due vocabulary and 60 new vocabulary available for review.
    </p>
    <NuxtLink class="group w-fit border border-accent rounded-xl px-10 py-4 text-2xl text-accent outline-none hover:shadow-accent" to="/learn">
      <div class="border-b border-transparent transition-300 group-focus-visible:border-blueGray">
        Start Learning
      </div>
    </NuxtLink>
  </section>
  <section class="grid mt-28 gap-6">
    <p class="text-4xl">
      Consider upgrading your account! ヽ(✿ﾟ▽ﾟ)ノ
    </p>
    <p class="text-2xl">
      This website is a clone (kinda) of jpdb.io. Used as a demonstration of skills with nuxt3 and other tools. Click the link below to check out Stripe functionality. You will be redirected to the checkout page. You can also have a look at the about link in the footer 👀.
    </p>
    <NuxtLink class="group w-fit border border-accent rounded-xl px-10 py-4 text-2xl text-accent outline-none hover:shadow-accent" to="/learn">
      <div class="flex gap-2 border-b border-transparent transition-300 group-focus-visible:border-blueGray">
        Start Paying
        <div class="i-tdesign:money" />
      </div>
    </NuxtLink>
  </section>
</template>
