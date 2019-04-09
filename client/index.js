import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import createRouter from './config/router'
import createStore from './store/store'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import './assets/images/bg.jpg'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// 注册新的模块,动态加载模块
// store.registerModule('c', {
//   state: {
//     text: 3
//   }
// })

// 解绑c模块
// store.unregisterModule('c')

// store.watch((state) => state.count + 1, () => {
//   console.log(3)
// })

// 监听mutation
// store.subscribe((mutation, state) => {
//   console.log(mutation.type) // mutation
//   console.log(mutation.payload) // 值
// })

// 监听action
// store.subscribeAction((action, state) => {
//   console.log(action.type) // action
//   console.log(action.payload) // 值
// })

// 全局导航守卫，每次路由跳转都会触发

// beforeEach内可做登陆验证
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // if (to.fullPath === '/app') {
  //   // next('/login')
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
})
// beforeEach执行完以后执行路由中的钩子，执行完后执行组件内部的钩子，在beforeResolve
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
