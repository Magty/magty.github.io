<template>
  <div class="ivu-tag-select-option">
    <Tag @on-change="handleChange" checkable :checked="checked" :color="color" v-bind="tagProps">
      <slot></slot>
    </Tag>
  </div>
</template>

<script>
export default {
  name: 'TagSelectOption',
  inject: ['TagSelectInstance'],
  props: {
    name: {
      type: [String, Number],
      required: !0
    },
    tagProps: {
      type: Object,
      default: function () {
        return {}
      }
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  data: function () {
    return {
      checked: false
    }
  },
  methods: {
    handleChange: function (flag) {
      this.checked = flag
      this.TagSelectInstance.handleChangeTag(this.name)
    }
  }
}
</script>

<style>
</style>
