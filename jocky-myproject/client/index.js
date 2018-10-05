import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'
import store from './store/store'

Vue.use(VueRouter)

const router = createRouter()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
