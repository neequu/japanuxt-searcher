<script setup lang="ts">
const { query } = defineProps<{
  query: string
}>()
// const res = await $fetch('https://jsonplaceholder.typicode.com/todos/' + `${props.query.q}`)
const results = await searchDictionary(query)
</script>

<template>
  <pre>
    {{ results.data }}
  </pre>
</template>

<style lang="scss" scoped>

</style>
