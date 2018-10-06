import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createVuex from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createVuex()

// 注册模块和注销模块
// store.registerModule('xxx', {
//   state: {
//     text: 3
//   }
// })
// store.unregisterModule('xxx')

// 相当于getters，两个参数，第一个参数是监听的数据的一个函数，第二个是回调函数
// store.watch((state) => {state.count+1},(newcount) => {
//   console.log(newcount)
// })

// store.subscribe((mutation, state)=>{
//   console.log(mutation.type) // 调用的mutations名字
//   console.log(mutation.payload) // 调用的mutations参数
// })

// store.subscribeAction((action, state)=>{
//   console.log(action.type) // 调用的action名字
//   console.log(action.payload) // 调用的action参数
// })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
