<script setup lang="ts">
definePageMeta({
  layout: 'strip-layout',
})
const user = useSupabaseUser()
watchEffect(() => {
  // todo: fix if not signed in
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div class="grid h-full w-full place-content-center text-white">
    <div class="i-tdesign:loading animate-spin text-7xl" />
  </div>
</template>
