<script>
export default {
  name: 'Submit',
  inject: ['LoginInstance'],
  props: {},
  methods: {
    handleSubmit() {
      this.LoginInstance.handleSubmit()
    }
  },
  render(createElement) {
    return createElement('div', { class: 'ivu-login-submit' }, [createElement('i-button', { props: { size: 'large', type: 'primary', long: true }, on: { click: this.handleSubmit } }, this.$slots.default || '登录')])
  }
}
</script>

<style>
</style>
