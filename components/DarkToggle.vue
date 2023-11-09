<script setup lang="ts">
const color = useColorMode()

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
})

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button aria-label="change theme" type="button" class="group group pl-6 !outline-none" @click="toggleDark">
    <div class="i-tdesign-sunny dark:i-tdesign-moon text-2xl transition group-focus-visible:rotate-380" />
  </button>
</template>
