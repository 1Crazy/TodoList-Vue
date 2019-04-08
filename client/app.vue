<template>
  <div id="app">
    <div id="cover">
      <Header></Header>
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
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    // Todo,
    Footer
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
