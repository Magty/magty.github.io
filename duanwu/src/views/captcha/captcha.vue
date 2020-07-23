<template>
  <div></div>
</template>

<script>
export default {
  name: 'Captcha',
  mixins: [],
  props: {
    field: {
      type: [String, Array]
    },
    countDown: {
      type: Number,
      default: 60
    },
    text: {
      type: String
    },
    unitText: {
      type: String,
      default: '秒'
    },
    beforeClick: Function
  },
  data() {
    return {
      className: 'ivu-login-captcha',
      prefix: 'ios-keypad-outline',
      placeholder: '请输入验证码',
      type: 'text',
      buttonDisabled: false,
      limitCountDown: 0
    }
  },
  methods: {
    handleClickCaptcha: function() {
      if (this.field) {
        const fieldArray =
          typeof this.field === 'string' ? [this.field] : this.field
        this.LoginInstance.handleValidate(fieldArray, valid => {
          if (valid) {
            this.handleBeforeGetCaptcha()
          }
        })
      } else {
        this.handleBeforeGetCaptcha()
      }
    },
    handleBeforeGetCaptcha: function() {
      if (!this.beforeClick) {
        return this.handleGetCaptcha()
      }
      const before = this.beforeClick()
      if (before && before.then) {
        before.then(() => this.handleGetCaptcha())
      } else {
        this.handleGetCaptcha()
      }
    },
    handleGetCaptcha: function() {
      if (this.countDown > 0) {
        this.buttonDisabled = !0
        this.limitCountDown = this.countDown
        this.handleCountDown()
      }
      this.$emit(
        'on-get-captcha',
        this.LoginInstance.formValidate[this.prop],
        JSON.parse(this.LoginInstance.formValidate)
      )
    },
    handleCountDown: function() {
      this.timer = setTimeout(() => {
        this.limitCountDown--
        if (this.limitCountDown === 0) {
          this.buttonDisabled = false
          clearTimeout(this.timer)
        } else {
          this.handleCountDown()
        }
      }, 1000)
    },
    render: h => {
      const buttonProps = {
        size: 'large',
        type: 'default',
        long: true,
        disabled: this.buttonDisabled
      }
      const attrs = this.$attrs
      if ('size' in attrs) {
        buttonProps.size = attrs.size
      }
      if ('button-type' in attrs) {
        buttonProps.type = attrs['button-type']
      }
      const butnText = this.$slots.text
        ? this.$slots.text
        : this.limitCountDown !== 0
        ? String(this.limitCountDown) + ' ' + String(this.unitText)
        : this.text
        ? this.text
        : '获取验证码'
      return (
        <div class={this.className}>
          <FormItem {...this.prop} rules={this.rules}>
            <row gutter={8}>
              <i-col span={16}>
                <i-input
                  {...this.handleGetProps()}
                  oninput={this.handleChange}
                  onon-enter={this.handleEnter}
                ></i-input>
              </i-col>
              <i-col gutter={8}>
                <i-button {...buttonProps} onclick={this.handleClickCaptcha}>
                  <slot>{butnText}</slot>
                </i-button>
              </i-col>
            </row>
          </FormItem>
        </div>
      )
    }
  },
  beforeDestroy: function() {
    this.timer && clearTimeout(this.timer)
  }
}
</script>

<style>
</style>
