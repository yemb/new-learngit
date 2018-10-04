import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)
const two = document.createElement('div')
document.body.appendChild(two)

new Vue({
  render: (h) => h(App)
}).$mount(two)
