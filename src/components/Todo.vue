<template>
  <div class="tile is-4 is-parent">
    <article class="tile is-child box notification is-primary">
      <h1 class="title">Todo:</h1>
      <h2 class="title is-4">{{todo.title}}</h2>
      <ol>
        <li v-for="(task, index ) in todo.tasks" :key="index">
          {{task.task}}
        </li>
      </ol>
      <div class="tile-footer">
        <router-link :to="{ name: 'EditTodo', params: {id: todo.id} }" class="button">
          <font-awesome-icon icon="pencil-alt"/>
        </router-link>
        <a href="#" class="button" @click.prevent="deleteTodoModal = true">
          <font-awesome-icon icon="times"/>
        </a>
      </div>
    </article>

    <!-- Delete Todo Modal -->
    <Modal :isOpen.sync="deleteTodoModal" @cancel="deleteTodoModal = false" @confirm="deleteTodoFromList(todo.id)">
      <template #title>Cancel edit</template>
      <p>Are you sure, to delete todo?</p>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal'
import { mapActions } from 'vuex'

export default {
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isOpen: false,
      deleteTodoModal: false
    }
  },
  components: {
    Modal
  },
  methods: {
    ...mapActions([
      'deleteTodo',
      'getTodos'
    ]),
    async deleteTodoFromList (id) {
      await this.deleteTodo(id)
      await this.getTodos()
      this.deleteTodoModal = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .button {
    margin-right: 10px;
    background-color: transparent;

    &:last-child {
      margin-right: 0;
    }
  }

  .tile {
    position: relative;

    &-footer {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  article {
    padding-bottom: 70px;
  }

  li {
    list-style-type: none;

    &:before {
      counter-increment: list;
      content: counter(list) ". ";
    }
  }

  ol {
    width: fit-content;
    text-align: left;
    counter-reset: list 0;
  }
</style>
