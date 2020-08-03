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
// import ViewUI from 'view-design'
import {
  login,
  register
} from '@/api/user'

import debug from '@/utils/debug'

// import router from '@/router'
const {
  cookies
} = debug

const actions = {
  login: async function ({
    dispatch
  }, {
    username,
    password
  }) {
    const user = await login({
      username,
      password
    })
    // console.log('===user:' + user)
    cookies.set('uuid', user.uuid)
    cookies.set('token', user.token)
    await dispatch('load')
    await dispatch('admin/user/set', user.info, {
      root: true
    })
    return user
  },
  logout: function ({
    dispatch
  }, {
    confirm,
    vm
  }) {
    async function confirmed() {
      cookies.remove('token')
      cookies.remove('uuid')
      await dispatch('admin/user/set', {}, {
        root: true
      })
      vm.$router.push({
        name: 'login'
      })
    }
    if (confirm) {
      vm.$Modal.confirm({
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
  register: async function ({
    dispatch
  }, {
    mail,
    password,
    mobile,
    captcha
  }) {
    const user = await register({
      mail,
      password,
      mobile,
      captcha
    })
    cookies.set('uuid', user.uuid)
    cookies.set('token', user.token)
    await dispatch('load')
    await dispatch('admin/user/set', user.info, {
      root: true
    })
  },
  load: async function ({
    state,
    dispatch
  }) {
    await dispatch('admin/user/load', null, {
      root: true
    })
    await dispatch('admin/page/openedLoad', null, {
      root: true
    })
  }
}
export default {
  namespaced: true,
  actions
}
