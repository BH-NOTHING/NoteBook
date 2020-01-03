<template>
  <div class="note-list">
    <div class="page-top">
      <div class="page-content">
        <h2>记事本</h2>
      </div>
    </div>
    <div class="main">
      <h3 class="txt-title">添加事项：</h3>
      <div class="note-add">
        <input
          type="text"
          placeholder="添加事项"
          class="note-add-input"
          v-model="todo"
        />
        <button class="note-add-btn" @click="addTodo">添加</button>
      </div>
      <ul class="note-content" v-show="list.length">
        <li class="note-content-tips">
          {{noCheckedItem}}个事项未完成
        </li>
        <li class="action">
          <a :class="{active:visibility === 'all'}" href="#all">所有事项</a>
          <a :class="{active:visibility === 'unfinished'}" href="#unfinished">未完成事项</a>
          <a :class="{active:visibility === 'finished'}" href="#finished">已完成事项</a>
        </li>
      </ul>
      <h3 class="txt-title">事项列表：</h3>
      <div class="notes">
        <span class="no-note-tip" v-show="!list.length">还没有添加任何事项</span>
        <ul class="todo-list">
          <li class="todo" v-bind:class="{completed: item.isChecked,editing:item === editTodos}" v-for="(item,index) in filteredList" :key="index">
            <div class="view">
              <input type="checkbox" class="toggle" v-model="item.isChecked">
              <label @click = "onEdit(item)">{{item.title}}</label>
              <button class="destroy" @click="deleteTodo(item)"></button>
            </div>
            <input
              v-foucs="item === editTodos"
              type="text"
              class="edit"
              v-model="item.title"
              @blur="onEditComlish(item)"
              @keyup.enter = "onEditComlish(item)"
              @keyup.esc = "cancelTodo(item)"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../utils/store'

const list = store.fetch('todolist-class')

export default {
  name: 'noteList',
  props: {},
  data () {
    return {
      list: list,
      todo: '',
      editTodos: '', // 正在编辑的数据
      beforeTitle: '', // 记录正在编辑的数据的title
      visibility: 'all'// 通过这个属性值的变化，结合hash对数据进行筛选，默认值是all
    }
  },
  watch: {
    list: {
      handler: function () {
        store.save('todolist-class', this.list)
      },
      deep: true
    }
  },
  mounted () {
    window.addEventListener('hashchange', this.watchHashChange)
  },
  destroyed () {
    window.removeEventListener('hashchange', this.watchHashChange)
  },
  computed: {
    noCheckedItem: function () {
      return this.list.filter(function (item) {
        return item.isChecked === false
      }).length
    },
    filteredList: function () {
      // 按三种情况过滤：all,finished,unfinished
      let filter = {
        all: function () {
          return list
        },
        finished: function () {
          return list.filter(function (item) {
            return item.isChecked
          })
        },
        unfinished: function () {
          return list.filter(function (item) {
            return !item.isChecked
          })
        }
      }
      return filter[this.visibility] ? filter[this.visibility](list) : list// 这里写上(list)才能返回根据数据筛选的值
    }
  },
  methods: {
    addTodo () { // 添加事项
      this.list.push({
        title: this.todo,
        isChecked: false
      })
      this.todo = ''
    },

    deleteTodo (todo) {
      let index = this.list.indexOf(todo)
      this.list.splice(index, 1)
    },

    onEdit (todo) {
      this.beforeTitle = todo.title
      this.editTodos = todo
    },

    onEditComlish (todo) {
      this.editTodos = ''
    },

    cancelTodo (todo) {
      todo.title = this.beforeTitle
      this.onEditComlish(todo)
      this.beforeTitle = ''
    },
    watchHashChange () {
      let hash = window.location.hash.slice(1)
      this.visibility = hash
    }
  },
  directives: {
    'foucs': {
      update (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../style/list";
</style>
