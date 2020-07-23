<template>
  <div></div>
</template>

<script>
export default {
  name: 'Auth',
  mixins: [],
  props: {
    authority: {
      type: [String, Array, Function, Boolean],
      default: true
    },
    access: {
      type: Boolean,
      default: false
    },
    prevent: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: '您没有权限进行此操作'
    },
    customTip: {
      type: Boolean,
      default: false
    },
    display: {
      type: String
    }
  },
  computed: {
    isPermission: function() {
      const auth =
        typeof this.authority === 'boolean'
          ? this.authority
          : this.authority instanceof Function
          ? this.authority()
          : ((authArray, accessArray) => {
              let flag = false
              accessArray.forEach(item => {
                if (authArray.includes(item)) {
                  flag = true
                }
              })
              return flag
            })(
              typeof this.authority === 'string'
                ? [this.authority]
                : this.authority,
              typeof this.access === 'string' ? [this.access] : this.access
            )
      return auth
    },
    options: function() {
      const style = {}
      if (this.display) {
        style.display = this.display
      }
      return {
        class: {
          'ivu-auth': true,
          'ivu-auth-permission': this.isPermission,
          'ivu-auth-no-math': !this.isPermission,
          'ivu-auth-redirect': !this.isPermission && this.to,
          'ivu-auth-prevent': this.prevent
        },
        style
      }
    },
    render: h => {
      return this.isPermission ? (
        <div {...this.options}>
          <slot></slot>
        </div>
      ) : this.to ? (
        <div {...this.options}></div>
      ) : this.prevent ? (
        <div {...this.options} onclick={this.handlePreventClick}>
          <div class="ivu-auth-prevent-no-match">
            <slot></slot>
          </div>
        </div>
      ) : (
        <div {...this.options}>
          <slot name="noMatch"></slot>
        </div>
      )
    }
  },
  methods: {
    handlePreventClick: function(event) {
      if (!this.isPermission) {
        if (!this.customTip) {
          this.$Message.info({
            content: this.message,
            duration: 3
          })
        }
        this.$emit('click', event)
      }
    },
    created: function() {
      !this.isPermission && this.to && this.handleClick(false)
    }
  }
}
</script>

<style>
</style>
