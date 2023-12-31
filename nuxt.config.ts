import { appDescription, appName } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],
  supabase: {
    redirectOptions: {
      login: '/sign-in',
      callback: '/confirm',
      exclude: ['/search', '/', '/about', '/words/**'],
    },
  },
  piniaPersistedstate: {
    storage: 'localStorage',
  },
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
    componentIslands: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/main.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
  },

  app: {
    head: {
      titleTemplate: `%s · ${appName}`,
      htmlAttrs: { lang: 'en' },
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },
  devtools: {
    enabled: false,
  },
})
