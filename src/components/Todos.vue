<template>
  <div class="tile is-ancestor">
    <Todo v-for="todo in todos.todos" :key="todo.id" :todo="todo"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Todo from './Todo'

export default {
  name: 'Todos',
  components: {
    Todo
  },
  methods: {},
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  mounted () {
    this.$store.dispatch('getTodos')
  }
}
</script>

<style lang="scss" scoped>
  .tile {
    flex-wrap: wrap;
  }

</style>
