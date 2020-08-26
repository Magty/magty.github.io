<template>
  <div :class="['ivu-description-list',{'ivu-description-list-vertical': 'vertical' === layout}]">
    <div v-if="title || $slots.title" class="ivu-description-list-title">
      <slot name="title">{{title}}</slot>
    </div>
    <Row :gutter="gutter">
      <slot></slot>
    </Row>
  </div>
</template>
<script>
import { oneOf } from '@/utils/assist'
export default {
  name: 'DescriptionList',
  props: {
    layout: {
      validator(value) {
        return oneOf(value, ['horizontal', 'vertical'])
      },
      default: 'horizontal'
    },
    title: String,
    gutter: {
      type: Number,
      default: 32
    },
    col: {
      validator(value) {
        return oneOf(value, [1, 2, 3, 4])
      },
      default: 3
    }
  },
  provide() {
    return {
      DescriptionListInstance: this
    }
  }
}
</script>

<style lang="scss">
.ivu-description {
  &-list-title {
    margin-bottom: 16px;
    color: #17233d;
    font-weight: 500;
    font-size: 14px;
  }
  &-term {
    color: #17233d;
    white-space: nowrap;
  }
  &-detail,
  &-term {
    display: table-cell;
    padding-bottom: 16px;
    line-height: 20px;
  }
  &-detail {
    width: 100%;
    color: #515a6e;
  }
  &-list-vertical {
    .ivu-description-term {
      display: block;
      padding-bottom: 8px;
    }
    .ivu-description-detail {
      display: block;
    }
  }
}
</style>
