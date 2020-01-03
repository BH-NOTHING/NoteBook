<template>
  <div class="note-list">
    <div class="note-header">
      <div class="header-title">
        <h2>记事本</h2>
      </div>
    </div>
    <div class="note-main">
      <div class="note-add">
        <input
          type="text"
          placeholder="添加事项"
          class="note-add-input"
          v-model="todo"
        />
        <button class="note-add-btn" @click="onAdd">添加</button>
      </div>
      <ul class="note-content" v-show="list.length">
        <li class="note-content-tips">{{ noCheckedItem }}个事项未完成</li>
        <li class="note-action">
          <a :class="{ active: visibility === 'all' }" href="#all">所有事项</a>
          <a :class="{ active: visibility === 'unfinished' }" href="#unfinished"
            >未完成事项</a
          >
          <a :class="{ active: visibility === 'finished' }" href="#finished"
            >已完成事项</a
          >
        </li>
      </ul>
      <h3 class="main-title">事项列表：</h3>
      <div class="notes">
        <span class="no-note-tip" v-show="!list.length"
          >还没有添加任何事项</span
        >
        <ul class="todo-list">
          <li
            class="todo"
            v-bind:class="{
              completed: item.isChecked,
              editing: item === editTodos
            }"
            v-for="(item, index) in filteredList"
            :key="index"
          >
            <div class="todo-view">
              <input type="checkbox" class="toggle" v-model="item.isChecked" />
              <label @click="onEdit(item)">{{ item.title }}</label>
              <button class="destroy" @click="onDelete(item)"></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="note-editor" v-if="editTodos.content !== undefined">
      <div class="note-editor-header">
        <button class="note-back" @click="closeEditor" />
      </div>
      <quill-editor
        ref="myQuillEditor"
        v-model="editTodos.content"
        class="edit"
        contenteditable="false"
        @change="onChange($event, editTodos)"
      />
    </div>
  </div>
</template>

<script>
import store from '../utils/store'
import quillEditor from 'vue-quill-editor/src/editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
const list = store.fetch('todolist-class')

export default {
  name: 'notePad',
  components: {
    quillEditor
  },
  props: {},
  data () {
    return {
      list: list,
      todo: '',
      editTodos: {}, // 正在编辑的数据
      lastTodo: {}, // 编辑前的数据
      visibility: 'all' // 通过这个属性值的变化，结合hash对数据进行筛选，默认值是all
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
    window.addEventListener('hashchange', this.onHashChange)
  },
  destroyed () {
    window.removeEventListener('hashchange', this.onHashChange)
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
      return filter[this.visibility] ? filter[this.visibility](list) : list
    }
  },
  methods: {
    onAdd () {
      // 添加事项
      this.list.push({
        title: this.todo.substring(0, 10),
        isChecked: false,
        content: this.todo
      })
      this.todo = ''
    },

    onDelete (todo) {
      let index = this.list.indexOf(todo)
      this.list.splice(index, 1)
    },

    onEdit (todo) {
      this.editTodos = todo
    },

    onEditComplete () {
      this.editTodos = {}
    },
    onChange ({ html, text, quill }, item) {
      item.title = text.substring(0, 10)
    },
    onHashChange () {
      let hash = window.location.hash.slice(1)
      this.visibility = hash
    },
    closeEditor () {
      this.editTodos = {}
    }
  },
  directives: {
    foucs: {
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
@import "../style/note";
</style>
