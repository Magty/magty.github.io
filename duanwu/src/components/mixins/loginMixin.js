import message from '../../config/message'
export default {
  inject: ['LoginInstance'],
  props: {
    rules: {
      type: [Object, Array],
      default: function () {
        const name = this.$options.name
        return [{
          required: true,
          message: message[name],
          trigger: 'change'
        }]
      }
    },
    value: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    enterToSubmit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prop: ''
    }
  },
  methods: {
    handleChange(e) {
      console.log(22222)
      this.LoginInstance.formValidate[this.prop] = e
      this.$emit('on-change', e)
    },
    handleEnter() {
      this.enterToSubmit && this.LoginInstance.handleSubmit()
    },
    handleSetValue() {
      const props = this.$props
      if (props.value) {
        this.LoginInstance.formValidate[this.prop] = props.value
      }
    },
    handleGetProps() {
      const name = this.$props.name
      const attrs = {
        prefix: this.prefix,
        placeholder: this.placeholder,
        type: this.type,
        size: 'large',
        value: this.LoginInstance.formValidate[this.prop]
      }
      if (name) {
        attrs.name = name
      }
      return Object.assign(attrs, this.$attrs)
    }
  },
  render(createElement) {
    const inputNode = createElement('i-input', {
      props: this.handleGetProps(),
      on: {
        input: this.handleChange,
        'on-enter': this.handleEnter
      }
    })
    console.log(12222)
    const formItem = createElement('FormItem', {
      props: {
        prop: this.prop,
        rules: this.rules
      }
    }, [inputNode])
    return createElement('div', {
      class: this.className
    }, [formItem])
  },
  created() {
    const name = this.name
    const valid = Object.assign({}, this.LoginInstance.formValidate)
    valid[name] = ''
    this.LoginInstance.formValidate = valid
    this.prop = name
    this.handleSetValue()
  }
}
