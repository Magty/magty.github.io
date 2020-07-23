<template>
  <div ref="grid" :class="['ivu-grid',classes]">
    <slot></slot>
  </div>
</template>

<script>
import lodash from 'lodash'
export default {
  name: 'Grid',
  props: {
    col: {
      type: Number,
      default: 3
    },
    square: {
      type: Boolean,
      default: false
    },
    padding: {
      type: String,
      default: '24px'
    },
    center: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resizeCount: 0,
      handleResize: () => {}
    }
  },
  computed: {
    classes: function() {
      return {
        'ivu-grid-center': this.center,
        'ivu-grid-border': this.border,
        'ivu-grid-hover': this.hover
      }
    }
  },
  provide: function() {
    return {
      GridInstance: this
    }
  },
  methods: {
    onResize: function() {
      this.resizeCount++
    }
  },
  mounted: function() {
    this.handleResize = lodash.throttle(this.onResize, 150, { leading: false })

    this.observer.listenTo(this.$refs.grid, this.handleResize)
  },
  beforeDestroy: function() {
    this.observer.removeListener(this.$refs.grid, this.handleResize)
  }
}
</script>

<style lang="scss">
</style>
