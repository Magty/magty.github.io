<script>
import loginMixin from '../mixins/loginMixin'
export default {
  name: 'Captcha',
  mixins: [loginMixin],
  props: {
    field: {
      type: [String, Array]
    },
    countDown: {
      type: Number,
      default: 60
    },
    text: String,
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
    handleClickCaptcha() {
      if (this.field) {
        const field = typeof this.field === 'string' ? [this.field] : this.field
        this.LoginInstance.handleValidate(field, (valid) => {
          if (valid) {
            this.handleBeforeGetCaptcha()
          }
        })
      }
    },
    handleBeforeGetCaptcha() {
      if (!this.beforeClick) {
        return this.handleGetCaptcha()
      }
      const before = this.beforeClick()
      before && before.then ? before.then(() => {
        this.handleGetCaptcha()
      }) : this.handleGetCaptcha()
    },
    handleGetCaptcha() {
      if (this.countDown > 0) {
        this.buttonDisabled = true
        this.limitCountDown = this.countDown
        this.handleCountDown()
      }
      this.$emit('on-get-captcha', this.LoginInstance.formValidate[this.props], JSON.parse(this.LoginInstance.formValidate))
    },
    handleCountDown() {
      this.timer = setTimeout(() => {
        this.limitCountDown--
        if (this.limitCountDown === 0) {
          this.buttonDisabled = false
          clearTimeout(this.timer)
        } else {
          this.handleCountDown()
        }
      }, 1000)
    }
  },
  render(createElement) {
    const attrs = this.$attrs
    const props = this.handleGetProps()
    const btnProps = {
      size: 'large',
      type: 'default',
      long: true,
      disabled: this.buttonDisabled
    }
    if ('size' in attrs) {
      btnProps.size = attrs.size
    }
    if ('button-type' in attrs) {
      btnProps.type = attrs['button-type']
    }
    let text = ''
    text = this.$slots.text ? this.$slots.text : this.limitCountDown !== 0 ? this.limitCountDown + ' ' + this.unitText : this.text ? this.text : '获取验证码'
    console.log(text)
    const button = createElement('i-button', {
      props: btnProps,
      on: {
        click: this.handleClickCaptcha
      }
    }, text)
    const row = createElement('row', {
      props: {
        gutter: 8
      }
    }, [createElement('i-col', {
      props: {
        span: 16
      }
    }, [createElement('i-input', {
      props,
      on: {
        input: this.handleChange,
        'on-enter': this.handleEnter
      }
    })]), createElement('i-col', {
      props: {
        span: 8
      }
    }, [button])])
    const formItem = createElement('FormItem', {
      props: {
        prop: this.prop,
        rules: this.rules
      }
    }, [row])
    return createElement('div', {
      attrs: {
        class: this.className
      }
    }, [formItem])
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style>
</style>
