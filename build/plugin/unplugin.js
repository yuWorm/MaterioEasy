import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import Components from 'unplugin-vue-components/vite'
import vuetify from 'vite-plugin-vuetify'

/**
 * * unplugin-icons插件，自动引入iconify图标
 * usage: https://github.com/antfu/unplugin-icons
 * 图标库: https://icones.js.org/
 */

import Icons from 'unplugin-icons/vite'

import { getSrcPath } from '../utils'

const customIconPath = resolve(getSrcPath(), 'assets/svg')

export default [
  AutoImport({
    eslintrc: {
      enabled: true,
      filepath: './.eslintrc-auto-import.json',
    },
    imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
    vueTemplate: true,
    dts: false,
  }),
  vuetify({
    styles: {
      configFile: 'src/styles/variables/_vuetify.scss',
    },
  }),
  Icons({
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(customIconPath),
    },
    scale: 1,
    defaultClass: 'inline-block',
  }),
  Components({
    dirs: ['src/@core/components'],
    dts: true,
  }),
  // createSvgIconsPlugin({
  //   iconDirs: [customIconPath],
  //   symbolId: 'icon-custom-[dir]-[name]',
  //   inject: 'body-last',
  //   customDomId: '__CUSTOM_SVG_ICON__',
  // }),
]
