<template>
  <div class="ivu-number-info">
    <div v-if="title||$slots.title" class="ivu-number-info-title">{{title}}</div>
    <div v-if="subTitle || $slots.subTitle" class="ivu-number-info-subTitle">{{ subTitle }}</div>
    <div class="ivu-number-info-value" :class="valueStyle">
      <span class="ivu-number-info-total">{{ total }}</span>
      <span v-if="subTotal || $slots.subTotal" class="ivu-number-info-subTotal">
        {{ subTotal }}
        <Trend :flag="status"></Trend>
      </span>
    </div>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist'
import Trend from '../trend'
export default {
  name: 'NumberInfo',
  components: {
    Trend
  },
  props: {
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    total: {
      type: [String, Number]
    },
    subTotal: {
      type: [String, Number]
    },
    status: {
      validator: function(value) {
        return oneOf(value, ['up', 'down'])
      }
    },
    gap: {
      type: [String, Number],
      default: 8
    }
  },
  computed: {
    valueStyle: function() {
      return {
        'margin-top': this.gap + 'px'
      }
    }
  }
}
</script>

<style>
</style>
