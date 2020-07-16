<template>
  <span @click="toggleFullscreen" class="i-layout-header-trigger i-layout-header-trigger-min">
    <Icon v-show="!isFullscreen" custom="iconfont icon-full-screen"></Icon>
    <Icon v-show="isFullscreen" custom="iconfont icon-exit-full-screen"></Icon>
  </span>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'headerFullscreen',
  computed: {
    ...mapState('admin/layout', ['isFullscreen'])
  },
  methods: {
    ...mapActions('admin/layout', ['toggleFullscreen'])
  }
}
</script>

<style></style>
