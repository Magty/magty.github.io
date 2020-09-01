<template>
  <div class="ivu-trend" :class="classes">
    <span class="ivu-trend-text"></span>
    <Icon class="ivu-trend-flag" :type="flagType"></Icon>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist'
export default {
  name: 'Trend',
  props: {
    flag: {
      validator: function(value) {
        return oneOf(value, ['up', 'down'])
      }
    },
    colorful: {
      type: Boolean,
      default: true
    },
    reverseColor: {
      type: Boolean,
      default: false
    },
    textColor: {
      type: Boolean,
      default: false
    },
    showTitle: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    classes: function() {
      return {
        'ivu-trend-up': this.flag === 'up',
        'ivu-trend-down': this.flag === 'down',
        'ivu-trend-reverse-color': this.reverseColor,
        'ivu-trend-colorful': this.colorful,
        'ivu-trend-text-color': this.textColor
      }
    },
    flagType: function() {
      return this.flag === 'up'
        ? 'md-arrow-dropup'
        : this.flag === 'down'
        ? 'md-arrow-dropdown'
        : ''
    }
  }
}
</script>

<style lang="scss">
.ivu-trend {
  display: inline-block;
  &-text {
    vertical-align: middle;
  }
  &-colorful.ivu-trend-up {
    .ivu-trend-flag {
      color: #ed4014;
    }
  }
  &-colorful.ivu-trend-down,
  &-reverse-color.ivu-trend-colorful.ivu-trend-up {
    .ivu-trend-flag {
      color: #19be6b;
    }
  }
  &-colorful.ivu-trend-text-color.ivu-trend-up .ivu-trend-text,
  &-reverse-color.ivu-trend-colorful.ivu-trend-down .ivu-trend-flag {
    color: #ed4014;
  }
  &-colorful.ivu-trend-text-color.ivu-trend-down,
  &-reverse-color.ivu-trend-colorful.ivu-trend-text-color.ivu-trend-up {
    .ivu-trend-text {
      color: #19be6b;
    }
  }
  &-reverse-color.ivu-trend-colorful.ivu-trend-text-color.ivu-trend-down
    .ivu-trend-text {
    color: #ed4014;
  }
}
</style>
