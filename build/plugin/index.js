import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
/**
 * * unocss插件，原子css
 * https://github.com/antfu/unocss
 */
// eslint-disable-next-line import/no-unresolved
import Unocss from 'unocss/vite'

// rollup打包分析插件
import visualizer from 'rollup-plugin-visualizer'

// 压缩
import viteCompression from 'vite-plugin-compression'

import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import unplugin from './unplugin'

export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [vue(), vueJsx(), ...unplugin, configHtmlPlugin(viteEnv, isBuild), Unocss()]

  if (viteEnv?.VITE_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }

  if (viteEnv.VITE_USE_COMPRESS) {
    plugins.push(viteCompression({ algorithm: viteEnv.VITE_COMPRESS_TYPE || 'gzip' }))
  }

  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    )
  }

  return plugins
}
