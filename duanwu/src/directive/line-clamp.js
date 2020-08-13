import {
  addClass,
  removeClass
} from '../utils/assist'
export default {
  inserted: function (el, binding) {
    if (binding.value) {
      addClass(el, 'ivu-line-clamp')
      el.style['-webkit-line-clamp'] = binding.value
    }
  },
  update: function (el, binding) {
    if (binding.value) {
      el.style['-webkit-line-clamp'] = binding.value
    }
  },
  unbind: function (el, binding) {
    removeClass(el, 'ivu-line-clamp')
    el.style['-webkit-line-clamp'] = null
  }
}
