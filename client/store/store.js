import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development' // 判断是否为开发环境

export default () => {
  const store = new Vuex.Store({
    strict: isDev, // true,开发环境中报错不支持直接赋值修改store里面的数据
    state: defaultState,
    mutations,
    getters,
    actions
    // plugins: [ // 自定义插件
    //   (store) => {
    //     console.log('my plugin invoked')
    //   }
    // ]
    // modules: { // 分模块，每个模块拥有自己的 state、mutation、action、getter
    //   a: {
    //     namespaced: true, // 如果mutations很多的情况，添加之后不同模块的mutations名字可以相同，但是调用模块中的mutations不能直接调用
    //     state: {
    //       text: 1
    //     },
    //     mutations: {
    //       updateText (state, text) {
    //         state.text = text
    //       }
    //     },
    //     getters: {
    //       textPlus (state, getters, rootState) { // rootState全局state
    //         return state.text + rootState.count
    //       }
    //     },
    //     actions: {
    //       add ({ state, commit, rootState }) {
    //         commit('updateText', rootState.count)
    //         commit('updateText', rootState.count, { num: 23232 }, { root: true })
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
  // 配置vuex中的store热更新功能
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './actions/actions',
      './getters/getters'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

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
