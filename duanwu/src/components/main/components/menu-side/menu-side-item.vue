<template>
  <div>
    <MenuItem
      @click.native="handleClick(menu.path)"
      :to="menu.path"
      :replace="menu.replace"
      :target="menu.target"
      :name="menu.path"
    >
      <menu-side-title :menu="menu" :hide-title="hideTitle"></menu-side-title>
      <Badge
        v-if="badgeData"
        :type="badgeData.type"
        :path="badgeData.path"
        :text="badgeData.text"
        :color="badgeData.color"
        :count="badgeData.count"
        class="i-layout-menu-side-badge"
      ></Badge>
    </MenuItem>
  </div>
</template>

<script>
import menuSideTitle from './menu-side-title.vue'

import mixin from './mixin'
import routerMix from '../routermixin'

export default {
  name: 'menuSideItem',
  components: {
    menuSideTitle
  },
  mixins: [routerMix, mixin],
  props: {
    menu: {
      type: Object,
      default: () => {}
    },
    hideTitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
