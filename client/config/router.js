import Router from 'vue-router'
import routes from './routes.js'

export default () => {
  return new Router({
    routes,
    mode: 'history', // 配置路由无hash，后端渲染利于seo
    // base: '/base/' // 路径
    linkActiveClass: 'active-link', // 路由被激活时的类
    linkExactActiveClass: 'exact-active-link', // 路由被激活时完全匹配的类
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition // 将浏览过的位置保存后，如果存在则返回值原来浏览过的位置
      } else {
        return { x: 0, y: 0 } // 如果没有会在当前路由页面最上方
      }
    }
    // fallback: false
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
  })
}
