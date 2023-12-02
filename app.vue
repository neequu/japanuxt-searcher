<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  min-height: 100vh;
  height: 100%;
  min-width: 280px;
  margin: 0;
  padding: 0;
  color-scheme: dark light;
  font-family: 'Nunito Sans', Helvetica, sans-serif;
}

html.dark {
  background: #181818;
  color: #bbb;
}
</style>
