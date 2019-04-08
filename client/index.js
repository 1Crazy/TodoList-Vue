import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import createRouter from './config/router'

import './assets/styles/global.styl'
import './assets/images/bg.jpg'

Vue.use(VueRouter)

const router = createRouter()

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
  render: (h) => h(App)
}).$mount('#root')
