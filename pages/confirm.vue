<script setup lang="ts">
const user = useSupabaseUser()
watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div>Waiting for login...</div>
</template>
