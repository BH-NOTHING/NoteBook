import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [
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
      state.list.push({
        title: todo,
        isChecked: false
      })
    },
    deleteTodo (state, todo) { // 删除事项
      let index = state.list.indexOf(todo)
      state.list.splice(index, 1)
    }
  },
  actions: {

  }

})
