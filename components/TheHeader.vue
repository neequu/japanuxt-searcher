<script setup lang="ts">
import type { Database } from '~/supabase'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

async function signOut() {
  await supabase.auth.signOut()
  navigateTo('/')
}
</script>

<template>
  <header class="mx-auto flex items-center justify-between px-4 py-3 container">
    <NuxtLink to="/" class="border-b border-transparent outline-none transition focus-visible:border-blueGray">
      <h1 class="text-4xl font-800 leading-[1] tracking-tighter">
        nequjp<span class="ml-2 font-size-50% tracking-tight">clone</span>
      </h1>
    </NuxtLink>
    <nav class="hidden items-center md:flex">
      <NuxtLink v-slot="{ isActive }" to="/learn" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="group-focus-visible:border-blueGray link">
          Learn
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/decks" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="group-focus-visible:border-blueGray link">
          Decks
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/stats" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="group-focus-visible:border-blueGray link">
          Stats
        </div>
      </NuxtLink>
      <button v-if="user" aria-label="log out" type="button" class="outline-none focus-visible:border-blueGray link" @click="signOut">
        Logout
      </button>
      <NuxtLink v-else v-slot="{ isActive }" to="/sign-in" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="group-focus-visible:border-blueGray link">
          Sign In
        </div>
      </NuxtLink>
      <DarkToggle />
    </nav>
  </header>
</template>

<style lang="scss" scoped>

</style>
