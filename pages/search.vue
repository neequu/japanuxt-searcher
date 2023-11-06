<script setup lang="ts">
definePageMeta({
  layout: 'search-form-layout',
})
</script>

<template>
  <section>
    <SearchResults :query="($route.query.q || '').toString()" :lazy="true">
      <template #fallback>
        loading...
      </template>
    </SearchResults>
  </section>
</template>
