import axios from 'axios'

const todo = {
  state: {},
  mutations: {},
  actions: {
    async deleteTodo ({ commit }, id) {
      try {
        return await axios.delete(`/todos/${id}`)
      } catch (e) {
        throw new Error(e)
      }
    },

    async createTodo ({ commit }, payload) {
      try {
        return await axios.post('/todos', payload)
      } catch (e) {
        throw new Error(e)
      }
    },

    async getTodoById ({ commit }, id) {
      try {
        return await axios.get(`/todos/${id}`)
      } catch (e) {
        throw new Error(e)
      }
    },

    async updateTodo ({ commit }, payload) {
      try {
        const { id, ...task } = payload
        return await axios.put(`/todos/${id}`, task)
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}

export default todo
