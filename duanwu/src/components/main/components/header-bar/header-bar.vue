<template>
  <div>
    <!-- <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollapsedChange"></sider-trigger> -->
    <!-- <span v-if="collapsed">
      <common-icon type="_caidanshouqi" :size="iconSize"></common-icon>
    </span>
    <span v-else>
      <common-icon type="_caidanzhankai" :size="iconSize"></common-icon>
    </span>-->
    <!-- <common-icon @click.native="handleChange" :type="siderType" size="18"></common-icon> -->
    <sider-trigger
      @on-change="handleCollapsedChange"
      :collapsed="collapsed"
      :icons="siderType"
      :size="18"
    ></sider-trigger>
    <sider-trigger @on-change="handleRefresh" :icons="refreshIcon" :size="18"></sider-trigger>
    <custom-bread-crumb class="cusbread" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import siderTrigger from './sider-trigger'
// import commonIcon from '_c/common-icon'
import customBreadCrumb from './custom-bread-crumb'

export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    // commonIcon,
    customBreadCrumb
  },
  data() {
    return {
      iconSize: 18,
      siderType: ['_caidanshouqi', '_caidanzhankai'],
      refreshIcon: ['md-refresh']
    }
  },
  props: {
    collapsed: Boolean,
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleRefresh() {},
    handleCollapsedChange(state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
