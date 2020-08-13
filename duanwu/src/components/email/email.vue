<script>
import loginMixin from '../mixins/loginMixin'
import message from '../../config/message'
export default {
  name: 'Email',
  mixins: [loginMixin],
  data() {
    return {
      className: 'ivu-login-mail',
      prefix: 'ios-mail-outline',
      placeholder: '请输入邮箱',
      type: 'email'
    }
  },
  props: {
    rules: {
      type: [Object, Array],
      default: function() {
        return [
          {
            required: true,
            message: message.Email,
            trigger: 'change'
          },
          {
            type: 'email',
            message: '输入的邮箱格式不正确',
            trigger: 'change'
          }
        ]
      }
    }
  }
}
</script>

<style>
</style>
