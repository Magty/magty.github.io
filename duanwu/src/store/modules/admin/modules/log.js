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
    state.log = []
  }
}
const actions = {
  push: function ({
    commit,
    rootState
  }, {
    message,
    type,
    meta
  }) {
    commit('push', {
      message,
      type,
      meta: {
        ...meta,
        user: rootState.user.info,
        uuid: '',
        token: '',
        url: ''
      },
      time: new Date().format('YYYY-MM-DD HH:mm:ss')
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
