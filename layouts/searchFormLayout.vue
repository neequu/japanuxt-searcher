<template>
  <div class="h-full flex flex-col">
    <TheHeader />
    <section class="mx-auto mt-2 px-4 container">
      <HeroForm />
    </section>
    <main class="mx-auto flex flex-1 flex-col px-4 container">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
