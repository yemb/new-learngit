import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 规范性，比如修改state会warning,开发环境用
    state: defaultState,
    mutations,
    getters,
    actions
    // plugins: [
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]

    // modules: {
    //   a: {
    //     namespaced: true, // 子模块的mutations，getters，actions 会变成全局，所以需要指定独立命名空间
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateCount (state,num) {
    //         // 组件中调用 this['a/updateCount'] || this.$store.commit('a/updateCount')
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) {
    //         // state是当前state；rootState全局的state，可以拿到其他state数据；getters是所有的getters方法
    //       }
    //     },
    //     actions: {
    //       add (ctx) {
    //         //ctx => { state, commit, rootState}
    //         commit('updateCount', { num: 5678}, {root: true})
    //         //只有namespace 不为true或者root：true，才能拿到全局的mutations
    //       }
    //     }
    //   },
    //   b: {
    //     state: {
    //       text: 2
    //     }
    //   }
    // }
  })

  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default

      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
