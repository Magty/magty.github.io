<template>
  <div class="ivu-number-info">
    <div v-if="title||this.$slots.title" class="ivu-number-info-title">
      <slot name="title">{{title}}</slot>
    </div>
    <div v-if="subTitle || this.$slots.subTitle" class="ivu-number-info-subTitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>
    <div class="ivu-number-info-value" :class="valueStyle">
      <span class="ivu-number-info-total">{{ total }}</span>
      <span v-if="subTotal || this.$slots.subTotal" class="ivu-number-info-subTotal">
        <slot name="subTotal">
          <Trend :flag="status"></Trend>
          {{ subTotal }}
        </slot>
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

<style lang="scss">
.ivu-number-info {
  &-title {
    margin-bottom: 16px;
    color: #17233d;
    font-size: 16px;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &-subTitle {
    height: 22px;
    color: #808695;
    font-size: 14px;
    line-height: 22px;
  }
  &-subTitle,
  &-value {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  &-value {
    margin-top: 4px;
    font-size: 0;
  }
  &-total {
    margin-right: 32px;
    color: #515a6e;
    font-size: 24px;
  }
  &-subTotal,
  &-total {
    display: inline-block;
    height: 32px;
    line-height: 32px;
  }
  &-subTotal {
    margin-right: 0;
    vertical-align: top;
    font-size: 14px;
    color: #808695;
  }
}
</style>
