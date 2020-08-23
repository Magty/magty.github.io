import dayjs from 'dayjs'
import debug from '@/utils/debug'
import lodash from 'lodash'
const state = {
  log: []
}
const getters = {
  length: function (state) {
    return state.log.length
  },
  lengthError: function (state) {
    return state.log.filter(item => item.type === 'error').length
  }
}
const mutations = {
  push: function (state, log) {
    state.log.push(log)
  },
  clean: function (state) {
    console.log('clean')
    state.log = []
  }
}
const actions = {
  push: function ({
    commit,
    rootState
  }, {
    message,
    type = 'info',
    meta
  }) {
    commit('push', {
      message,
      type,
      meta: {
        ...meta,
        user: rootState.user.info,
        uuid: debug.cookies.get('uuid'),
        token: debug.cookies.get('token'),
        url: lodash.get(window, 'location.href', '')
      },
      time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
