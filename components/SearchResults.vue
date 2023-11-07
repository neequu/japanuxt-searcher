<script setup lang="ts">
const { query } = defineProps<{
  query: string
}>()
// const page = ref(1)
// const items = ref([])
// async function fetch() {
// const res = await searchDictionary(query, page.value)
// items.value.push(...res)
// }
const items = await searchDictionary(query)
// watch(
// () => page.value,
// () => fetch(),
// )
// await fetch()
const tailEl = ref<HTMLDivElement>()
if (process.client) {
  console.log(tailEl.value)
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
  <p class="mb-5 flex justify-end text-neutral-5">
    {{ items?.length }} results on this page
  </p>
  <div v-if="items?.length" class="grid gap-10">
    <WordCard v-for="res in items" :key="res.slug" :item="res" />
  </div>
  <div ref="tailEl" />
</template>
