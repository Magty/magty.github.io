<template>
  <span class="i-layout-menu-side-title">
    <span
      v-if="menu.icon || menu.custom || menu.img"
      class="i-layout-menu-side-title-icon"
      :class="{'i-layout-menu-side-title-icon-single': hideTitle}"
    >
      <Icon v-if="menu.icon" :type="menu.icon"></Icon>
      <Icon v-if="menu.custom" :custom="menu.custom"></Icon>
      <img v-if="menu.img" :src="menu.img" />
    </span>
    <span
      v-if="!hideTitle"
      class="i-layout-menu-side-title-text"
      :class="{'i-layout-menu-side-title-text-selected': selected}"
    >{{tTitle(menu.title)}}</span>
  </span>
</template>

<script>
import mixin from './mixin'
export default {
  name: 'menuSiderTitle',
  mixins: [mixin],
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tTitle: function(title) {
      return title && title.indexOf('$t:') === 0
        ? this.$t(title.split('$t:')[1])
        : title
    }
  }
}
</script>

<style lang='scss'>
.i-layout-menu-side-title {
  display: inline-block;
  &-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 21px;
    vertical-align: middle;
    text-align: center;
    margin-right: 8px;
    &-single {
      margin-right: 0;
    }
    i {
      margin-right: 0 !important;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-text-selected {
    color: #2d8cf0;
  }
}
</style>
