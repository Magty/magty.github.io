<template>
  <!-- <a @click="handleChange" type="text" :class="['sider-trigger-a',collapsed ? 'collapsed' : '']">
    <Icon :type="icon" :size="size" />
  </a>-->
  <span @click="handleChange">
    <common-icon v-show="!collapsed" :type="icons[0]" :size="size"></common-icon>
    <common-icon
      v-if="icons.length>1"
      v-show="collapsed && icons.length>1"
      :type="icons[1]"
      :size="size"
    ></common-icon>
  </span>
</template>

<script>
import commonIcon from '_c/common-icon'
export default {
  name: 'siderTrigger',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    icons: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 18
    }
  },
  components: {
    commonIcon
  },
  methods: {
    handleChange() {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>

<style lang="scss">
</style>
