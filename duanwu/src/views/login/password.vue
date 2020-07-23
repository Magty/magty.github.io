<template>
  <div></div>
</template>

<script>
export default {
  name: 'Password',
  mixins: [i.default],
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
