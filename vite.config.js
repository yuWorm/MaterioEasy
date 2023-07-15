import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { OUTPUT_DIR, PROXY_CONFIG } from './build/constant'
import { createVitePlugins } from './build/plugin'
import { convertEnv, getRootPath, getSrcPath } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const srcPath = getSrcPath()
  const rootPath = getRootPath()
  const isBuild = command === 'build'

  const env = loadEnv(mode, process.cwd())
  const viteEnv = convertEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_USE_PROXY, VITE_BASE_API } = viteEnv

  return {
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '~': rootPath,
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
        '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
        apexcharts: fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: false,
      proxy: VITE_USE_PROXY
        ? {
            [VITE_BASE_API]: PROXY_CONFIG[VITE_BASE_API],
            '/api/v2': PROXY_CONFIG['/api/v2'],
          }
        : undefined,
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR || 'dist',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
    optimizeDeps: {
      exclude: ['vuetify'],
      entries: ['./src/**/*.vue'],
    },
    define: { 'process.env': {} },
  }
})

// https://vitejs.dev/config/
// export module defineConfig({
//   plugins: [
//     vue(),
//     vueJsx(),

//     // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
//     vuetify({
//       styles: {
//         configFile: 'src/styles/variables/_vuetify.scss',
//       },
//     }),
//     Components({
//       dirs: ['src/@core/components'],
//       dts: true,
//     }),
//     AutoImport({
//       eslintrc: {
//         enabled: true,
//         filepath: './.eslintrc-auto-import.json',
//       },
//       imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/math', 'pinia'],
//       vueTemplate: true,
//     }),
//   ],
//   define: { 'process.env': {} },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '@core': fileURLToPath(new URL('./src/@core', import.meta.url)),
//       '@layouts': fileURLToPath(new URL('./src/@layouts', import.meta.url)),
//       '@images': fileURLToPath(new URL('./src/assets/images/', import.meta.url)),
//       '@styles': fileURLToPath(new URL('./src/styles/', import.meta.url)),
//       '@configured-variables': fileURLToPath(new URL('./src/styles/variables/_template.scss', import.meta.url)),
//       '@axios': fileURLToPath(new URL('./src/plugins/axios', import.meta.url)),
//       apexcharts: fileURLToPath(new URL('node_modules/apexcharts-clevision', import.meta.url)),
//     },
//   },
//   build: {
//     chunkSizeWarningLimit: 5000,
//   },
//   optimizeDeps: {
//     exclude: ['vuetify'],
//     entries: ['./src/**/*.vue'],
//   },
// })
