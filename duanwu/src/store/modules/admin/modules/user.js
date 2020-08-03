const state = {
  info: {
    access: ['admin'],
    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
    name: 'Magty'
  }
}
const mutations = {
  setInfo: function (state, value) {
    state.info = {
      ...value
    }
  }
}
const actions = {
  set: async function ({
    state,
    commit,
    dispatch
  }, info) {
    commit('setInfo', info)
    await dispatch('admin/db/set', {
      dbName: 'sys',
      path: 'user.info',
      value: info,
      user: true
    }, {
      root: true
    })
  },
  load: async function ({
    state,
    commit,
    dispatch
  }) {
    const info = await dispatch('admin/db/get', {
      dbName: 'sys',
      path: 'user.info',
      defaultValue: {},
      user: true
    }, {
      root: true
    })
    // console.log('info' + info)
    commit('setInfo', info)
    return info
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
