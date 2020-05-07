<template>
  <div class="container">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="{ name: 'CreateTodo' }" class="button is-light is-primary">
              <font-awesome-icon icon="plus"/>
              <strong>Add todo</strong>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <Todos/>
  </div>
</template>

<script>
import Todos from '@/components/Todos.vue'

export default {
  name: 'Home',
  components: {
    Todos
  }
}
</script>

<style lang="scss" scoped>
nav {
  padding: 30px 0;
}

.navbar {
  &-brand {
    width: 100%;
    justify-content: flex-end;
  }
}

strong {
  margin-left: 10px;
}
</style>
