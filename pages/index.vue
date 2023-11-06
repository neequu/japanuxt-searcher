<script setup lang="ts">
definePageMeta({
  layout: 'search-form-layout',
})
</script>

<template>
  <section class="flex items-center justify-evenly py-3">
    <NuxtLink class="link" to="/quiz">
      Quiz
    </NuxtLink>
    <NuxtLink class="link" to="/quiz">
      Quiz
    </NuxtLink>
  </section>
  <section class="grid mt-8 gap-6">
    <p class="text-4xl">
      Welcome back!
    </p>
    <p class="text-2xl">
      You have 15 due vocabulary and 60 new vocabulary available for review.
    </p>
    <NuxtLink class="w-fit border border-accent rounded-xl px-10 py-4 text-2xl text-accent transition-300 hover:shadow-accent" to="/learn">
      Start Learning
    </NuxtLink>
  </section>
  <section class="grid mt-28 gap-6">
    <p class="text-4xl">
      Consider upgrading your account! ヽ(✿ﾟ▽ﾟ)ノ
    </p>
    <p class="text-2xl">
      This website is a clone (kinda) of jpdb.io. Used as a demonstration of skills with nuxt3 and other tools. Click the link below to check out Stripe functionality. You will be redirected to the checkout page. You can also have a look at the about link in the footer 👀.
    </p>
    <NuxtLink class="w-fit border border-accent rounded-xl px-10 py-4 text-2xl text-accent transition-300 hover:shadow-accent" to="/learn">
      Start Paying
    </NuxtLink>
  </section>
</template>
