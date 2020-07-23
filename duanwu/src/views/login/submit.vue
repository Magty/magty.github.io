<template>
  <div></div>
</template>

<script>
export default {
  name: 'Submit',
  inject: ['LoginInstance'],
  props: {},
  methods: {
    handleSubmit: function() {
      this.LoginInstance.handleSubmit()
    }
  },
  render: h => (
    <div class="ivu-login-submit">
      <i-button
        size="large"
        type="primary"
        long
        click={this.handleSubmit.bind(this)}
      >
        <slot>登录</slot>
      </i-button>
    </div>
  )
}
</script>

<style>
</style>
