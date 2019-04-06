<template>
  <div class="helper">
    <span class="left">{{unFinishedTodoLength}}个待办项</span>
    <span class="tabs">
      <span
        v-for="state in states"
        v-bind:key="state"
        :class="[state,filter === state ? 'actived' : '']"
        @click="toggleFilter(state)"
      >
        {{showText(state)}}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">清除已完成任务</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['all','active','completed']
    }
  },
  computed: {
    unFinishedTodoLength() {
      return this.todos.filter(todo => !todo.completed).length
    },
  },
  methods: {
    clearAllCompleted() {
      this.$emit('clearAllCompleted')
    },
    toggleFilter(state) {
      this.$emit('toggle', state)
    },
    showText(state) {
      switch (state) {
        case 'all':
          return "全部"
        case 'active':
          return "未完成"
        case 'completed':
          return "已完成"
        default:
          break;
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper{
  font-weight 100
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing: antialiased
}
.left, .clear, .tabs{
  padding 0 10px
  box-sizing border-box
}
.left, .clear{
  width 150px
}
.left{
  text-align left
}
.clear{
  text-align right
  cursor pointer
}
.tabs{
  width 200px
  display flex
  justify-content space-around
  * {
    display inline-block
    padding 0 10px
    cursor pointer
    border 1px solid rgba(175,47,47,0)
    &.actived{
      border-color rgba(175,47,47,0.4)
      border-radius 5px
    }
  }
}
</style>
