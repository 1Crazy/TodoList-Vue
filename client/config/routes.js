// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    // props: (route) => ({
    //   id: route.query.b
    // }),
    // component: Todo,
    component: () => import('../views/todo/todo.vue'), // 异步路由,使得首屏加载速度更快
    // components: {
    //   default: Todo,
    //   a: Login
    // },路由命名
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app'
    },
    // 路由钩子，进入路由前才会被调用 在beforeEach和beforeResolve之间
    beforeEnter (to, form, next) {
      console.log('app route before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
