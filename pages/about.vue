<script setup lang="ts">
useHead({
  title: `About`,
})
</script>

<template>
  <section class="mt-8">
    <h1 class="text-xl md:text-3xl">
      This project
    </h1>
    <div class="mt-4 md:text-xl">
      <p>This project is built with Nuxt3 and is designed to showcase coding skills using Vue.js / Nuxt3, along with other technologies such as Pinia, UnoCSS, Supabase + cookie auth, and TypeScript.</p>
      <p class="mt-4">
        This is a pet project; therefore, no actual usage is intended. It's worth noting that, despite being inspired by other websites, it was built from scratch without relying on other people's code.
      </p>
      <div>
        Special thanks to
        <a class="border-b border-transparent outline-none transition focus-visible:border-blueGray hover:border-blueGray" target="_blank" href="https://jisho.org">jisho</a>,
        <a class="border-b border-transparent outline-none transition focus-visible:border-blueGray hover:border-blueGray" target="_blank" href="https://immersionkit.com">immersionkit</a> and
        <a class="border-b border-transparent outline-none transition focus-visible:border-blueGray hover:border-blueGray" target="_blank" href="https://jpdb.io">jpdb</a> for making this project possible.
      </div>
      <p class="mt-4">
        Built by nikita stepanov. Contact me via the links below.
      </p>
      <ul class="mt-4">
        <li class="mb-1 text-accent">
          <a href="https://github.com/neequu" target="_blank" class="border-b border-transparent outline-none transition focus-visible:border-blueGray hover:border-blueGray">Github</a>
        </li>
        <li class="text-accent">
          <a href="https://t.me/neequu" target="_blank" class="border-b border-transparent outline-none transition focus-visible:border-blueGray hover:border-blueGray">Telegram</a>
        </li>
      </ul>
    </div>
  </section>
</template>
