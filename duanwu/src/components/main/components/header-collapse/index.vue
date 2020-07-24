<template>
  <span
    @click="handleToggleMenuSide"
    class="i-layout-header-trigger"
    :class="{ 'i-layout-header-trigger-min': showReload}"
  >
    <Icon v-show="menuCollapse || isMobile" custom="iconfont icon-caidanzhankai"></Icon>
    <Icon v-show="!menuCollapse && !isMobile" custom="iconfont icon-caidanshouqi"></Icon>
  </span>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'headerCollapse',
  computed: {
    ...mapState('admin/layout', [
      'isMobile',
      'isTablet',
      'isDesktop',
      'menuCollapse',
      'showReload'
    ])
  },
  methods: {
    ...mapMutations('admin/layout', ['updateMenuCollapse']),
    handleToggleMenuSide: function(event) {
      if (this.isMobile) {
        this.updateMenuCollapse(false)
        this.$emit('on-toggle-drawer', event)
      } else {
        this.updateMenuCollapse(!this.menuCollapse)
      }
    }
  },
  watch: {
    $route: function() {
      this.isMobile && this.handleToggleMenuSide(false)
    },
    isTablet: function(newValue) {
      !this.isMobile && newValue && this.updateMenuCollapse(true)
    },
    isDesktop: function(newValue) {
      !this.isMobile && newValue && this.updateMenuCollapse(false)
    }
  }
}
</script>

<style lang="scss">
</style>
