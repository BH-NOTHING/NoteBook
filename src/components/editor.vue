<template>
    <quill-editor
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      :disabled="!disabled"
      contenteditable="false"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"/>
</template>

<script>
import quillEditor from 'vue-quill-editor/src/editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'noteEditor',
  components: {
    quillEditor
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    headColor: String,
    bodyColor: String,
    disabled: {
      default: true,
      type: Boolean
    },
    contentHtml: null,
    version: {
      type: Boolean,
      default: false
    },
    setContent: String,
    borderWidth: {
      type: Number,
      default: 1
    },
    borderColor: {
      type: String,
      default: '#CCCCCC'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
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
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  created () {
  },
  updated () {
    // this.updateStyle();
  },
  mounted () {
  },
  methods: {
    onEditorBlur (quill) {
      this.$emit('blur', {})
    },
    onEditorFocus (quill) {
      this.$emit('focus', {})
    },
    onEditorReady (quill) {
      this.$emit('ready', {})
    },
    onEditorChange ({ quill, html, text }) {
      this.$emit('valueChange', {
        contentHtml: JSON.stringify(quill.getContents().ops)
      })
    },
    onEditorMouseover (e) {
      this.$emit('mouseover', {})
    },
    onEditorMouseout (e) {
      this.$emit('mouseout', {})
    }
  }
}
</script>
<style lang="scss">
  #app {
    width: 100%;
  }
</style>
