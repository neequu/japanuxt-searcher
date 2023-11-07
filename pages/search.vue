<script setup lang="ts">
definePageMeta({
  layout: 'search-form-layout',
})
</script>

<template>
  <section class="mt-10">
    <SearchResults :query="($route.query.q || '').toString()" />
  </section>
</template>
