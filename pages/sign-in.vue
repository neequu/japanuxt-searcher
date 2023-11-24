<script setup lang="ts">
import type { Container } from 'tsparticles-engine'
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
  // todo: add toast
  if (error)
    error.value = loginError?.message
}

watchEffect(() => {
  if (user.value)
    navigateTo('/')
})

function onLoad(container: Container) {
  container.play()
}
</script>

<template>
  <NuxtParticles
    id="tsparticles"
    url="/options.json"
    :options="{ fullScreen: { enable: false, zIndex: -10 } }"
    @load="onLoad"
  />
  <div class="grid h-full place-content-center">
    <button aria-label="sign in with github" type="button" class="z-10 flex items-center gap-2 border-b border-transparent text-xl outline-none transition-300 focus-visible:border-blueGray hover:border-blueGray md:text-3xl" @click="signInWithOAuth">
      <div class="i-tdesign:logo-github-filled text-xl md:text-4xl" />
      Sign In With Github
    </button>

    <div v-if="error">
      there was an error
    </div>
  </div>
</template>
