<script setup lang="ts">
definePageMeta({
  layout: 'strip-layout',
})
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/')
  // else
  //   navigateTo('/sign-in')
})
</script>

<template>
  <div class="grid h-full w-full place-content-center text-white">
    <div class="i-tdesign:loading animate-spin text-7xl" />
  </div>
</template>
