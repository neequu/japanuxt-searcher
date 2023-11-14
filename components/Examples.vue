<script setup lang="ts">
// const supabase = useSupabaseClient()

async function subscribe() {
  const data = await $fetch(`/api/stripe/subscribe`, {
    method: 'post',
  })

  await navigateTo(data.url, {
    external: true,
  })
}
</script>

<template>
  <div class="relative overflow-hidden rounded">
    <NuxtImg width="600" format="webp" src="/examples-preview.jpg" />
    <NuxtImg width="600" format="webp" src="/examples-preview2.jpg" />
    <div class="absolute inset-0 bg-dark bg-opacity-50 backdrop-blur-4">
      <div class="grid mx-auto h-full place-content-center text-center text-lg md:text-xl">
        <div class="i-tdesign:lock-on mx-auto" />
        <!-- todo: add stripe link -->
        <button class="" @click="subscribe">
          Pay to see examples
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
