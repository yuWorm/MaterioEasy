import vuetify from '@/plugins/vuetify'
import { createApp } from 'vue'
import ProgressBar from './index.vue'

function PageProgressBar() {
  this.mountNode = document.createElement('div')
  this.app = createApp(ProgressBar, {})
  this.app.use(vuetify)
  this.init()
}
PageProgressBar.prototype.init = function () {
  this.app.vm = this.app.mount(this.mountNode)
  document.body.appendChild(this.mountNode)
}

PageProgressBar.prototype.start = function () {
  this.app.vm.show(true)
}

PageProgressBar.prototype.finish = function () {
  this.app.vm.show(false)
}

export default PageProgressBar
