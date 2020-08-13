<script>
import loginMixin from '../mixins/loginMixin'
export default {
  name: 'UserName',
  mixins: [loginMixin],
  data() {
    return {
      className: 'ivu-login-username',
      prefix: 'ios-contact-outline',
      placeholder: '请输入用户名',
      type: 'text',
      validateMessage: '请输入用户名！'
    }
  }
}
</script>

<style>
</style>
