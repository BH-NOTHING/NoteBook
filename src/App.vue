<template>
  <div id="app">
    <!--<NoteEditor/>-->
    <NoteList/>
  </div>
</template>

<script>
import NoteEditor from './components/editor'
import NoteList from './components/list'
import store from './store/index'

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
