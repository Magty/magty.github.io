<template>
  <div></div>
</template>

<script>
export default {
  name: 'Email',
  mixins: [],
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
            require: true,
            message: '',
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
