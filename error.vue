<script setup>
const props = defineProps({
  error: Object,
})

const message = computed(() => String(props.error?.message || ''))
const is404 = computed(() => props.error?.statusCode === 404 || message.value?.includes('404'))
const isDev = process.dev

function handleError() {
  return clearError({ redirect: '/' })
}
</script>

<template>
  <main class="grid mx-auto h-screen place-content-center gap-5 px-4 text-center container md:gap-8">
    <div class="text-xl md:text-3xl">
      {{ is404 ? 'This page could not be found' : 'An error occurred' }}
    </div>
    <div class="op50 md:text-xl">
      Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
    </div>
    <pre v-if="isDev">{{ error }}</pre>
    <div>
      <button class="border-b border-transparent text-lg text-accent outline-none transition focus-visible:border-blueGray hover:border-accent!" aria-label="reset error" type="button" @click="handleError">
        Go Home
      </button>
    </div>
  </main>
</template>
