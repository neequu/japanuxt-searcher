<script setup lang="ts">
const props = defineProps<{
  item: string
}>()

const { copy, copied } = useClipboard()
function handleCopy() {
  copy(props.item)
  // todo: add toast
}
</script>

<template>
  <button :aria-label="`Copy ${item} to clipboard`" type="button" class="text-lg outline-none transition hover:scale-105 sm:text-2xl" :title="`Copy ${item} to clipboard`" @click="handleCopy">
    <div :class="[copied ? 'i-tdesign:component-checkbox' : 'i-tdesign:copy']" />
  </button>
</template>

<style lang="scss" scoped>

</style>
