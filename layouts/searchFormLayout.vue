<template>
  <div class="h-full flex flex-col">
    <TheHeader />
    <section class="mx-auto mt-2 px-4 container">
      <HeroForm />
    </section>
    <main class="mx-auto flex-1 px-4 container">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
