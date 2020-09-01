<template>
  <div class="ivu-text-center">
    <p>{{date | date_format('HH:mm:ss')}}</p>
    <CountUp v-font="48" :end="count" :duration="2" :callback="handleUpdateData"></CountUp>
    <p>在线访客数</p>
    <p v-font="12" class="ivu-mt-8">
      <Badge status="processing"></Badge>
      <CountDown :target="limitTime" :format="format"></CountDown>秒后更新
    </p>
  </div>
</template>

<script>
function randomUser() {
  return Math.floor(200 * Math.random() + 50)
}
export default {
  data() {
    return {
      count: randomUser(),
      date: new Date(),
      limitTime: new Date().getTime() + 5 * 1000
    }
  },
  methods: {
    handleUpdateData() {
      setTimeout(() => {
        this.date = new Date()
        this.count = randomUser()
        this.limitTime = new Date().getTime() + 5 * 1000
      }, 3 * 1000)
    },
    format(time) {
      return parseInt(time / 1000 + 1)
    }
  }
}
</script>

<style>
</style>
