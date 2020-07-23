<template>
  <div :class="['ivu-description-list',{'ivu-description-list-vertical': 'vertical' === layout}]">
    <div v-if="title" class="ivu-description-list-title">
      <slot name="title">{{title}}</slot>
    </div>
    <Row :gutter="gutter">
      <slot></slot>
    </Row>
  </div>
</template>

<script>
import { oneOf } from '@/utils/tool'
export default {
  name: 'DescriptionList',
  props: {
    layout: {
      validator: value => oneOf(value, ['horizontal', 'vertical']),
      default: 'horizontal'
    },
    title: {
      type: String
    },
    gutter: {
      type: Number,
      default: 32
    },
    col: {
      validator: value => oneOf(value, [1, 2, 3, 4]),
      default: 3
    }
  },
  provide: function() {
    return {
      DescriptionListInstance: this
    }
  }
}
</script>

<style>
</style>
