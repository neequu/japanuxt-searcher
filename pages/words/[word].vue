<script setup lang="ts">
// const added = ref(false)
const bookmarkClass = ref('i-tdesign:bookmark-add')
const route = useRoute()
const { word } = route.params

function addWord() {
  saveWord(word)
  // if (added.value) {
  //   bookmarkClass.value = 'i-tdesign:bookmark-add'
  //   added.value = false
  // }
  // else {
  //   bookmarkClass.value = 'i-tdesign:bookmark-checked'
  //   setTimeout(() => {
  //     bookmarkClass.value = 'i-tdesign:bookmark-minus'
  //   }, 440)
  //   added.value = true
  // }
}
</script>

<template>
  <!-- todo: add dynamic label and hover -->
  {{ word }}

  <button type="button" class="border-b border-transparent text-2xl outline-none focus-visible:border-blueGray" @click="addWord">
    <div :class="bookmarkClass" />
  </button>
</template>
