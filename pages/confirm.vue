<script setup lang="ts">
definePageMeta({
  layout: 'strip-layout',
})
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/')
})

useHead({
  title: 'Redirecting',
})
</script>

<template>
  <section class="grid h-full w-full place-content-center text-white">
    <div class="i-tdesign:loading animate-spin text-3xl md:text-7xl" />
  </section>
</template>
