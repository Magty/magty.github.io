<template>
  <div class="ivu-result">
    <div class="ivu-result-icon" :class="iconClasses">
      <Icon v-if="'success' === type" type="ios-checkmark"></Icon>
      <Icon v-else-if="'error' === type" type="ios-close"></Icon>
    </div>
    <slot v-if="title" name="title">
      <div class="ivu-result-title">{{title}}</div>
    </slot>
    <slot v-if="desc" name="desc">
      <div v-if="desc" class="ivu-result-desc">{{desc}}</div>
    </slot>
    <slot v-if="extra" name="extra">
      <div v-if="extra" class="ivu-result-extra">{{ extra }}</div>
    </slot>
    <div class="ivu-result-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist'
export default {
  name: 'Result',
  props: {
    type: {
      validator: function(value) {
        return oneOf(value, ['success', 'error'])
      }
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    extra: {
      type: String
    }
  },
  computed: {
    iconClasses: function() {
      return {
        'ivu-result-icon-success': this.type === 'success',
        'ivu-result-icon-error': this.type === 'error'
      }
    }
  }
}
</script>

<style lang="scss">
.ivu-result {
  width: 72%;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
  &-icon {
    display: inline-block;
    width: 72px;
    border-radius: 50%;
    margin-bottom: 24px;
    &-success {
      background-color: #19be6b;
    }
    &-error {
      background-color: #ed4014;
    }
    .ivu-icon {
      color: #fff;
      font-size: 72px;
      border-radius: 50%;
    }
  }
  &-title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
  &-desc {
    margin-bottom: 24px;
    color: #808695;
    font-size: 14px;
    line-height: 22px;
  }
  &-extra {
    padding: 24px 40px;
    text-align: left;
    background: #f8f8f9;
    border-radius: 4px;
    @media screen and (max-width: 480px) {
      padding: 18px 20px;
    }
  }
  &-actions {
    margin-top: 32px;
    .ivu-btn:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
