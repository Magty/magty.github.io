<template>
  <div class="ivu-login">
    <Form ref="form" @submit.native.prevent v-model="formValidate">
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
  provide: function() {
    return { LoginInstance: this }
  },
  methods: {
    handleSubmit: function() {
      this.$refs.form.validate(valid => {
        this.$emit('on-submit', valid, JSON.parse(this.formValidate))
      })
    },
    handleValidate: function(props, callback) {
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
