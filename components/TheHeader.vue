<script setup lang="ts">

</script>

<template>
  <header class="mx-auto flex items-center justify-between p-4 container">
    <NuxtLink to="/">
      <h1 class="text-2rem font-800 leading-[1] tracking-tighter">
        quujp
      </h1>
    </NuxtLink>
    <nav class="flex items-center gap-10">
      <NuxtLink v-slot="{ isActive }" to="/learn">
        <div :class="isActive && 'text-accent' " class="border-b border-transparent text-2xl font-500 transition hover:border-blueGray">
          Learn
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/decks">
        <div :class="isActive && 'text-accent' " class="border-b border-transparent text-2xl font-500 transition hover:border-blueGray">
          Decks
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/stats">
        <div :class="isActive && 'text-accent' " class="border-b border-transparent text-2xl font-500 transition hover:border-blueGray">
          Stats
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/sign-in">
        <div :class="isActive && 'text-accent' " class="border-b border-transparent text-2xl font-500 transition hover:border-blueGray">
          Sign In
        </div>
      </NuxtLink>
      <DarkToggle />
    </nav>
  </header>
</template>

<style lang="scss" scoped>

</style>
