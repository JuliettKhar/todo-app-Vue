<template>
  <div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <h1 class="label">Title</h1>
          <label>
            <input class="input" type="text" placeholder="Enter Todo title" v-model="controls.title">
          </label>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <router-link to="/" class="button is-light is-danger is-fullwidth">
          <font-awesome-icon icon="times"/>
          <span>Cancel</span>
        </router-link>
      </div>
      <div class="column">
        <button class="button is-light is-primary is-fullwidth" @click.prevent="createNewTodo">
          <font-awesome-icon icon="check"/>
          <span>Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateTodo',
  props: {
    controls: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions(['createTodo']),
    async createNewTodo () {
      const { title } = this.controls
      const { data } = await this.createTodo({ title })
      this.$router.push({ name: 'EditTodo', params: { id: data.id, task: data } })
    }
  }
}
</script>

<style scoped lang="scss">
  form {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 20px;
    min-width: 320px;
    border: 1px solid lightgray;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    z-index: -1;
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
</style>
