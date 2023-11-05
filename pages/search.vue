<script setup lang="ts">
</script>

<template>
  <div>
    <Suspense>
      <template #default>
        <SearchResults :query="$route.query" />
      </template>
      <template #fallback>
        loading...
      </template>
    </Suspense>
  </div>
</template>

<style lang="scss" scoped>

</style>
