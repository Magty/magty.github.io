<template>
  <div class="ivu-login">
    <Form ref="form" :model="formValidate" @submit.native.prevent>
      <slot></slot>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      formValidate: {}
    }
  },
  provide() {
    return { LoginInstance: this }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        this.$emit('on-submit', valid, this.formValidate)
      })
    },
    handleValidate(props, callback) {
      let flag = true
      props.forEach(prop =>
        this.$refs.form.validateField(prop, message => {
          if (message) {
            flag = false
          }
        })
      )
      callback(flag)
    }
  }
}
</script>

<style>
</style>
