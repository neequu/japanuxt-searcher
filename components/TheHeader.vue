<script setup lang="ts">

</script>

<template>
  <header class="mx-auto flex items-center justify-between container">
    <h1 class="text-2rem font-800 leading-[1] tracking-tighter">
      quujp
    </h1>
    <nav class="flex items-center gap-10">
      <NuxtLink v-slot="{ isActive }" to="/learn">
        <div :class="isActive ? 'text-blue' : 'text-white'">
          Learn
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/builder">
        <div :class="isActive ? 'text-blue' : 'text-white'">
          Decks
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/stats">
        <div :class="isActive ? 'text-blue' : 'text-white'">
          Stats
        </div>
      </NuxtLink>
      <NuxtLink v-slot="{ isActive }" to="/sign-in">
        <div :class="isActive ? 'text-blue' : 'text-white'">
          Sign In
        </div>
      </NuxtLink>
      <DarkToggle />
    </nav>
  </header>
</template>

<style lang="scss" scoped>

</style>
