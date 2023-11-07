<!-- <script setup lang="ts">
const route = useRoute()
const query = ref(route.query.q)

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}
</script>

<template>
  <form @submit.prevent="$router.push(`/search?q=${query}`)">
    <input id="hero-search" v-model="query" v-focus type="text" name="search" class="w-full border border-neutral-600 rounded-xl bg-transparent p-4 text-2xl text-#aaa outline-none focus:border-accent placeholder:text-2xl placeholder:font-300 placeholder:text-neutral-5 focus:outline-0.25" placeholder="Enter a word, kanji or jlpt tag" autocomplete="off" autocorrect="off" spellcheck="false" lang="ja">
  </form>
</template>

<style lang="scss" scoped>

</style> -->
