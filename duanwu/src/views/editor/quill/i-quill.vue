<template>
  <div :class="['i-quill',classes]">
    <div ref="editor" :style="styles"></div>
  </div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
export default {
  name: 'i-quill',
  props: {
    value: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number
    },
    minHeight: {
      type: Number
    }
  },
  data() {
    return {
      Quill: null,
      currentValue: '',
      options: {
        theme: 'snow',
        bounds: document.body,
        debug: 'warn',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [
              {
                header: [1, 2, 3, 4, 5, 6, false]
              }
            ],
            [
              {
                size: ['small', false, 'large', 'huge']
              }
            ],
            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            ['blockquote', 'code-block'],
            [
              {
                list: 'ordered'
              },
              {
                list: 'bullet'
              }
            ],
            [
              {
                indent: '-1'
              },
              {
                indent: '+1'
              }
            ],
            [
              {
                align: []
              }
            ],
            [
              {
                direction: 'rtl'
              }
            ],
            ['clean'],
            ['link', 'image']
          ]
        },
        placeholder: '内容...',
        readOnly: false
      }
    }
  },
  computed: {
    classes() {
      return [
        {
          'i-quill-no-border': !this.border
        }
      ]
    },
    styles() {
      const styles = {}
      if (this.minHeight) {
        styles.minHeight = ''.concat(this.minHeight, 'px')
      }
      if (this.height) {
        styles.height = ''.concat(this.height, 'px')
      }
      return styles
    }
  },
  watch: {
    value: {
      handler(newValue) {
        if (newValue !== this.currentValue) {
          this.currentValue = newValue
          if (this.Quill) {
            this.Quill.pasteHTML(this.value)
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    init() {
      const editor = this.$refs.editor
      this.Quill = new Quill(editor, this.options)
      this.Quill.pasteHTML(this.currentValue)
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        const html = this.$refs.editor.children[0].innerHTML
        const text = this.Quill.getText()
        this.currentValue = html
        this.$emit('input', html)
        this.$emit('on-change', {
          html,
          text,
          quill: this.Quill
        })
      })
      this.Quill.on('text-change', (delta, oldDelta, source) => {
        this.$emit('on-text-change', delta, oldDelta, source)
      })
      this.Quill.on('selection-change', (range, oldRange, source) => {
        this.$emit('on-selection-change', range, oldRange, source)
      })
      this.Quill.on('editor-change', (eventName, ...args) => {
        this.$emit.apply(this, ['on-editor-change', eventName].concat(args))
      })
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.Quill = null
  }
}
</script>

<style>
</style>
