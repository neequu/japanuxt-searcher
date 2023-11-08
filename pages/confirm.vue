<script setup lang="ts">
definePageMeta({
  layout: 'strip-layout',
})
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="i-carbon:circle-dash animate-spin text-4xl" />
  </div>
</template>
