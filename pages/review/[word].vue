<script setup lang="ts">
function updateLevel(lvl: number, word: string) {
  $fetch('/api/supabase/user-words/change-level', {
    method: 'post',
    body: { lvl, word },
  })
}
</script>

<template>
  <div class="grid">
    <button class="text-#0f9" @click="updateLevel(1, w.word)">
      know
    </button>
    <button class="text-#f44" @click="updateLevel(0, w.word)">
      don't know
    </button>
    <button class="text-#0a0" @click="updateLevel(2, w.word)">
      never forget
    </button>
  </div>
</template>
