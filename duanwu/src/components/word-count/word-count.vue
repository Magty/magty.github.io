<template>
  <div class="ivu-word-count">
    <i-circle v-if="circle" :percent="percent" :size="size" :stroke-color="strokeColor"></i-circle>
    <template v-else>
      <span v-if="isOverflow" class="ivu-word-count-prefix ivu-word-count-overflow"></span>
      <span v-else class="ivu-word-count-prefix"></span>
      <span v-if="isOverflow && overflow" class="ivu-word-count-overflow">{{ value.length - total }}</span>
      <span v-else :class="{'ivu-word-count-overflow': isOverflow}">{{value.length}}</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'WordCount',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    total: {
      type: Number,
      default: 0
    },
    hideTotal: {
      type: Boolean,
      default: false
    },
    overflow: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      type: [String, Number],
      default: 14
    }
  },
  computed: {
    isOverflow: function() {
      return this.value.length > this.total
    },
    percent: function() {
      let e = (this.value.length / this.total) * 100
      e = e > 100 ? 100 : e
      return e
    },
    strokeColor: function() {
      return this.isOverflow ? '#ed4014' : '#2d8cf0'
    }
  }
}
</script>

<style>
</style>
