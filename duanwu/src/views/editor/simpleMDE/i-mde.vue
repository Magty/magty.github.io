<template>
  <div class="i-mde" :class="classes">
    <textarea ref="mde"></textarea>
  </div>
</template>

<script>
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'
export default {
  name: 'i-mde',
  props: {
    value: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      mde: null,
      defaultConfig: {}
    }
  },
  computed: {
    classes() {
      return {
        'i-mde-no-border': !this.border
      }
    }
  },
  methods: {
    init() {
      const config = Object.assign({}, this.defaultConfig, this.config)
      this.mde = new SimpleMDE({
        ...config,
        initialValue: this.value,
        element: this.$refs.mde
      })
      this.mde.codemirror.on('change', () => {
        this.$emit('input', this.mde.value())
        this.$emit('on-change', this.mde.value())
      })
    },
    add(text) {
      this.mde && this.mde.value(this.value + text)
    },
    replace(text) {
      this.mde && this.mde.value(text)
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.mde = null
  }
}
</script>

<style>
</style>
