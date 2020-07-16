import debug from '@/utils/debug'
import store from '../store'
export default {
  install: function (Vue, options = {}) {
    Vue.prototype.$log = Object.assign({}, debug.log, {
      push: function (message) {
        typeof message === 'string' ? store.dispatch('admin/log/push', {
          message
        }) : typeof message === 'object' && store.dispatch('admin/log/push', message)
      }
    })
  }
}
