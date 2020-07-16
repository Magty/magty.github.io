<template>
  <Tooltip :content="tooltipContent" transfer>
    <span @click="handleOpenLog" class="i-layout-header-trigger i-layout-header-trigger-min">
      <Badge
        :count="0 === lengthError ? null : lengthError"
        :dot="showDot"
        :offset="showDot ? [26, 2] : [20, 0]"
      >
        <Icon custom="iconfont icon-record"></Icon>
      </Badge>
    </span>
  </Tooltip>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'headerLog',
  computed: {
    ...mapGetters('admin/log', ['length', 'lengthError']),
    showDot: function() {
      return !!this.length && this.lengthError === 0
    },
    tooltipContent: function() {
      if (this.length) {
        const tip = ''.concat(this.length, ' 条日志')
        return this.lengthError
          ? tip + ' | 包含 '.concat(this.lengthError, ' 个异常')
          : tip
      }
      return '没有日志或异常'
    }
  },
  methods: {
    handleOpenLog: function() {
      this.$router.push({
        name: 'log'
      })
    }
  }
}
</script>

<style>
</style>
