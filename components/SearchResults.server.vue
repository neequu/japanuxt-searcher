<script setup lang="ts">
import type { LocationQuery } from '#vue-router'

const props = defineProps<{
  query: LocationQuery
}>()
const res = await $fetch('https://jsonplaceholder.typicode.com/todos/' + `${props.query.q}`)
</script>

<template>
  <div>
    {{ res }}
  </div>
</template>

<style lang="scss" scoped>

</style>
