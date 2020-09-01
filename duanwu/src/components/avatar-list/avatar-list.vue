<template>
  <div :class="['ivu-avatar-list',`'ivu-avatar-list-'${size}`]">
    <div v-for="(item,index) in currentList" :key="index" class="ivu-avatar-list-item">
      <Tooltip v-if="tooltip && item.tip" :content="item.tip" :placement="placement">
        <Avatar :src="item.src" :size="size" :shape="shape"></Avatar>
      </Tooltip>
      <Avatar v-else :src="item.src" :size="size" :shape="shape"></Avatar>
    </div>
    <div v-if="this.$slots.extra" class="ivu-avatar-list-item ivu-avatar-list-item-excess">
      <Avatar :style="excessStyle" :size="size" :shape="shape">
        <slot name="excess">{{'+' + list.length - max}}</slot>
      </Avatar>
    </div>
  </div>
</template>

<script>
import { oneOf } from '@/utils/assist'
export default {
  name: 'AvatarList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    shape: {
      validator: value => oneOf(value, ['circle', 'square']),
      default: 'circle'
    },
    size: {
      validator: value => oneOf(value, ['small', 'large', 'default']),
      default: 'default'
    },
    excessStyle: {
      type: Object,
      default: () => {}
    },
    max: {
      type: Number
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    placement: {
      validator: value =>
        oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end'
        ]),
      default: 'top'
    }
  },
  computed: {
    currentList: function() {
      const length = this.list.length
      const max = this.max
      return length <= max
        ? [].concat(this.list)
        : [].concat(this.list).slice(0, max)
    }
  }
}
</script>

<style>
</style>
