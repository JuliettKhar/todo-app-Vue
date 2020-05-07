<template>
  <div class="container">
    <!-- Cancel Edit Button -->
    <a href="#" class="button is-link is-light button__edit" v-show="isEdit && !isSaved"
       @click.prevent="cancelEditModal = true">
      <font-awesome-icon icon="arrow-alt-circle-left"/>
      <span>Cancel edit</span>
    </a>
    <a href="#" class="button is-link is-light button__edit" v-show="isEdit && isSaved"
       @click.prevent="cancelEditModal = true">
      <font-awesome-icon icon="arrow-alt-circle-left"/>
      <span>Back</span>
    </a>

    <form action="#">
      <template v-if="isCreate">
        <CreateTodo :controls="formControls"/>
      </template>

      <template v-if="isEdit">
        <div class="field">
          <h1 class="label">Title</h1>
          <input class="input" type="text" placeholder="Enter Todo title" v-model="formControls.title">
        </div>
        <div class="field field__row" v-for="(row, index) in formControls.tasks" :key="index">
          <h2>Task</h2>
          <input type="checkbox" class="custom-checkbox" :id="index" v-model="formControls.tasks[index].completed">
          <label class="checkbox" :for="index"></label>
          <label class="label label__task">
            <input class="input" type="text" placeholder="Enter task to do" v-model="formControls.tasks[index].task">
          </label>
          <div class="button is-light is-danger button__delete" @click.prevent="deleteRow(index)">
            <font-awesome-icon icon="minus" size="xs"/>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <a href="#" class="button is-light is-fullwidth button__add" @click.prevent="addRow">
              <font-awesome-icon icon="plus"/>
              <span>Add row</span>
            </a>
          </div>
        </div>

        <!-- Form buttons -->
        <div class="columns">
          <div class="column">
            <button v-show="isSaved" class="button is-danger is-light is-fullwidth" @click.prevent="cancelChanges">
              <font-awesome-icon icon="times"/>
              <span>Cancel changes</span>
            </button>
            <button v-show="!isSaved" class="button is-danger is-light is-fullwidth" @click.prevent="handleDelete">
              <font-awesome-icon icon="trash"/>
              <span>Delete</span>
            </button>
          </div>
          <div class="column">
            <button v-show="!isSaved" class="button is-primary is-light is-fullwidth" @click.prevent="updateTodo">
              <font-awesome-icon icon="check"/>
              <span>Save</span>
            </button>
            <button v-show="isSaved" class="button is-warning is-light is-fullwidth" @click.prevent="revertChanges">
              <font-awesome-icon icon="sync-alt"/>
              <span>Revert changes</span>
            </button>
          </div>
          <div class="column" v-show="isSaved">
            <router-link to="/" v-show="isSaved" class="button is-primary is-light is-fullwidth">
              <font-awesome-icon icon="check"/>
              <span>Complete</span>
            </router-link>
          </div>
        </div>
      </template>
    </form>

    <!-- Cancel Edit Modal -->
    <Modal :isOpen.sync="cancelEditModal" @cancel="cancelEditModal = false" @confirm="$router.push('/')">
      <template #title>Cancel edit</template>
      <p>Are you sure, to exit without save?</p>
    </Modal>

    <!-- Modal for delete todo -->
    <Modal :isOpen.sync="deleteTodoModal" @cancel="deleteTodoModal = false" @confirm="deleteTodo">
      <template #title>Delete</template>
      <p>Are you sure, to delete todo?</p>
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/Modal'
import CreateTodo from '../components/CreateTodo'

export default {
  name: 'EditTodo',
  data () {
    return {
      formControls: {
        title: null,
        tasks: [
          {
            task: '',
            completed: false
          }
        ]
      },
      cancelEditModal: false,
      deleteTodoModal: false,
      isSaved: false
    }
  },
  components: {
    Modal,
    CreateTodo
  },
  computed: {
    isEdit () {
      const { path } = this.$route
      return path.includes('edit')
    },

    isCreate () {
      const { path } = this.$route
      return path.includes('create')
    }
  },
  methods: {
    async updateTodo () {
      const { id } = this.$route.params
      const payload = {
        id,
        ...this.formControls
      }
      await this.$store.dispatch('updateTodo', payload)
      this.saveAddedRows()
      this.isSaved = true
    },

    handleDelete () {
      this.deleteTodoModal = true
    },

    async deleteTodo () {
      const { id } = this.$route.params
      await this.$store.dispatch('deleteTodo', id)
      this.deleteTodoModal = false
      this.$router.push({ name: 'Home' })
    },

    addRow () {
      this.formControls.tasks.push({
        task: '',
        complited: false
      })
    },

    saveAddedRows () {
      const serialTasks = JSON.stringify(this.formControls.tasks)
      localStorage.setItem('tasks', serialTasks)
    },

    getAddedRows () {
      if (localStorage.getItem('tasks')) {
        this.formControls.tasks = JSON.parse(localStorage.getItem('tasks'))
      }
    },

    deleteRow (index) {
      this.formControls.tasks.splice(index, 1)
      this.saveAddedRows()
    },

    cancelChanges () {
      this.formControls.tasks = []
    },

    revertChanges () {
      this.getAddedRows()
      this.isSaved = false
    },

    async getTodoById () {
      const { id } = this.$route.params
      const { data } = await this.$store.dispatch('getTodoById', id)
      this.formControls = data
    }
  },
  created () {
    if (this.$route.path.includes('edit')) {
      this.getTodoById()
    }
  },
  destroyed () {
    localStorage.removeItem('tasks')
  }
}
</script>

<style scoped lang="scss">
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 20px;
    min-width: 320px;
    border: 1px solid lightgray;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    z-index: -0;
  }

  span {
    margin-left: 6px;
  }

  .field {
    text-align: left;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .button {
    &__edit {
      position: absolute;
      top: 10px;
      left: 10px;
    }

    &__add {
      margin-top: 15px;
    }

    &__delete {
      width: 20px;
      height: 32px;
    }
  }

  .field {
    &__row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      h2 {
        width: 100%;
      }
    }
  }

  .custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .custom-checkbox + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }

  .custom-checkbox + label::before {
    content: '';
    display: inline-block;
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #adb5bd;
    border-radius: 0.25em;
    margin-right: 0.5em;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }

  .custom-checkbox:checked + label::before {
    border-color: #00d1b2;
    background-color: #00d1b2;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

  .label {
    &__task {
      max-width: 73%;
      width: 73%;
      margin-right: 10px;
    }
  }

  .container {
    position: relative;
    height: 100vh;
  }
</style>
