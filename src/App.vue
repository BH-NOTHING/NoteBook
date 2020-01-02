<template>
  <div id="app">
    <!--<NoteEditor/>-->
    <NoteList/>
  </div>
</template>

<script>
import Vue from 'vue'
import NoteEditor from './components/editor'
import NoteList from './components/list'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {VueHammer} from 'vue2-hammer'

Vue.use(ElementUI)
Vue.use(VueHammer)

export default {
  name: 'App',
  store,
  components: {
    NoteEditor,
    NoteList
  }
}
</script>

<style lang="sass">
@import "./style/default.scss"
</style>
