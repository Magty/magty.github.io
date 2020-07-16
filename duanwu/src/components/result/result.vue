<template>
  <div class="ivu-result">
    <div class="ivu-result-icon" :class="iconClasses">
      <Icon v-if="'success' === type" type="ios-checkmark"></Icon>
      <Icon v-else-if="'error' === type" type="ios-close"></Icon>
    </div>
    <div v-if="title" class="ivu-result-title">{{title}}</div>
    <div v-if="desc" class="ivu-result-desc">{{desc}}</div>
    <div v-if="extra" class="ivu-result-extra">{{ extra }}</div>
    <div v-if="$slots.actions" class="ivu-result-actions">{{actions}}</div>
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
