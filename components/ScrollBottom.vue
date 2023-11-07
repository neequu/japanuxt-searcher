<script setup lang="ts">
const tailEl = ref<HTMLDivElement>()
if (process.client) {
  // loadingNext()
  useIntervalFn(() => {
    // if (!tailEl.value || isLoading.value)
    if (!tailEl.value)
      return
    // return
    // if (props.count != null && props.items.length >= props.count)
    // return
    const { top } = tailEl.value.getBoundingClientRect()
    const delta = top - window.innerHeight
    if (delta < 400)
      console.log('yo yo yo yo ')
      // loadingNext()
  }, 500)
}
</script>

<template>
  <div ref="tailEl" />
</template>
