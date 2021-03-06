import auth from '@/directive/auth'
import recordLog from './recordLog'
import pushLog from './pushLog'
export default {
  install: async function (Vue, options = {}) {
    Vue.use(recordLog)
    Vue.use(pushLog)
    Vue.directive('auth', auth)
  }
}
