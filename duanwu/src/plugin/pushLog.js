import debug from '@/utils/debug'
import store from '../store'
export default {
  install: function (Vue, options = {}) {
    Vue.prototype.$log = Object.assign({}, debug.log, {
      push: function (message) {
        if (typeof message === 'string') {
          store.dispatch('admin/log/push', {
            message
          })
        } else if (typeof message === 'object') {
          store.dispatch('admin/log/push', message)
        }
      }
    })
  }
}
