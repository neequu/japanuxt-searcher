<script setup lang="ts">
import type { Database } from '~/supabase'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const error = ref<unknown>()
async function signInWithOAuth() {
  const { error: loginError } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/confirm`,
    },
  })
  if (loginError) {
    error.value = loginError?.message
    showErrorMessage(`Couldn't sign you in. Please try again`)
  }
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})
</script>

<template>
  <section class="grid h-full place-content-center">
    <button aria-label="sign in with github" type="button" class="z-10 flex items-center gap-2 border-b border-transparent text-xl outline-none transition-300 focus-visible:border-blueGray hover:border-blueGray md:text-3xl" @click="signInWithOAuth">
      <div class="i-tdesign:logo-github-filled text-xl md:text-4xl" />
      Sign In With Github
    </button>
    <div v-if="error" class="text-accent-red">
      There was an error. Please try again
    </div>
  </section>
</template>
