<template>
  <div class="ivu-text-center">
    <i-circle :percent="percent" dashboard :size="180" :stroke-width="4">
      <div>
        <Avatar v-color="'#40a9ff'" v-bg-color="'#e6f7ff'" icon="md-ribbon"></Avatar>
        <div v-font="40" class="ivu-mt">{{value}}</div>
      </div>
    </i-circle>
    <div>恭喜，本月目标已达标！</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 285,
      percent: 80
    }
  }
}
</script>

<style>
</style>
