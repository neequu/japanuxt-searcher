import process from 'node:process'
import { pwa } from './config/pwa'
import { appDescription } from './constants/index'

const isDev = process.env.NODE_ENV === 'development'

export default defineNuxtConfig({
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 1200, staleMaxAge: 600, headersOnly: true } },
    '/api/**': { cors: true },
    '/api/tmdb/**': { swr: 3600 },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',
    '@nuxtjs/supabase',
    '@nuxt/image',
  ],
  supabase: {
    redirectOptions: {
      login: '/sign-in',
      callback: '/confirm',
      exclude: ['/search', '/', '/about', 'words/**'],
    },
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
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
    // pageTransition: { name: 'page', mode: 'out-in' },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  runtimeConfig: {
    public: {
      stripePubKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      baseURL: process.env.NUXT_PUBLIC_BASEURL,
    },
    private: {
      stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,
    },
  },

})
