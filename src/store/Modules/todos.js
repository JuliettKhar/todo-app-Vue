import axios from 'axios'

const todos = {
  state: {
    todos: []
  },
  mutations: {
    SET_TODOS (state, todos) {
      state.todos = todos
    }
  },
  actions: {
    async getTodos ({ commit }) {
      try {
        const { data } = await axios.get('/todos')
        commit('SET_TODOS', data)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

export default todos
