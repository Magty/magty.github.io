<template>
  <div class="ivu-tag-select" :class="classes">
    <div v-if="hideCheckAll" class="ivu-tag-select-option">
      <Tag @on-change="handleCheckAll" checkable :checked="checkedAll" color="primary">全部</Tag>
    </div>
    <a v-if="expandable" @click="handleToggleExpand" class="ivu-tag-select-expand-btn">
      <span v-if="expand">{{locale.collapseText}}</span>
      <span v-else>{{locale.expandText}}</span>
      <Icon v-if="expand" type="ios-arrow-up"></Icon>
      <Icon v-else type="ios-arrow-down"></Icon>
    </a>
  </div>
</template>

<script>
import { findComponentsDownward } from '../../utils/assist'
export default {
  name: 'TagSelect',
  mixins: [],
  provide: function() {
    return {
      TagSelectInstance: this
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    expandable: {
      type: Boolean,
      default: false
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object,
      default: function() {
        return {
          collapseText: '收起',
          expandText: '展开'
        }
      }
    }
  },
  data: function() {
    return {
      currentValue: this.value,
      checkedAll: false,
      expand: false
    }
  },
  computed: {
    classes: function() {
      return {
        'ivu-tag-select-with-expanded': this.expandable,
        'ivu-tag-select-expanded': this.expand
      }
    }
  },
  watch: {
    value: function(newValue) {
      this.currentValue = newValue
      this.handleUpdateTags()
    }
  },
  methods: {
    handleUpdateTags: function() {
      let hasCheck = true
      findComponentsDownward(this, 'TagSelectOption').forEach(item => {
        const curIndex = this.currentValue.indexOf(item.name)
        if (curIndex >= 0) {
          item.checked = true
        } else {
          item.checked = false
          hasCheck = false
        }
      })
      this.checkedAll = hasCheck
    },
    handleChangeTag: function(tag) {
      const valueTmp = []
      let hasCheck = true
      findComponentsDownward(this, 'TagSelectOption').forEach(item => {
        item.checked ? valueTmp.push(item.name) : (hasCheck = false)
      })
      this.currentValue = hasCheck
      this.$emit('input', valueTmp)
      this.$emit('on-change', [].concat(valueTmp), tag)
      this.dispatch('FormItem', 'on-form-change', tag)
      if (tag) {
        this.checkedAll = hasCheck
      }
    },
    handleCheckAll: function(flag) {
      this.checkedAll = flag
      findComponentsDownward(this, 'TagSelectOption').forEach(item => {
        item.checked = flag
      })

      this.handleChangeTag()
      this.$emit('on-checked-all', e)
    },
    handleToggleExpand: function() {
      this.expand = !this.expand
    }
  },
  mounted: function() {
    this.handleUpdateTags()
  }
}
</script>

<style>
</style>
