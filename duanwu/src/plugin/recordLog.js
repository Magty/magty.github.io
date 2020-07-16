import store from '@/store'
export default {
  install: function (Vue, options = {}) {
    Vue.config.errorHandler = function (error, n, prefix) {
      Vue.nextTick(() => {
        store.dispatch('admin/log/push', {
          message: ''.concat(prefix, ': ').concat(error.message),
          type: 'error',
          meta: {
            error
          }
        })
      })
    }
  }
}
