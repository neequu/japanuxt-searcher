<script setup lang="ts">
const query = ref('')
function search() {
  if (!query.value.trim())
    return
  navigateTo(`/search?q=${query.value}`)
}

useHead({
  title: `Home`,
})
</script>

<template>
  <section class="mt-2">
    <SearchForm v-model="query" :on-submit="search" />
  </section>
  <section class="grid mt-8 gap-3 md:gap-6">
    <p class="text-xl md:text-4xl">
      Welcome back!
    </p>
    <p class="md:text-2xl">
      Review the vocabulary you added to your learning list.
    </p>
    <NuxtLink class="group mx-auto mt-2 w-fit border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/learn">
      <div class="border-b border-transparent text-center transition-300 group-focus-visible:border-blueGray">
        Start Learning
      </div>
    </NuxtLink>
  </section>
  <section class="grid mt-6 gap-3 md:mt-28 md:gap-6">
    <p class="text-xl md:text-4xl">
      This project if finally completed!
    </p>
    <p class="md:text-2xl">
      This website is kind of a clone of jpdb.io. Used as a demonstration of skills with nuxt3 and other tools. Click the link below to check out your stats!
    </p>
    <p class="md:text-2xl">
      Later stripe functionality will be added for buying a test subscription. Also leaderboards, quizes and examples in reviews will be added.
    </p>
    <NuxtLink class="group mx-auto mt-2 w-fit border border-accent rounded-xl px-5 py-2 text-accent outline-none transition-300 md:mx-0 md:mt-0 md:px-10 md:py-4 md:text-2xl hover:shadow-accent" to="/learn">
      <div class="flex gap-2 border-b border-transparent text-center group-focus-visible:border-blueGray">
        Your stats
      </div>
    </NuxtLink>
  </section>
</template>
