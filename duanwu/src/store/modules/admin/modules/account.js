/* function* generationFun(call) {
  yield new Promise((resolve, reject) => {

  })
} */
/* function create(call) {
  return () => {
    return new Promise((resolve, reject) => {
      const value = call.apply(this, arguments)

    })
  }
} */
import {
  login,
  register
} from '@/api/user'

import debug from '@/utils/debug'

import router from '@/router'
const {
  cookies
} = debug

const actions = {
  login: function ({
    dispatch
  }, {
    username,
    password
  }) {
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      }).then(
        user => {
          cookies.set('uuid', user.uuid)
          cookies.set('token', user.token)
          const allPromise = [dispatch('admin/user/set', user.info, {
            root: true
          }), this.load()]
          Promise.all(allPromise).then(resolve()).catch(e => reject(e))
        }
      ).catch(err => {
        reject(err)
      })
    })
  },
  logout: function ({
    dispatch
  }) {
    const param = (arguments.length > 1 && arguments[1]) ? arguments[1] : {}
    const {
      confirm,
      vm
    } = param

    function confirmed() {
      return changeTo.apply(this, arguments)
    }

    function changeTo() {
      cookies.remove('token')
      cookies.remove('uuid')
      dispatch('admin/user/set', {}, {
        root: true
      }).then(
        router.push({
          name: 'login'
        })
      )
    }
    if (confirm) {
      this.$Modal.confirm({
        title: vm.$t('basicLayout.logout.confirmTitle'),
        content: vm.$t('basicLayout.logout.confirmContent'),
        onOk: function () {
          confirmed()
        }
      })
    } else {
      confirmed()
    }
  },
  register: function ({
    dispatch
  }, {
    mail,
    password,
    mobile,
    captcha
  }) {
    return new Promise((resolve, reject) => {
      register({
        mail,
        password,
        mobile,
        captcha
      }).then(user => {
        cookies.set('uuid', user.uuid)
        cookies.set('token', user.token)
        const allPromise = [dispatch('admin/user/set', user.info, {
          root: true
        }), this.load()]
        Promise.all(allPromise).then().catch(e => reject(e))
      }).catch(err => reject(err))
    })
  },
  load: function ({
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      const allPromise = [dispatch('admin/user/load', null, {
        root: true
      }), dispatch('admin/page/openedLoad', null, {
        root: true
      })]
      Promise.all(allPromise).then(() => resolve()).catch(err => reject(err))
    })
  }
}
export default {
  namespaced: true,
  actions
}
