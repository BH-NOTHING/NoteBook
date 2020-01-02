import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {id: 1, text: 'aaaaaaa', done: true},
      {id: 2, text: 'bbbbbbb', done: false}
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {
    addTodo (state, todo) {
      state.todos.push(todo)
    }
  },
  actions: {

  }

})
