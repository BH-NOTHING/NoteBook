<template>
  <div id="app">
    <NoteEditor/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import NoteEditor from './components/editor'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NoteEditor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
