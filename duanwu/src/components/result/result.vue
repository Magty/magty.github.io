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
    <slot name="action">
      <div class="ivu-result-actions">{{actions}}</div>
    </slot>
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

<style>
</style>
