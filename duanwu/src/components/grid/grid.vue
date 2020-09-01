<template>
  <div ref="grid" :class="['ivu-grid',classes]">
    <slot></slot>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
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
    this.observer = elementResizeDetectorMaker()
    this.observer.listenTo(this.$refs.grid, this.handleResize)
  },
  beforeDestroy: function() {
    this.observer.removeListener(this.$refs.grid, this.handleResize)
  }
}
</script>

<style lang="scss">
.ivu-grid {
  &:after {
    content: '';
    display: block;
    clear: both;
  }
  &-item {
    position: relative;
    float: left;
    width: 33.33%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 0;
    border-radius: 0;
    -webkit-transition: -webkit-box-shadow 0.2s ease-in-out;
    transition: -webkit-box-shadow 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out;
    transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
    &-main {
      padding: 24px;
    }
  }
}
</style>
