<script setup lang="ts">
</script>

<template>
  <section class="mt-2">
    <HeroForm />
  </section>
  <div class="flex items-center justify-evenly py-3">
    <NuxtLink class="link" to="/quiz">
      Quiz
    </NuxtLink>
    <NuxtLink class="link" to="/quiz">
      Quiz
    </NuxtLink>
  </div>
  <section class="grid mt-8 gap-6">
    <p class="text-4xl font-500">
      Welcome back!
    </p>
    <p class="text-2xl">
      You have 15 due vocabulary and 60 new vocabulary available for review.
    </p>
    <NuxtLink class="w-fit border border-accent rounded-xl px-10 py-4 text-2xl font-500 text-accent transition-300 hover:shadow-accent" to="/learn">
      Start Learning
    </NuxtLink>
  </section>
  <section class="grid mt-28 gap-6">
    <p class="text-4xl font-500">
      Consider upgrading your account! | (jk!) ヽ(✿ﾟ▽ﾟ)ノ
    </p>
    <p class="text-2xl">
      This website is currently being developed by a single person in his spare time. That person is me. I've already put thousands of hours of work into it, and I intend to put thousands more. If you find it useful I'd appreciate it if you could support me on Patreon!
    </p>
  </section>
</template>
