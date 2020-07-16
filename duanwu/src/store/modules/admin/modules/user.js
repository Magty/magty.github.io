const state = {
  info: {
    access: ['admin'],
    avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
    name: 'Magty'
  }
}
const actions = {
  set: function ({
    state,
    dispatch
  }, info) {
    return new Promise((resolve, reject) => {
      state.info = info
      resolve()
    })
  },
  load: function ({
    state,
    dispatch
  }) {
    return new Promise(() => {
      dispatch('admin/page/openedLoad', null, {
        root: true
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  actions
}
