<template>
  <div id="app">
    <NoteEditor/>
  </div>
</template>

<script>
import NoteEditor from './components/editor'

export default {
  name: 'App',
  components: {
    NoteEditor
  }
}
</script>

<style lang="sass">
@import "./style/default.scss"
</style>
