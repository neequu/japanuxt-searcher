<script setup lang="ts">
import type { Database } from '~/supabase'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

async function signOut() {
  await supabase.auth.signOut()
  navigateTo('/')
}

const { width } = useWindowSize()

const visible = ref(false)
</script>

<template>
  <header class="mx-auto px-4 py-3 container sm:flex sm:items-center sm:justify-between">
    <div class="flex items-center justify-between">
      <NuxtLink to="/" class="border-b border-transparent outline-none transition focus-visible:border-blueGray">
        <h1 class="text-2xl font-700 leading-[1] tracking-tighter md:text-4xl">
          nequjp<span class="ml-2 font-size-50% tracking-tight">clone</span>
        </h1>
      </NuxtLink>
      <button aria-label="menu" type="button" class="outline-none sm:hidden" @click="visible = !visible">
        <div :class="visible ? 'i-tdesign:close' : 'i-tdesign:view-list'" />
      </button>
    </div>
    <Transition>
      <!-- <template > -->
      <nav v-if="width >= 640 || visible" class="mt-4 flex flex-wrap items-center justify-center sm:mt-0">
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
        <button v-if="user" aria-label="sign out of account" type="button" class="linkRed outline-none focus-visible:border-blueGray" @click="signOut">
          Logout
        </button>
        <NuxtLink v-else v-slot="{ isActive }" to="/sign-in" class="group outline-none">
          <div :class="isActive && 'border-blueGray' " class="group-focus-visible:border-blueGray link">
            Sign In
          </div>
        </NuxtLink>
        <DarkToggle />
      </nav>
      <!-- </template> -->
    </Transition>
  </header>
</template>

<style  scoped>
.v-enter-active,
.v-leave-active {
  transition: filter 220ms ease-in;
}

.v-enter-from,
.v-leave-to {
  filter:blur(0.5rem);
  position: absolute;
  transform: translateY(-400%);
}
</style>
