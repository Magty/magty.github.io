<template>
  <span class="ivu-numeral"></span>
</template>

<script>
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
        this.format
          ? (this.currentValue = this.format(this.format))
          : (this.currentValue = this.value())
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
