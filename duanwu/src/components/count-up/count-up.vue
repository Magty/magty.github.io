<template>
  <span class="ivu-count-up"></span>
</template>

<script>
import { CountUp } from 'countup.js'
export default {
  name: 'CountUp',
  props: {
    start: {
      type: Number,
      required: false,
      default: 0
    },
    end: {
      type: Number,
      required: true
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    useGrouping: {
      type: Boolean,
      required: false,
      default: true
    },
    separator: {
      type: String,
      required: false,
      default: ','
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    decimalplaces: {
      type: Number,
      required: false,
      default: 0
    },
    duration: {
      type: Number,
      required: false,
      default: 2
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    },
    callback: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      CountUp: null
    }
  },
  watch: {
    end: function(e) {
      this.CountUp && this.CountUp.update && this.CountUp.update(e)
    }
  },
  mounted: function() {
    this.init()
  },
  methods: {
    init: function() {
      if (!this.CountUp) {
        this.CountUp = new CountUp(this.$el, this.end, {
          startVal: this.start,
          prefix: this.prefix,
          suffix: this.suffix,
          duration: this.duration,
          useEasing: this.useEasing,
          useGrouping: this.useGrouping,
          separator: this.separator,
          decimal: this.decimal,
          decimalPlaces: this.decimalplaces
        })
      }
      if (!this.CountUp.error) {
        this.CountUp.start(() => {
          this.callback(this.CountUp)
        })
      }
    },
    destory: function() {
      this.CountUp = null
    }
  },
  beforeDestroy: function() {
    this.destory()
  },
  start: function(call) {
    this.CountUp &&
      this.CountUp.start &&
      this.CountUp.start(() => {
        call && call(this.CountUp)
      })
  },
  pauseResume: function() {
    this.CountUp && this.CountUp.pauseResume && this.CountUp.pauseResume()
  },
  reset: function() {
    this.CountUp && this.CountUp.reset && this.CountUp.reset()
  },
  update: function(e) {
    this.CountUp && this.CountUp.update && this.CountUp.update(e)
  }
}
</script>

<style></style>
