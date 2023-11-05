<script setup lang="ts">
const query = ref('')
</script>

<template>
  <form @submit.prevent="$router.push(`/search?q=${query}`)">
    <input id="hero-search" v-model="query" type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:font-300 placeholder:text-neutral-5 focus:outline-0.25" autofocus placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
  </form>
</template>

<style lang="scss" scoped>

</style>
