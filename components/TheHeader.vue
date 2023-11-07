<script setup lang="ts">

</script>

<template>
  <header class="mx-auto flex items-center justify-between px-4 py-3 container">
    <NuxtLink to="/" class="border-b border-transparent outline-none transition focus-visible:border-blueGray">
      <h1 class="text-4xl font-800 leading-[1] tracking-tighter">
        nequjp<span class="ml-2 font-size-50% tracking-tight">clone</span>
      </h1>
    </NuxtLink>
    <nav class="flex items-center">
      <NuxtLink v-slot="{ isActive }" to="/learn" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="link group-focus-visible:border-blueGray">
          Learn
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/decks" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="link group-focus-visible:border-blueGray">
          Decks
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/stats" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="link group-focus-visible:border-blueGray">
          Stats
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/sign-in" class="group outline-none">
        <div :class="isActive && 'border-blueGray' " class="link group-focus-visible:border-blueGray">
          Sign In
        </div>
      </NuxtLink>
      <DarkToggle />
    </nav>
  </header>
</template>

<style lang="scss" scoped>

</style>
