<template>
  <div id="app">
    <NoteBook/>
  </div>
</template>

<script>
import NoteBook from './components/NoteBook'

export default {
  name: 'App',
  components: {
    NoteBook
  }
}
</script>

<style lang="sass">
@import "./style/index.scss"
</style>
