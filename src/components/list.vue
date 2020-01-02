<template>
  <div class="note-list">
    <div class="page-top">
      <div class="page-content">
        <h2>记事本</h2>
      </div>
    </div>
    <div class="main">
      <h3 class="big-title">添加事项：</h3>
      <div class="task-add">
        <input
          type="text"
          placehoder="例如：吃饭睡觉打豆豆；提示：+回车即可添加任务"
          class="task-add-input"
          v-model="todo"
        />
        <button class="task-add-btn" @click="addTodo">添加</button>
      </div>
      <ul class="task-content" v-show="list.length">
        <li class="task-content-tips">
          {{noCheckedItem}}个事项未完成
        </li>
        <li class="action">
          <a :class="{active:visibility === 'all'}" href="#all">所有事项</a>
          <a :class="{active:visibility === 'unfinished'}" href="#unfinished">未完成事项</a>
          <a :class="{active:visibility === 'finished'}" href="#finished">已完成事项</a>
        </li>
      </ul>
      <h3 class="big-title">事项列表：</h3>
      <div class="tasks">
        <span class="no-task-tip" v-show="!list.length">还没有添加任何事项</span>
        <ul class="todo-list">
          <li class="todo" v-bind:class="{completed: item.isChecked,editing:item === editorTodos}" v-for="(item,index) in filteredList" :key="index">
            <div class="view">
              <input type="checkbox" class="toggle" v-model="item.isChecked">
              <!--<el-checkbox v-model="item.isChecked"></el-checkbox>-->
              <label @click = "editorTodo(item)">{{item.title}}</label>
              <button class="destroy" @click="deleteTodo(item)"></button>
            </div>
            <input
              v-foucs="item === editorTodos"
              type="text"
              class="edit"
              v-model="item.title"
              @blur="editorTodoed(item)"
              @keyup.enter = "editorTodoed(item)"
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
      editorTodos: '', // 记录正在编辑的数据
      beforeTitle: '', // 记录正在编辑的数据的title
      visibility: 'all'// 通过这个属性值的变化，结合hash对数据进行筛选，默认值是all
    }
  },
  watch: {
    /* list:function(){//监控list这个属性，当这个属性对应的值发生变化就会执行函数
        store.save("todolist-class",this.list);//浅监控，监控不到list里面各个对象中属性的变化
    } */

    list: {// 这里list是个对象
      handler: function () {
        store.save('todolist-class', this.list)
      },
      deep: true // 深度监控
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
    filteredList: function () { // 根据vm的visibility属性来过滤数据
      // 按三种情况过滤：all,finished,unfinished
      var filter = {
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
      }// end filter
      // 考虑到手工改动url栏里hash值的情况，这里加入了判断：找到了过滤函数，就返回过滤后的数据，否则返回所有的数据
      return filter[this.visibility] ? filter[this.visibility](list) : list// 这里写上(list)才能返回根据数据筛选的值
    }
  },
  methods: {
    addTodo () { // 添加事项
      /* {
          title:
      } */
      this.list.push({// 往数组里添加事项，格式是个对象
        title: this.todo, // 事件处理函数中的this指向的是，当前这个根实例，即new Vue
        isChecked: false
      })
      this.todo = ''
    },

    deleteTodo (todo) { // 删除事项
      var index = this.list.indexOf(todo)
      this.list.splice(index, 1)
    },

    editorTodo (todo) { // 编辑事项
      // 编辑事项的时候，记录一下编辑这条事项的title，方便在取消编辑的时候还能用到原来的title，写在数据中：beforeTitle

      this.beforeTitle = todo.title
      this.editorTodos = todo
    },

    editorTodoed (todo) { // 编辑完成后失去焦点
      this.editorTodos = ''
    },

    cancelTodo (todo) { // 取消编辑
      todo.title = this.beforeTitle
      this.editorTodoed(todo)
      this.beforeTitle = ''// 之前记录的值已经没用了，重新设为空
    },
    watchHashChange () {
      var hash = window.location.hash.slice(1)// 去掉#号
      this.visibility = hash// 拿到去了#的hash值后改变实例的visibility属性值
    }
  }, // end methods
  directives: {// 自定义指令
    'foucs': {
      update (el, binding) { // 钩子函数
        // console.log(el);
        // console.log(binding);
        if (binding.value) {
          el.focus()
        }
      }
    }// end focus
  }// end directives
}
</script>
<style lang="scss" scoped>
  @import "../style/list";
</style>
