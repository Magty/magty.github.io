<template>
  <span
    @click="handleReload"
    class="i-layout-header-trigger"
    :class="{'i-layout-header-trigger-min':showSiderCollapse}"
  >
    <Icon type="md-refresh"></Icon>
  </span>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'headerReload',
  computed: {
    ...mapState('admin/layout', ['isMobile', 'showSiderCollapse'])
  },
  methods: {
    handleReload: function() {
      this.$emit('on-reload')
    }
  }
}
</script>

<style>
</style>
