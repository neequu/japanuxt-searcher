<script setup lang="ts">
</script>

<template>
  <div class="mt-4 flex justify-between border border-neutral-6 rounded-xl p-3">
    <NuxtLink to="/words/z" class="self-center text-2xl sm:text-3xl">
      N5
    </NuxtLink>
    <div class="flex flex-col items-end gap-5">
      <!-- <SaveButton :word="w.word" :saved-word="w" /> -->
      <!-- <div class="grid">
            <button class="text-green" @click="updateLevel(1, w.word)">
              know
            </button>
            <button class="text-red" @click="updateLevel(0, w.word)">
              don't know
            </button>
          </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
