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
          v-model="newNote"
        />
        <button class="note-add-btn" @click="onAdd">添加</button>
      </div>
      <ul class="note-content" v-show="noteList.length">
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
        <span class="no-note-tip" v-show="!noteList.length"
          >还没有添加任何事项</span
        >
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: item.isChecked,
              editing: item === editNotes
            }"
            v-for="(item) in filteredList"
            :key="item.time"
          >
            <div class="todo-view">
              <input type="checkbox" class="toggle" v-model="item.isChecked" />
              <label @click="onOpenEditor(item)">{{ item.title }}</label>
              <span class="note-time">{{item.time}}</span>
              <button class="destroy" @click="onDelete(item)"></button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="note-editor" v-if="editNotes.content !== undefined">
      <div class="note-editor-header">
        <button class="note-back" @click="closeEditor" />
      </div>
      <quill-editor
        ref="myQuillEditor"
        v-model="editNotes.content"
        class="edit"
        contenteditable="false"
        @change="onInput"
      />
    </div>
  </div>
</template>

<script>
import { store, getTitle, getNowFormatDate } from '../utils/utils'
import quillEditor from 'vue-quill-editor/src/editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const list = store.fetch('todolist-class')

export default {
  name: 'notePad',
  components: {
    quillEditor
  },
  props: {},
  data () {
    return {
      noteList: list,
      newNote: '',
      editNotes: {}, // 正在编辑的数据
      visibility: 'all' // 通过这个属性值的变化，结合hash对数据进行筛选，默认值是all
    }
  },
  watch: {
    noteList: {
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
      return this.noteList.filter(function (item) {
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
      let result = filter[this.visibility] ? filter[this.visibility](list) : list
      console.log(result)
      return result || []
    }
  },
  methods: {
    onAdd () {
      // 添加事项
      this.noteList.push({
        title: getTitle(this.newNote),
        isChecked: false,
        content: this.newNote,
        time: getNowFormatDate()
      })
      this.newNote = ''
    },

    onDelete (todo) {
      // 删除事项
      let index = this.noteList.indexOf(todo)
      this.noteList.splice(index, 1)
    },

    onOpenEditor (todo) {
      // 打开编辑器
      this.editNotes = todo
    },
    onInput ({ html, text, quill }) {
      // 输入改变
      this.editNotes.title = getTitle(text)
      this.editNotes.time = getNowFormatDate()
    },
    onHashChange () {
      // hash地址改变
      let hash = window.location.hash.slice(1)
      this.visibility = hash
    },
    closeEditor () {
      // 关闭编辑器
      this.editNotes = {}
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/note";
</style>
