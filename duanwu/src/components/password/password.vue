<script>
import loginMixin from '../mixins/loginMixin'
export default {
  name: 'Password',
  mixins: [loginMixin],
  data() {
    return {
      className: 'ivu-login-password',
      prefix: 'ios-lock-outline',
      placeholder: '请输入密码',
      type: 'password'
    }
  }
}
</script>

<style>
</style>
