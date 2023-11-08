<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const error = ref<unknown>()
async function signInWithOAuth() {
  const { error: loginError } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/confirm`,
    },
  })
  // todo: add toast
  if (error)
    error.value = loginError?.message
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <div>
    <button type="button" @click="signInWithOAuth">
      github
    </button>
    <div v-if="error">
      there was an error
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
