<script setup lang="ts">

</script>

<template>
  <div class="relative overflow-hidden rounded">
    <NuxtImg width="600" format="webp" src="/examples-preview.jpg" />
    <NuxtImg width="600" format="webp" src="/examples-preview2.jpg" />
    <div class="absolute inset-0 bg-dark bg-opacity-50 backdrop-blur-4">
      <div class="absolute left-1/2 top-1/2 flex flex-col items-center text-xl -translate-x-1/2 -translate-y-1/2">
        <div class="i-tdesign:lock-on" />
        <!-- todo: add stripe link -->
        <p>Pay to see examples</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
