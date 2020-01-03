<template>
  <div id="app">
    <NotePad/>
  </div>
</template>

<script>
import NotePad from './components/note'

export default {
  name: 'App',
  components: {
    NotePad
  }
}
</script>

<style lang="sass">
@import "./style/default.scss"
</style>
