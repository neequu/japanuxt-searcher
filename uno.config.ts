import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['link', 'text-accent py-3 px-6 border-b border-transparent text-2xl transition hover:border-blueGray!'],
  ],
  theme: {
    colors: {
      accent: '#4b8dff',
      // accent: '#fc7abc',
    },
    boxShadow: {
      accent: 'inset 3px 3px 5px #4b8dff, inset -3px -3px 5px #4b8dff',
    },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
