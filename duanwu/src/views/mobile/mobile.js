import message from '../register/message'
export default {
  name: 'Mobile',
  mixins: [],
  data() {
    return {
      className: 'ivu-login-mobile',
      prefix: 'ios-phone-portrait',
      placeholder: '请输入手机号码',
      type: 'text'
    }
  },
  props: {
    rules: {
      type: [Object, Array],
      default: function () {
        return [{
          required: true,
          message: message.Mobile,
          trigger: 'change'
        }, {
          pattern: /^1\d{10}$/,
          message: '输入的手机号码格式不正确！',
          trigger: 'change'
        }]
      }
    }
  }
}
