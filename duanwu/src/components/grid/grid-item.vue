<template>
  <div ref="col" class="ivu-grid-item" :style="styles">
    <div class="ivu-grid-item-main" :style="mainStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getStyle } from '@/utils/assist'
export default {
  name: 'GridItem',
  inject: ['GridInstance'],
  data() {
    return {
      height: 0
    }
  },
  computed: {
    col: function() {
      return this.GridInstance.col
    },
    square: function() {
      return this.GridInstance.square
    },
    styles: function() {
      const style = { width: 100 / this.col + '%' }
      if (this.height && this.square) {
        style.height = this.height + 'px'
      }
      return style
    },
    mainStyles: function() {
      return { padding: this.GridInstance.padding }
    }
  },
  watch: {
    col: function() {
      this.$nextTick(() => {
        this.handleChangeHeight()
      })
    },
    square: function() {
      this.handleChangeHeight()
    },
    'GridInstance.resizeCount': function() {
      this.handleChangeHeight()
    }
  },
  methods: {
    handleChangeHeight: function() {
      if (this.square) {
        this.height = parseFloat(getStyle(this.$refs.col, 'width'))
      }
    }
  },
  mounted: function() {
    this.handleChangeHeight()
  }
}
</script>

<style lang="scss">
</style>
