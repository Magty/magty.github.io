<template>
  <div ref="col" class="ivu-grid-item" :style="styles">
    <div class="ivu-grid-item-main" :style="mainStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
        style.height = String(this.height) + 'px'
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
        this.height = parseFloat(this.$refs.col.$el.clintWidth)
      }
    }
  },
  mounted: function() {
    this.handleChangeHeight()
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
