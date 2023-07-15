import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import { setupRouter } from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import 'uno.css'
import { createApp } from 'vue'
import { setupStore } from './store'
// 消息组件
import Message from 'vue-m-message'
import 'vue-m-message/dist/style.css'
// 进度条
import PageProgressBar from './components/page_progressbar'

async function setupApp() {
  loadFonts()
  // Create vue app
  const app = createApp(App)
  // Use plugins
  app.use(vuetify)
  // Message
  app.use(Message)
  window.$message = Message
  window.$loadingBar = new PageProgressBar()

  setupStore(app)
  await setupRouter(app)
  app.mount('#app')
}

setupApp()
