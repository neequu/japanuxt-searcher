<template>
  <div class="h-full flex flex-1 flex-col">
    <TheHeader />
    <main class="mx-auto flex-1 px-4 container">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
