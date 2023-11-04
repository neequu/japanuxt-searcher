<script setup lang="ts">

</script>

<template>
  <header class="mx-auto flex items-center justify-between px-4 py-3 container">
    <NuxtLink to="/">
      <h1 class="text-4xl font-800 leading-[1] tracking-tighter">
        nequjp<span class="ml-2 font-size-50% tracking-tight">clone</span>
      </h1>
    </NuxtLink>
    <nav class="flex items-center">
      <NuxtLink v-slot="{ isActive }" to="/learn">
        <div :class="isActive && 'border-neutral-600' " class="link">
          Learn
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/decks">
        <div :class="isActive && 'border-neutral-600' " class="link">
          Decks
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/stats">
        <div :class="isActive && 'border-neutral-600' " class="link">
          Stats
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/sign-in">
        <div :class="isActive && 'border-neutral-600' " class="link">
          Sign In
        </div>
      </NuxtLink>
      <DarkToggle />
    </nav>
  </header>
</template>

<style lang="scss" scoped>

</style>
