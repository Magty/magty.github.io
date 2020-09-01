<template>
  <span class="ivu-numeral">
    <slot name="prefix">{{prefix}}</slot>
    {{currentValue}}
    <slot name="suffix">{{suffix}}</slot>
  </span>
</template>

<script>
import Numeral from 'numeral'
export default {
  name: 'Numeral',
  props: {
    value: {
      type: [String, Number]
    },
    format: {
      type: String
    },
    prefix: {
      type: [String, Number]
    },
    suffix: {
      type: [String, Number]
    }
  },
  data: function() {
    return {
      currentValue: ''
    }
  },
  watch: {
    value: function() {
      this.init()
    },
    format: function() {
      this.init()
    }
  },
  methods: {
    init: function() {
      if (this.value) {
        const value = Numeral(this.value)
        if (this.format) {
          this.currentValue = value.format(this.format)
        } else {
          this.currentValue = value.value()
        }
        this.$emit('on-change', this.currentValue)
      }
    },
    getValue: function() {
      return this.currentValue
    }
  },
  mounted: function() {
    this.init()
  }
}
</script>

<style>
</style>
