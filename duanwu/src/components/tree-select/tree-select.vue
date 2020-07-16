<template>
  <i-select
    ref="select"
    @on-change="handleChange"
    @on-open-change="handleOpenChange"
    :multiple="multiple"
    :transfer-class-name="transferClassName"
    class="ivu-tree-select"
    :class="classes"
    :transfer="transfer"
  >
    <Tree
      @on-select-change="handleSelectNode"
      @on-check-change="handleSelectNode"
      :data="data"
      :multiple="multiple"
      check-strictly
      check-directly
      :show-checkbox="multiple && showCheckbox"
      :load-data="loadData"
    ></Tree>
  </i-select>
</template>

<script>
export default {
  name: 'TreeSelect',
  mixins: [],
  props: {
    value: {
      type: [String, Number, Array]
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: !1
    },
    showCheckbox: {
      type: Boolean,
      default: !1
    },
    loadData: {
      type: Function
    },
    transfer: {
      type: Boolean,
      default: function() {
        return (
          !(!this.$IVIEWPRO || this.$IVIEWPRO.transfer === '') &&
          this.$IVIEWPRO.transfer
        )
      }
    }
  },
  data: function() {
    return {
      currentValue: this.value,
      isChangeValueInTree: !1,
      isValueChangeByTree: !1
    }
  },
  watch: {
    value: function(value) {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        this.currentValue = value
        this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, true)
      }
    },
    data: function() {
      if (this.isChangeValueInTree) {
        this.isChangeValueInTree = false
      } else {
        this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, true)
      }
    }
  },
  computed: {
    valueToArray: function() {
      return this.currentValue === 'object'
        ? this.currentValue
        : [this.currentValue]
    },
    isCheckboxUsable: function() {
      return this.multiple && this.showCheckbox
    },
    transferClassName: function() {
      return this.transfer ? 'ivu-tree-select-transfer' : ''
    },
    classes: function() {
      return {
        'ivu-tree-select-with-checkbox': this.showCheckbox
      }
    }
  },
  methods: {
    handleSelectNode: function(selected, selectNode) {
      if (this.multiple) {
        if (selected.length) {
          this.currentValue = selected.map(item => {
            return item.value
          })
          this.handleUpdateSelectValue(selectNode.value, selectNode.title)
        } else {
          this.currentValue = []
          this.handleUpdateSelectValue('', '')
        }
      } else if (selected.length) {
        this.currentValue = selected[0].value
        this.handleUpdateSelectValue(selected[0].value, selected[0].title)
      } else {
        this.currentValue = ''
        this.handleUpdateSelectValue('', '')
      }
      this.isChangeValueInTree = true
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
      this.dispatch('FormItem', 'on-form-change', this.currentValue)
    },
    handleUpdateTreeNodes: function(tree) {
      if (arguments.length > 1 && arguments[1]) {
        tree.forEach(item => {
          if (this.valueToArray.indexOf(tree.value) >= 0) {
            this.isCheckboxUsable
              ? (tree.checked = true)
              : (tree.selected = true)
            this.handleUpdateSelectValue(tree.value, tree.title)
          } else {
            this.isCheckboxUsable
              ? (tree.checked = false)
              : (tree.selected = false)
            if (tree.children && tree.children.length) {
              this.handleUpdateTreeNodes(tree.children)
            }
          }
        })
        this.$refs.select.isFocused = false
      }
    },
    handleUpdateSelectValue: function(value, label) {
      if (value === '') {
        this.$refs.select.reset()
      } else {
        this.isValueChangeByTree = true
        this.$refs.select.onOptionClick({
          value,
          label
        })
      }
    },
    handleChange: function(value) {
      if (this.isValueChangeByTree) {
        this.isValueChangeByTree = false
      } else {
        this.currentValue = value
        this.$emit('input', value)
        this.$emit('on-change', value)
        this.dispatch('FormItem', 'on-form-change', value)
        this.$refs.select.reset()
        this.handleUpdateTreeNodes(this.data, !0)
        this.$nextTick(() => {
          this.isValueChangeByTree = false
        })
      }
    },
    handleOpenChange: function(open) {
      this.$emit('on-open-change', open)
    }
  },
  mounted: function() {
    this.handleUpdateTreeNodes(this.data, true)
  }
}
</script>

<style>
</style>
