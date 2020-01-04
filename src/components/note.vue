<template>
  <div class="note-book">
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
        <button class="note-add-btn" @click="onAddNote">添加</button>
      </div>
      <ul class="note-content" v-show="noteList.length">
        <li class="note-content-tips">还有{{ unFinishItem }}个事项未完成</li>
        <li class="note-action">
          <a v-for="option in visibleOptions"
             :class="{active: visibility === option.name}"
             :href="'#' + option.name"
             :key="option.name">{{option.content}}</a>
        </li>
      </ul>
      <h3 class="main-title">事项列表：</h3>
      <div class="notes">
        <span class="no-note-tip" v-show="!noteList.length"
          >还没有添加任何事项</span
        >
        <ul class="note-list">
          <li
            v-for="(item) in filteredList()"
            :class="{
              completed: item.isChecked,
              editing: item === editNotes
            }"
            :key="item.time"
          >
            <div class="note-view">
              <input type="checkbox" class="toggle" v-model="item.isChecked" />
              <label @click="onOpenEditor(item)">{{ item.title }}</label>
              <span class="note-time">{{item.time}}</span>
              <button class="destroy" @click="onDelNote(item)"></button>
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

const list = store.fetch('noteStore') // 从缓存中读取历史记录

export default {
  name: 'notePad',
  components: {
    quillEditor
  },
  props: {},
  data () {
    return {
      noteList: list, // 当前事项列表
      newNote: '', // 添加事项的内容
      editNotes: {}, // 正在编辑的数据
      visibility: window.location.hash.slice(1) || 'all', // 通过visibility变化，结合hash对数据进行筛选，默认值是all
      visibleOptions: [{
        name: 'all',
        content: '全部'
      }, {
        name: 'unfinished',
        content: '未完成'
      }, {
        name: 'finished',
        content: '已完成'
      }]
    }
  },
  watch: {
    noteList: {
      // 监听noteList变化，写入缓存
      handler: function () {
        store.save('noteStore', this.noteList)
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
    unFinishItem: function () {
      // 未完成事项个数
      return this.noteList.filter(function (item) {
        return item.isChecked === false
      }).length
    }
  },
  methods: {
    onAddNote () {
      // 添加事项
      this.noteList.push({
        title: getTitle(this.newNote),
        isChecked: false,
        content: this.newNote,
        time: getNowFormatDate()
      })
      this.newNote = ''
    },

    onDelNote (note) {
      // 删除事项
      let index = this.noteList.indexOf(note)
      this.noteList.splice(index, 1)
    },

    onOpenEditor (note) {
      // 打开编辑器
      this.editNotes = note
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
    },
    filteredList () {
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
      return result || []
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../style/note";
</style>
