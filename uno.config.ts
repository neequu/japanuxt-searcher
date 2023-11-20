import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  // presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['link', 'text-accent md:py-3 md:px-6 py-2 px-3 border-b border-transparent  sm:text-lg md:text-2xl transition hover:border-blueGray!'],
    ['linkRed', 'text-red-500 md:py-3 md:px-6 py-2 px-3 border-b border-transparent  sm:text-lg md:text-2xl transition hover:border-blueGray!'],
  ],
  theme: {
    colors: {
      accent: '#4b8dff',
      // accent: '#fc7abc',
    },
    boxShadow: {
      accent: 'inset 2px 2px 5px #4b8dff, inset -2px -2px 5px #4b8dff',
    },
    // breakpoints: {
    //   'sm': '640px',
    //   'md': '768px',
    //   'lg': '1024px',
    //   'xl': '1280px',
    //   '2xl': '1536px',
    // },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    // presetWebFonts({
    //   provider: 'google',
    //   fonts: {
    //     mono: ['Nunito Sans'],
    //   },
    // }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
