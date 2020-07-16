<template>
  <Submenu :name="menu.path">
    <template slot="title">
      <menu-side-title :menu="menu"></menu-side-title>
      <Badge
        v-if="badgeData"
        :type="badgeData.type"
        :path="badgeData.path"
        :text="badgeData.text"
        :color="badgeData.color"
        :count="badgeData.count"
        class="i-layout-menu-side-badge"
      ></Badge>
    </template>
    <template v-for="(item,index) in menu.children">
      <menu-side-submenu v-if="item.children" :key="index" :menu="item"></menu-side-submenu>
      <menu-side-item v-else :key="index" :menu="item"></menu-side-item>
    </template>
  </Submenu>
</template>

<script>
import menuSideItem from './menu-side-item'
import menuSideTitle from './menu-side-title'

import mixin from './mixin'

export default {
  name: 'MenuSideSubmenu',
  components: {
    menuSideItem,
    menuSideTitle
  },
  mixins: [mixin],
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang='scss'>
.i-layout-menu-side-badge {
  position: absolute;
  top: 16px;
  right: 40px;
  .ivu-badge-count {
    box-shadow: none;
  }
}
.i-layout-menu-side-collapse .i-layout-menu-side-badge {
  display: none;
}
</style>
