<template>
  <div id="app">
    <div id="cover">
      <Header></Header>
      <div>{{fullName}}{{count}}</div>
      <!-- <div>{{textA}}</div> -->
      <router-link to="/app">app</router-link>
      <router-link to="/login">login</router-link>
      <!-- <Todo></Todo> -->
      <transition name="fade">
        <router-view />
      </transition>
      <Footer></Footer>
      <!-- <router-view name="a"/> -->
    </div>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    // Todo,
    Footer
  },
  mounted () {
    // let i = 1
    // this.$store.dispatch('updateCountASync', {
    //   num: 5,
    //   time: 2000
    // })
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // this.updateText('3222222222')
    // setInterval(() => {
    //   this.$store.commit('updateCount', {
    //     num: i++,
    //     num2: 2
    //   }) // 触发mutations中的updateCount事件
    // }, 1000)
    // setInterval(() => {
    //   this.updateCount('updateCount', {
    //     num: i++,
    //     num2: 2
    //   }) // 触发mutations中的updateCount事件
    // }, 1000)
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount', 'updateText'])
  },
  computed: {
    // textA () {
    //   return this.$store.state.a.text // 调用store中a模块
    // },
    ...mapState({
      count: (state) => state.count
      // textA: (state) => state.a.text // 调用store中a模块
    }),
    count () {
      // return this.$store.state.count
    },
    ...mapGetters(['fullName'])
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>

<style lang="stylus" scoped>
// #app{
//   position absolute
//   left 0
//   right 0
//   top 0
//   bottom 0
// }
</style>
