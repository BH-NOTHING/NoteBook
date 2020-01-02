<template>
  <button @click="addTodo">添加</button>
</template>

<script>

export default {
  name: 'noteList',
  components: {},
  props: {},
  data () {
    return {
      content: '',
      editorOption: {
        theme: 'snow'
      },
      code: false,
      name: 'editor',
      reset: false
    }
  },
  computed: {

  },
  created () {
  },
  updated () {
    // this.updateStyle();
  },
  mounted () {
  },
  methods: {
    addTodo () {
      this.$store.commit({
        type: 'addTodo',
        todo: {id: 2, text: 'bbbbbbb', done: false}
      })
      console.log(this.$store.state.todos)
    }
  }
}
</script>
<style lang="scss">
</style>
