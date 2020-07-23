<template>
  <span class="ivu-count-up"></span>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    format: {
      type: Function
    },
    target: {
      type: [Date, Number]
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      lastTime: '',
      timer: null
    }
  },
  methods: {
    initTime: function() {
      let targetTime = 0
      try {
        targetTime =
          Object.prototype.toString.call(this.target) === '[object Date]'
            ? this.target.getTime()
            : new Date(this.target).getTime()
      } catch (e) {
        throw new Error('invalid target prop', e)
      }
      let time = targetTime - new Date().getTime()
      time = time < 0 ? 0 : time
      return time
    },
    tick: function() {
      let lastTime = this.lastTime
      this.timer = setTimeout(() => {
        if (lastTime < this.interval) {
          clearTimeout(this.timer)
          this.lastTime = 0
          this.$emit('on-end')
        } else {
          lastTime -= this.interval
          this.lastTime = lastTime
          this.tick()
        }
      }, this.interval)
    },
    defaultFormat: function(time) {
      const hour = Math.floor(time / 3600000)
      const min = Math.floor((time - 3600000 * hour) / 60000)
      const sec = Math.floor((time - 3600000 * hour - min * 60000) / 1000)
      return `${hour}:${min}:${sec}`
    }
  },
  computed: {
    result: function() {
      return this.format
        ? this.defaultFormat(this.lastTime)
        : this.format(this.lastTime)
    }
  },
  watch: {
    target: function() {
      this.timer && clearTimeout(this.timer)
      this.lastTime = this.initTime()
      this.tick()
    }
  },
  created: function() {
    this.lastTime = this.initTime()
  },
  beforeDestroy: function() {
    this.timer && clearTimeout(this.timer)
  }
}
</script>

<style></style>
