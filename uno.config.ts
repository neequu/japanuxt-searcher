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
      'accent': '#4b8dff',
      'accent-darkgreen': '#078001',
      'accent-red': '#a94002',
      'accent-lightgreen': '#60ee90',
    },
    boxShadow: {
      'accent': 'inset 2px 2px 5px #4b8dff, inset -2px -2px 5px #4b8dff',
      'accent-darkgreen': 'inset 2px 2px 5px #078001, inset -2px -2px 5px #078001',
      'accent-red': 'inset 2px 2px 5px #a94002, inset -2px -2px 5px #a94002',
      'accent-lightgreen': 'inset 2px 2px 5px #60ee90, inset -2px -2px 5px #60ee90',
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
