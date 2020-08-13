<script>
import message from '../../config/message'
import loginMixin from '../mixins/loginMixin'
export default {
  name: 'Mobile',
  mixins: [loginMixin],
  props: {
    rules: {
      type: [Object, Array],
      default: () => {
        return [
          {
            required: true,
            message: message.Mobile,
            trigger: 'change'
          },
          {
            pattern: /^1\d{10}$/,
            message: '输入的手机号码格式不正确!',
            trigger: 'change'
          }
        ]
      }
    }
  },
  data() {
    return {
      className: 'ivu-login-mobile',
      prefix: 'ios-phone-portrait',
      placeholder: '请输入手机号码',
      type: 'text'
    }
  }
}
</script>

<style>
</style>
