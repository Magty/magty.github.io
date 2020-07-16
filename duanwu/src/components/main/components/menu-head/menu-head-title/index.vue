<template>
  <div class="i-layout-menu-head-title">
    <span
      v-if="!hideIcon && (item.icon || item.custom || item.img)"
      class="i-layout-menu-head-title-icon"
    >
      <Icon v-if="item.icon" :type="item.icon"></Icon>
      <Icon v-else-if="item.custom" :custom="item.custom"></Icon>
      <img v-else-if="item.img" :src="item.img" />
    </span>
    <span class="i-layout-menu-head-title-text">{{ tTitle(item.title) }}</span>
  </div>
</template>

<script>
import mixin from '../mixin'
export default {
  name: 'MenuHeadTitle',
  mixins: [mixin],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    hideIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='scss'>
.i-layout-menu-head-title {
  display: inline-block;
  &-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    vertical-align: middle;
    text-align: center;
    &-single {
      margin-right: 0;
    }
    i {
      margin-right: 0 !important;
      font-size: 16px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-text {
    vertical-align: middle;
    margin-left: 6px;
  }
}
</style>
