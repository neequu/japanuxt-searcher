<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  min-width: 200px;
  margin: 0;
  padding: 0;
  color-scheme: dark light;
  font-family: 'Nunito Sans', Helvetica, sans-serif;
}

html.dark {
  background: #181818;
  color: #bbb;
}
/*
.page-enter-active,
.page-leave-active {
  transition: all 88ms;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
} */
</style>
