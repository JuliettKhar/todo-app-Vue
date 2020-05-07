import Vue from 'vue'
import Vuex from 'vuex'
import todos from './Modules/todos'
import todo from './Modules/todo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    todos,
    todo
  }
})
