import store from '@/store'
import {
  isInArray
} from '@/utils/route'
export default {
  inserted: function (el, binding) {
    const {
      value
    } = binding
    const access = store.admin.user.info.access
    if (value && value instanceof Array && value.length && access) {
      const isAccess = isInArray(value, access)
      if (isAccess || el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  }
}
