import { presetDaisy } from '@ameinhardt/unocss-preset-daisy'
import { presetAttributify, presetIcons, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import { defineConfig } from 'unocss/vite'
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  content: {
  },
  presets: [
    presetWind4({
    }),
    presetAttributify(),
    presetDaisy({
      base: true,
      themes: ['dracula --default'],
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      cdn: 'https://esm.sh/',
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // collections: {
      //   local: FileSystemIconLoader('./src/static/svg'),
      // },
    }),
  ],
  transformers: [
    transformerDirectives(), // 启用 @apply 功能
    transformerVariantGroup(), // 启用 () 分组功能
  ],
  shortcuts: [],
})
